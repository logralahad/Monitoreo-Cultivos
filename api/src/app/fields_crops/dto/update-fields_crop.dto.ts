import { PartialType } from '@nestjs/swagger';
import { CreateFieldsCropDto } from './create-fields_crop.dto';

export class UpdateFieldsCropDto extends PartialType(CreateFieldsCropDto) {}
