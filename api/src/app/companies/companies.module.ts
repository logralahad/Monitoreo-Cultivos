import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';
import { Company } from './entities/company.entity';

import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

import { EmailsModule } from 'src/third-party/emails/emails.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company, User]), EmailsModule],
  exports: [CompaniesService],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
