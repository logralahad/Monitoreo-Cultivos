import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateFarmerDto } from './create-farmer.dto';

export class UpdateFarmerDto extends PartialType(CreateFarmerDto) {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  farmerId: string;
}
