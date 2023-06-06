import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Crop } from './entities/crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) {}

  findAll() {
    return this.cropRepository.find();
  }

  findOne(id: number) {
    return this.cropRepository.findOne({ where: { id } });
  }

  create(cropDto: CreateCropDto) {
    const crop = this.cropRepository.create(cropDto);
    return this.cropRepository.save(crop);
  }

  async update(id: number, cropDto: UpdateCropDto) {
    const crop = await this.cropRepository.findOne({ where: { id } });

    if (!crop) {
      throw new BadRequestException('Cultivo no existe');
    }

    const updatedCrop = this.cropRepository.merge(crop, cropDto);

    return this.cropRepository.save(updatedCrop);
  }

  async remove(id: number) {
    const deleted = await this.cropRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Cultivo no eliminado');
    }

    return { message: 'Cultivo eliminado' };
  }
}
