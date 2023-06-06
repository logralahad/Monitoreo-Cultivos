import { PartialType } from '@nestjs/swagger';
import { CreateGreenhousesCropDto } from './create-greenhouses_crop.dto';

export class UpdateGreenhousesCropDto extends PartialType(
  CreateGreenhousesCropDto,
) {}
