import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Crop } from '../crops/entities/crop.entity';
import { Greenhouse } from '../greenhouses/entities/greenhouse.entity';
import { GreenhousesCrop } from './entities/greenhouses_crop.entity';

import { CreateGreenhousesCropDto } from './dto/create-greenhouses_crop.dto';
import { UpdateGreenhousesCropDto } from './dto/update-greenhouses_crop.dto';

@Injectable()
export class GreenhousesCropsService {
  constructor(
    @InjectRepository(GreenhousesCrop)
    private readonly greenhouseCropRepository: Repository<GreenhousesCrop>,
  ) {}

  findAll() {
    return this.greenhouseCropRepository.find({
      relations: { greenhouse: true, crop: true },
    });
  }

  findAllByGreenhouse(id: number) {
    return this.greenhouseCropRepository.find({
      where: { greenhouse: { id } },
      relations: { greenhouse: true, crop: true },
    });
  }

  findOne(id: number) {
    return this.greenhouseCropRepository.findOne({
      where: { id },
      relations: { greenhouse: true, crop: true },
    });
  }

  create(createGreenhousesCropDto: CreateGreenhousesCropDto) {
    const crop = new Crop();
    crop.id = createGreenhousesCropDto.cropId;

    const greenhouse = new Greenhouse();
    greenhouse.id = createGreenhousesCropDto.greenhouseId;

    const greenhouseCrop = this.greenhouseCropRepository.create(
      createGreenhousesCropDto,
    );
    greenhouseCrop.crop = crop;
    greenhouseCrop.greenhouse = greenhouse;

    return this.greenhouseCropRepository.save(greenhouseCrop);
  }

  async update(id: number, updateGreenhousesCropDto: UpdateGreenhousesCropDto) {
    const greenhouseCrop = await this.greenhouseCropRepository.findOne({
      where: { id },
    });

    if (!greenhouseCrop) {
      throw new BadRequestException('Cultivo no existe dentro del invernadero');
    }

    const updatedGreenhouseCrop = this.greenhouseCropRepository.merge(
      greenhouseCrop,
      updateGreenhousesCropDto,
    );

    return this.greenhouseCropRepository.save(updatedGreenhouseCrop);
  }

  async remove(id: number) {
    const deleted = await this.greenhouseCropRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Cultivo no eliminado del invernadero');
    }

    return { message: 'Cultivo eliminado del invernadero' };
  }
}
