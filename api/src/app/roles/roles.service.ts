import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.rolesRepository.save(createRoleDto);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async update(updateRoleDto: UpdateRoleDto) {
    return await this.rolesRepository.save(updateRoleDto);
  }

  async remove(id: number) {
    const deleted = await this.rolesRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Rol no eliminado');
    }

    return { message: 'Rol eliminado' };
  }
}
