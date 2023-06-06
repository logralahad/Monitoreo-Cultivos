import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGreenhouseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
