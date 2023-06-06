import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';
import { Farmer } from './entities/farmer.entity';

import { FarmersService } from './farmers.service';
import { FarmersController } from './farmers.controller';

import { EmailsModule } from 'src/third-party/emails/emails.module';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer, User]), EmailsModule],
  exports: [FarmersService],
  controllers: [FarmersController],
  providers: [FarmersService],
})
export class FarmersModule {}
