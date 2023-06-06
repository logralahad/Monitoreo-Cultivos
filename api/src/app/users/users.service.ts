import * as argon2 from 'argon2';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Not, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { randomPassword } from 'src/utils/constants';

import { EmailsService } from 'src/third-party/emails/emails.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private emailsService: EmailsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(
      await this.usersRepository.save(createUserDto),
    );
  }

  async createWithRandomPassword(createUserDto: CreateUserDto) {
    const randomPwd = randomPassword(8);
    createUserDto.password = await argon2.hash(randomPwd);
    createUserDto.refreshToken = null;
    createUserDto.verified = true;

    await this.emailsService.sendEmail(
      {
        to: createUserDto.email,
        subject: 'Bienvenido a GiDi S.T.E.A.M',
        text: `${createUserDto.email}/${randomPwd}`,
      },
      'sendPassword',
    );

    return this.usersRepository.create(
      await this.usersRepository.save(createUserDto),
    );
  }

  async verify(id: string) {
    const verified = await this.usersRepository.update(
      { id },
      { verified: true, code: null },
    );

    if (verified.affected === 0) {
      throw new BadRequestException('Verificación falló');
    }

    return { message: 'Usuario verificado' };
  }

  async findAll() {
    return await this.usersRepository.find({
      where: { role: { name: Not(In(['AGRICULTOR', 'EMPRESA'])) } },
    });
  }

  async findOneById(id: string) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: {
        farmers: true,
        companies: true,
      },
    });
  }

  async findOneByKeyword(keyword: string) {
    return await this.usersRepository.findOne({
      where: [{ email: ILike(`%${keyword}%`) }],
      relations: {
        farmers: true,
        companies: true,
      },
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await argon2.hash(updateUserDto.password);
    }

    const userUpdated = await this.usersRepository.save(updateUserDto);

    return this.usersRepository.create(
      await this.usersRepository.findOne({
        where: { id: userUpdated.id },
        relations: {
          farmers: true,
          companies: true,
        },
      }),
    );
  }

  async updateCode(id: string, code: string) {
    const newCode = await this.usersRepository.update({ id }, { code });

    if (newCode.affected === 0) {
      throw new BadRequestException('Código no actualizado');
    }

    return { message: 'Código actualizado' };
  }

  async resetPassword(updateUserDto: UpdateUserDto) {
    const randomPwd = randomPassword(8);

    return await this.emailsService.sendEmail(
      {
        to: updateUserDto.email,
        subject: 'Recupera el acceso',
        text: `${updateUserDto.email}/${randomPwd}`,
      },
      'sendPassword',
    );
  }

  async remove(id: string) {
    const deleted = await this.usersRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Usuario no eliminado');
    }

    return { message: 'Usuario eliminado' };
  }
}
