import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

import { AppModule } from './app.module';
import {
  createRoles,
  createAdmin,
  createFarmers,
  createCompanies,
  createCrops,
} from './utils/bootstrap-data';

import { _apiPort } from './utils/constants';
import { HttpExceptionFilter } from './utils/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const config = new DocumentBuilder()
    .setTitle('REST API - Refresh token')
    .setDescription('REST API using JWT for access tokens and refresh tokens.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(_apiPort);

  await createRoles();
  await createAdmin();
  await createFarmers();
  await createCompanies();
  await createCrops();
}

bootstrap();
