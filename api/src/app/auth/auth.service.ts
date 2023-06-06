import * as argon2 from 'argon2';

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { plainToInstance } from 'class-transformer';

import { AuthDto } from './dto/auth.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateFarmerDto } from '../farmers/dto/create-farmer.dto';
import { CreateCompanyDto } from '../companies/dto/create-company.dto';

import { UsersService } from '../users/users.service';

import { User } from '../users/entities/user.entity';
import { Farmer } from '../farmers/entities/farmer.entity';
import { Company } from '../companies/entities/company.entity';

import { EmailsService } from 'src/third-party/emails/emails.service';
import { FarmersService } from '../farmers/farmers.service';
import { CompaniesService } from '../companies/companies.service';

import { _accessToken, _refreshToken } from 'src/utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private farmersService: FarmersService,
    private companiesService: CompaniesService,
    private jwtService: JwtService,
    private emailsService: EmailsService,
  ) {}

  async hashInfo(data: string) {
    return await argon2.hash(data);
  }

  async compareHash(hashed: string, attempt: string) {
    return await argon2.verify(hashed, attempt);
  }

  async createLoginResponse(user: User, accessToken: string) {
    let userInfo = {};

    if (user.farmers.length === 1) {
      const farmer = user.farmers.at(0);
      const { user: farmerUser, ...farmerInfo } = farmer;

      userInfo = {
        farmerId: farmerInfo.id,
        ...farmerInfo,
      };
    } else if (user.companies.length === 1) {
      const company = user.companies.at(0);
      const { user: companyUser, ...companyInfo } = company;

      userInfo = {
        companyId: companyInfo.id,
        ...companyInfo,
      };
    }

    return Object.assign(
      {
        accessToken,
      },
      {
        user: plainToInstance(User, {
          ...user,
          ...userInfo,
          id: user.id,
        }),
      },
    );
  }

  async createFarmerObject(farmer: Farmer, accessToken: string) {
    const { user, ...farmerInfo } = farmer;

    return Object.assign(
      {
        accessToken,
      },
      {
        user: plainToInstance(User, {
          ...user,
          ...farmerInfo,
          id: user.id,
          farmerId: farmerInfo.id,
        }),
      },
    );
  }

  async createCompanyObject(company: Company, accessToken: string) {
    const { user, ...companyInfo } = company;

    return Object.assign(
      {
        accessToken,
      },
      {
        user: plainToInstance(User, {
          ...user,
          ...companyInfo,
          id: user.id,
          companyId: companyInfo.id,
        }),
      },
    );
  }

  async registerFarmer(createFarmerDto: CreateFarmerDto) {
    const userExists = await this.usersService.findOneByKeyword(
      createFarmerDto.email,
    );

    if (userExists) {
      throw new BadRequestException('Correo ya está vinculado a otra cuenta');
    }

    const createFarmer = await this.farmersService.create(createFarmerDto);

    const tokens = await this.getTokens(createFarmer.user);
    await this.updateRefreshToken(createFarmer.user.id, tokens.refreshToken);
    createFarmer.user.refreshToken = tokens.refreshToken;

    this.emailsService.sendEmail(
      {
        to: createFarmer.user.email,
        subject: 'Verifica tu cuenta',
        text: createFarmer.user.code,
      },
      'sendCode',
    );
    return this.createFarmerObject(createFarmer, tokens.accessToken);
  }

  async registerCompany(createCompanyDto: CreateCompanyDto) {
    const userExists = await this.usersService.findOneByKeyword(
      createCompanyDto.email,
    );

    if (userExists) {
      throw new BadRequestException('Correo ya está vinculado a otra cuenta');
    }

    const createCompany = await this.companiesService.create(createCompanyDto);

    const tokens = await this.getTokens(createCompany.user);
    await this.updateRefreshToken(createCompany.user.id, tokens.refreshToken);
    createCompany.user.refreshToken = tokens.refreshToken;

    this.emailsService.sendEmail(
      {
        to: createCompany.user.email,
        subject: 'Verifica tu cuenta',
        text: createCompany.user.code,
      },
      'sendCode',
    );
    return this.createCompanyObject(createCompany, tokens.accessToken);
  }

  async findProfile(userId: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new BadRequestException('No existe cuenta con ese correo');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    user.refreshToken = tokens.refreshToken;
    return this.createLoginResponse(user, tokens.accessToken);
  }

  async updateProfile(updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOneByKeyword(updateUserDto.email);
    if (!user) {
      throw new BadRequestException('No existe cuenta con ese correo');
    }

    const userUpdated = await this.usersService.update(updateUserDto);
    const tokens = await this.getTokens(userUpdated);

    await this.updateRefreshToken(userUpdated.id, tokens.refreshToken);

    userUpdated.refreshToken = tokens.refreshToken;
    return this.createLoginResponse(userUpdated, tokens.accessToken);
  }

  async validateCode(email: string, userCode: string) {
    const userExists = await this.usersService.findOneByKeyword(email);

    if (!userExists) {
      throw new BadRequestException('No existe cuenta con ese correo');
    }

    if (Number(userCode) !== Number(userExists.code)) {
      throw new BadRequestException('Código incorrecto');
    }

    await this.usersService.verify(userExists.id);

    const tokens = await this.getTokens(userExists);
    await this.updateRefreshToken(userExists.id, tokens.refreshToken);
    userExists.refreshToken = tokens.refreshToken;
    userExists.verified = true;

    return this.createLoginResponse(userExists, tokens.accessToken);
  }

  async resendCode(email: string) {
    const userExists = await this.usersService.findOneByKeyword(email);

    if (!userExists) {
      throw new BadRequestException('No existe cuenta con ese correo');
    }

    const newCode = Math.floor(Math.random() * 9000 + 1000).toString();
    await this.usersService.updateCode(userExists.id, newCode);

    this.emailsService.sendEmail(
      {
        to: userExists.email,
        subject: 'Verifica tu cuenta',
        text: newCode,
      },
      'sendCode',
    );
  }

  async login(authDto: AuthDto) {
    const user = await this.usersService.findOneByKeyword(authDto.email);

    if (!user) {
      throw new BadRequestException('No existe cuenta con ese correo');
    }

    const passwordMatches = await this.compareHash(
      user.password,
      authDto.password,
    );
    if (!passwordMatches) {
      throw new BadRequestException('Verifica tus credenciales');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    user.refreshToken = tokens.refreshToken;
    return this.createLoginResponse(user, tokens.accessToken);
  }

  async logout(id: string) {
    const resetUserToken = new User();
    resetUserToken.id = id;
    resetUserToken.refreshToken = null;

    return this.usersService.update(resetUserToken);
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.usersService.findOneById(id);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Acceso denegado');
    }

    const refreshTokenMatches = await this.compareHash(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Acceso denegado');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    user.refreshToken = tokens.refreshToken;
    return this.createLoginResponse(user, tokens.accessToken);
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashInfo(refreshToken);
    const refreshUserToken = new User();
    refreshUserToken.id = id;
    refreshUserToken.refreshToken = hashedRefreshToken;

    await this.usersService.update(refreshUserToken);
  }

  async getTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          role: user.role.name,
        },
        {
          secret: _accessToken,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          role: user.role.name,
        },
        {
          secret: _refreshToken,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
