import dayjs from 'dayjs';
import * as argon2 from 'argon2';

import { Logger } from '@nestjs/common';

import { Role } from 'src/app/roles/entities/role.entity';
import { User } from 'src/app/users/entities/user.entity';
import { Farmer } from 'src/app/farmers/entities/farmer.entity';
import { Company } from 'src/app/companies/entities/company.entity';
import { Crop } from 'src/app/crops/entities/crop.entity';

const logger = new Logger('Boostrap');

export async function createRoles() {
  const roles = await Role.find();

  if (roles.length === 0) {
    try {
      const new_roles = ['ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA'].map(
        (item) => {
          const rol_db = new Role();
          rol_db.name = item;
          rol_db.description = 'Lorem ipsum dolor sit amet magna aliqua';
          return rol_db;
        },
      );

      await Role.save(new_roles);
      logger.warn('Roles creados');
    } catch (error) {
      logger.error('Roles', error);
    }
  }
}

export async function createAdmin() {
  const adminExists = await User.findOne({
    where: { email: 'admin@gmail.com' },
  });

  if (!adminExists) {
    try {
      const role = new Role();
      role.name = 'ADMINISTRADOR';

      const hashedPassword = await argon2.hash('123');

      const new_admin = new User();
      new_admin.email = 'admin@gmail.com';
      new_admin.password = hashedPassword;
      new_admin.role = role;
      new_admin.verified = true;

      await User.save(new_admin);
      logger.warn('Administrador creado');
    } catch (error) {
      logger.error('Admin', error);
    }
  }
}

export async function createFarmers() {
  const farmerExists = await Farmer.findOne({
    where: { user: { email: 'farmer1@gmail.com' } },
  });

  if (!farmerExists) {
    try {
      const pwd = await argon2.hash('123');
      const role = await Role.findOneBy({ name: 'AGRICULTOR' });
      const persons = [
        {
          firstName: 'Leanne',
          lastName: 'Graham',
          phone: '+17707368045',
          address: 'Kulas Light Apt. 556, Gwenborough',
        },
        {
          firstName: 'Chelsey',
          lastName: 'Dietrich',
          phone: '+17707368031',
          address: 'Skiles Walks Suite 351, Roscoeview',
        },
        {
          firstName: 'Clementine',
          lastName: 'Bauch',
          phone: '+17707364447',
          address: 'Douglas Extension Suite 847, McKenziehaven',
        },
      ];

      const farmers = persons.map((person, index) => {
        const userFarmer = new User();
        userFarmer.email = `farmer${index + 1}@gmail.com`;
        userFarmer.password = pwd;
        userFarmer.role = role;
        userFarmer.verified = true;

        const farmer = new Farmer();
        farmer.user = userFarmer;
        farmer.firstName = person.firstName;
        farmer.lastName = person.lastName;
        farmer.phone = person.phone;
        farmer.address = person.address;
        farmer.dateOfBirth = new Date().toISOString();

        return farmer;
      });

      await Farmer.save(farmers);
      logger.warn('Agricultores creados');
    } catch (error) {
      logger.error('Agricultores', error);
    }
  }
}

export async function createCompanies() {
  const companyExists = await Company.findOne({
    where: { user: { email: 'company1@gmail.com' } },
  });

  if (!companyExists) {
    try {
      const pwd = await argon2.hash('123');
      const role = await Role.findOneBy({ name: 'EMPRESA' });

      const infoCompanies = [
        {
          name: 'La Costeña',
          phone: '+17706761324',
          address: 'Rex Trail Suite 280, Howemouth',
        },
        {
          name: 'Herdez',
          phone: '+5864936943',
          address: 'Ellsworth Summit Suite 729, Aliyaview',
        },
        {
          name: 'Bimbo',
          phone: '+17707667947',
          address: 'Dayna Park Suite 449, Bartholomebury',
        },
      ];

      const companies = infoCompanies.map((infoCompany, index) => {
        const userCompany = new User();
        userCompany.email = `company${index + 1}@gmail.com`;
        userCompany.password = pwd;
        userCompany.role = role;
        userCompany.verified = true;

        const company = new Company();
        company.user = userCompany;
        company.name = infoCompany.name;
        company.phone = infoCompany.phone;
        company.address = infoCompany.address;

        return company;
      });

      await Company.save(companies);
      logger.warn('Compañias creadas');
    } catch (error) {
      logger.error('Compañias', error);
    }
  }
}

export async function createCrops() {
  const crops = await Crop.find();

  if (crops.length === 0) {
    try {
      const new_crops = [
        'Piña',
        'Fresa',
        'Naranja',
        'Maíz',
        'Frijol',
        'Papa',
        'Calabaza',
      ].map((item) => {
        const crop_db = new Crop();
        crop_db.name = item;
        crop_db.description = 'Lorem ipsum dolor sit amet magna aliqua';
        return crop_db;
      });

      await Crop.save(new_crops);
      logger.warn('Cultivos creados');
    } catch (error) {
      logger.error('Cultivos', error);
    }
  }
}
