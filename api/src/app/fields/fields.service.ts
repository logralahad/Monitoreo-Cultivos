import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from '../users/entities/user.entity';
import { Field } from './entities/field.entity';

import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {}

  findAll() {
    return this.fieldRepository.find({
      relations: { crops: true, user: { farmers: true, companies: true } },
    });
  }

  findAllByUser(id: string) {
    return this.fieldRepository.find({
      where: { user: { id } },
      relations: { crops: true, user: { farmers: true, companies: true } },
    });
  }

  findOne(id: number) {
    return this.fieldRepository.findOne({
      where: { id },
      relations: { crops: true, user: { farmers: true, companies: true } },
    });
  }

  create(createFieldDto: CreateFieldDto) {
    const owner = new User();
    owner.id = createFieldDto.userId;

    const field = this.fieldRepository.create(createFieldDto);
    field.user = owner;

    return this.fieldRepository.save(field);
  }

  async update(id: number, updateFieldDto: UpdateFieldDto) {
    const field = await this.fieldRepository.findOne({ where: { id } });

    if (!field) {
      throw new BadRequestException('Campo no existe');
    }

    const updatedField = this.fieldRepository.merge(field, updateFieldDto);
    return this.fieldRepository.save(updatedField);
  }

  async remove(id: number) {
    const deleted = await this.fieldRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Campo no eliminado');
    }

    return { message: 'Campo eliminado' };
  }
}
