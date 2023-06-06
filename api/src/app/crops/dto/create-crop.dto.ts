import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCropDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
