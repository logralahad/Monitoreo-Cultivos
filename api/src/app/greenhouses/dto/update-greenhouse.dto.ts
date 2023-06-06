import { PartialType } from '@nestjs/swagger';
import { CreateGreenhouseDto } from './create-greenhouse.dto';

export class UpdateGreenhouseDto extends PartialType(CreateGreenhouseDto) {}
