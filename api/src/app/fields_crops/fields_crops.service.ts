import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Crop } from '../crops/entities/crop.entity';
import { Field } from '../fields/entities/field.entity';
import { FieldsCrop } from './entities/fields_crop.entity';

import { CreateFieldsCropDto } from './dto/create-fields_crop.dto';
import { UpdateFieldsCropDto } from './dto/update-fields_crop.dto';

@Injectable()
export class FieldsCropsService {
  constructor(
    @InjectRepository(FieldsCrop)
    private readonly fieldsCropRepository: Repository<FieldsCrop>,
  ) {}

  findAll() {
    return this.fieldsCropRepository.find({
      relations: { field: true, crop: true },
    });
  }

  findAllByField(id: number) {
    return this.fieldsCropRepository.find({
      where: { field: { id } },
      relations: { field: true, crop: true },
    });
  }

  findOne(id: number) {
    return this.fieldsCropRepository.findOne({
      where: { id },
      relations: { field: true, crop: true },
    });
  }

  create(createFieldsCropDto: CreateFieldsCropDto) {
    const crop = new Crop();
    crop.id = createFieldsCropDto.cropId;

    const field = new Field();
    field.id = createFieldsCropDto.fieldId;

    const fieldsCrop = this.fieldsCropRepository.create(createFieldsCropDto);
    fieldsCrop.crop = crop;
    fieldsCrop.field = field;

    return this.fieldsCropRepository.save(fieldsCrop);
  }

  async update(id: number, updateFieldsCropDto: UpdateFieldsCropDto) {
    const fieldsCrop = await this.fieldsCropRepository.findOne({
      where: { id },
    });

    if (!fieldsCrop) {
      throw new BadRequestException('Cultivo no existe dentro del invernadero');
    }

    const updatedGreenhouseCrop = this.fieldsCropRepository.merge(
      fieldsCrop,
      updateFieldsCropDto,
    );

    return this.fieldsCropRepository.save(updatedGreenhouseCrop);
  }

  async remove(id: number) {
    const deleted = await this.fieldsCropRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Cultivo no eliminado del invernadero');
    }

    return { message: 'Cultivo eliminado del invernadero' };
  }
}
