import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGreenhousesCropDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsNumber()
  @IsNotEmpty()
  greenhouseId: number;

  @IsNumber()
  @IsNotEmpty()
  cropId: number;
}
