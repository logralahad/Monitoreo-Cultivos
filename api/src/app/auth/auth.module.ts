import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { FarmersModule } from '../farmers/farmers.module';
import { CompaniesModule } from '../companies/companies.module';

import { EmailsModule } from 'src/third-party/emails/emails.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { AccessTokenStrategy } from './strategies/accessToken.strategy.ts';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

import { _accessToken, _refreshToken } from 'src/utils/constants';

@Module({
  imports: [
    UsersModule,
    FarmersModule,
    CompaniesModule,
    EmailsModule,
    JwtModule.register({}),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
