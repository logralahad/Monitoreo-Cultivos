import * as argon2 from 'argon2';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { Company } from './entities/company.entity';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import { EmailsService } from 'src/third-party/emails/emails.service';

import { randomPassword } from 'src/utils/constants';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companysRepository: Repository<Company>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private emailsService: EmailsService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const companyRol = new Role();
    companyRol.name = 'EMPRESA';

    const companyUser = User.create(createCompanyDto);
    companyUser.verified = false;
    companyUser.role = companyRol;
    companyUser.code = Math.floor(Math.random() * 9000 + 1000).toString();

    if (!createCompanyDto.password) {
      const randomPwd = randomPassword(8);
      companyUser.password = await argon2.hash(randomPwd);
      await this.emailsService.sendEmail(
        {
          to: companyUser.email,
          subject: 'Bienvenido a GiDi S.T.E.A.M',
          text: `${createCompanyDto.name}/${randomPwd}`,
        },
        'sendPassword',
      );
    } else if (!createCompanyDto.password.includes('$argon2id')) {
      companyUser.password = await argon2.hash(createCompanyDto.password);
    }

    const company = this.companysRepository.create(createCompanyDto);
    company.user = companyUser;

    return this.companysRepository.create(
      await this.companysRepository.save(company),
    );
  }

  async findAll() {
    return await this.companysRepository.find({ relations: { user: true } });
  }

  async findOneById(id: string) {
    return await this.companysRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async update(updateCompanyDto: UpdateCompanyDto) {
    const companyUser = User.create(updateCompanyDto);
    companyUser.id = updateCompanyDto.userId;

    const company = this.companysRepository.create(updateCompanyDto);
    company.id = updateCompanyDto.companyId;
    company.user = companyUser;

    return this.companysRepository.create(
      await this.companysRepository.save(company),
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
