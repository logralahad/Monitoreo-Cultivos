import {
  _dbDropSchema,
  _dbHost,
  _dbName,
  _dbPassword,
  _dbPort,
  _dbSync,
  _dbUser,
} from './utils/constants';
import { HttpExceptionFilter } from './utils/http-exception.filter';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { S3Module } from './third-party/s3/s3.module';
import { EmailsModule } from './third-party/emails/emails.module';

import { AuthModule } from './app/auth/auth.module';
import { RolesModule } from './app/roles/roles.module';
import { UsersModule } from './app/users/users.module';
import { FarmersModule } from './app/farmers/farmers.module';
import { CompaniesModule } from './app/companies/companies.module';
import { CropsModule } from './app/crops/crops.module';
import { FieldsModule } from './app/fields/fields.module';
import { FieldsCropsModule } from './app/fields_crops/fields_crops.module';
import { GreenhousesModule } from './app/greenhouses/greenhouses.module';
import { GreenhousesCropsModule } from './app/greenhouses_crops/greenhouses_crops.module';

@Module({
  imports: [
    AuthModule,
    RolesModule,
    UsersModule,
    FarmersModule,
    CompaniesModule,
    CropsModule,
    FieldsModule,
    FieldsCropsModule,
    GreenhousesModule,
    GreenhousesCropsModule,
    S3Module,
    EmailsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: _dbHost,
      port: _dbPort,
      username: _dbUser,
      password: _dbPassword,
      database: _dbName,
      synchronize: _dbSync,
      dropSchema: _dbDropSchema,
      autoLoadEntities: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [],
})
export class AppModule {}
