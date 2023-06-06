import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from '../users/entities/user.entity';
import { Greenhouse } from './entities/greenhouse.entity';

import { CreateGreenhouseDto } from './dto/create-greenhouse.dto';
import { UpdateGreenhouseDto } from './dto/update-greenhouse.dto';

@Injectable()
export class GreenhousesService {
  constructor(
    @InjectRepository(Greenhouse)
    private readonly greenhouseRepository: Repository<Greenhouse>,
  ) {}

  findAll() {
    return this.greenhouseRepository.find({
      relations: { crops: true, user: { farmers: true, companies: true } },
    });
  }

  findAllByUser(id: string) {
    return this.greenhouseRepository.find({
      where: { user: { id } },
      relations: { crops: true, user: { farmers: true, companies: true } },
    });
  }

  findOne(id: number) {
    return this.greenhouseRepository.findOne({
      where: { id },
      relations: { crops: true, user: { farmers: true, companies: true } },
    });
  }

  create(createGreenhouseDto: CreateGreenhouseDto) {
    const owner = new User();
    owner.id = createGreenhouseDto.userId;

    const greenhouse = this.greenhouseRepository.create(createGreenhouseDto);
    greenhouse.user = owner;

    return this.greenhouseRepository.save(greenhouse);
  }

  async update(id: number, updateGreenhouseDto: UpdateGreenhouseDto) {
    const greenhouse = await this.greenhouseRepository.findOne({
      where: { id },
    });

    if (!greenhouse) {
      throw new BadRequestException('Invernadero no existe');
    }

    const updatedGreenhouse = this.greenhouseRepository.merge(
      greenhouse,
      updateGreenhouseDto,
    );

    return this.greenhouseRepository.save(updatedGreenhouse);
  }

  async remove(id: number) {
    const deleted = await this.greenhouseRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Invernadero no eliminado');
    }

    return { message: 'Invernadero eliminado' };
  }
}
