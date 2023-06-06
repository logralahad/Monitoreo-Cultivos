import * as argon2 from 'argon2';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { Farmer } from './entities/farmer.entity';

import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';

import { EmailsService } from 'src/third-party/emails/emails.service';

import { randomPassword } from 'src/utils/constants';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer)
    private readonly farmersRepository: Repository<Farmer>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private emailsService: EmailsService,
  ) {}

  async create(createFarmerDto: CreateFarmerDto) {
    const farmerRol = new Role();
    farmerRol.name = 'AGRICULTOR';

    const farmerUser = User.create(createFarmerDto);
    farmerUser.verified = false;
    farmerUser.role = farmerRol;
    farmerUser.code = Math.floor(Math.random() * 9000 + 1000).toString();

    if (!createFarmerDto.password) {
      const randomPwd = randomPassword(8);
      farmerUser.password = await argon2.hash(randomPwd);
      await this.emailsService.sendEmail(
        {
          to: farmerUser.email,
          subject: 'Bienvenido a GiDi S.T.E.A.M',
          text: `${createFarmerDto.firstName}/${randomPwd}`,
        },
        'sendPassword',
      );
    } else if (!createFarmerDto.password.includes('$argon2id')) {
      farmerUser.password = await argon2.hash(createFarmerDto.password);
    }

    const farmer = this.farmersRepository.create(createFarmerDto);
    farmer.user = farmerUser;

    return this.farmersRepository.create(
      await this.farmersRepository.save(farmer),
    );
  }

  async findAll() {
    return await this.farmersRepository.find({ relations: { user: true } });
  }

  async findOneById(id: string) {
    return await this.farmersRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async update(updateFarmerDto: UpdateFarmerDto) {
    const farmerUser = User.create(updateFarmerDto);
    farmerUser.id = updateFarmerDto.userId;

    const farmer = this.farmersRepository.create(updateFarmerDto);
    farmer.id = updateFarmerDto.farmerId;
    farmer.user = farmerUser;

    return this.farmersRepository.create(
      await this.farmersRepository.save(farmer),
    );
  }

  async remove(id: string) {
    const deleted = await this.usersRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Agricultor no eliminado');
    }

    return { message: 'Agricultor eliminado' };
  }
}
