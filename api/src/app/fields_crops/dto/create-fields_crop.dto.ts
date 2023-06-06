import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateFieldsCropDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsNumber()
  @IsNotEmpty()
  fieldId: number;

  @IsNumber()
  @IsNotEmpty()
  cropId: number;
}
