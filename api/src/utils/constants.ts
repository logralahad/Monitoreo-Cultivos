import { config } from 'dotenv';

import { User } from 'src/app/users/entities/user.entity';
import { Crop } from 'src/app/crops/entities/crop.entity';

import { Field } from 'src/app/fields/entities/field.entity';
import { Greenhouse } from 'src/app/greenhouses/entities/greenhouse.entity';

config();

export const _dbName = process.env.API_DB_NAME;
export const _dbPort = parseInt(process.env.API_DB_PORT, 10) || 5432;
export const _dbHost = process.env.API_DB_HOST;
export const _dbUser = process.env.API_DB_USER;
export const _dbPassword = process.env.API_DB_PASSWORD;
export const _dbSync = process.env.API_DB_SYNC === 'true';
export const _dbDropSchema = process.env.API_DROP_SCHEMA === 'true';

export const _isProd = process.env.API_IS_PROD === 'true';
export const _apiPort = parseInt(process.env.API_PORT, 10) || 4000;
export const _clientURL = process.env.API_CLIENT_URL;
export const _secretSession = process.env.API_SECRET_SESSION;

export const _accessToken = process.env.ACCESS_TOKEN_SECRET;
export const _refreshToken = process.env.REFRESH_TOKEN_SECRET;

export const _s3KeyId = process.env.Q_ACCESS_KEY_ID;
export const _s3Secret = process.env.Q_SECRET_ACCESS_KEY;
export const _s3Region = process.env.Q_AWS_REGION;
export const _s3Bucket = process.env.Q_S3_BUCKET;

export const _waPhoneId = process.env.W_PHONE_KEY;
export const _waToken = process.env.W_TOKEN;

export const _smtpUrl = process.env.SMTP_URL;
export const _smtpUser = process.env.SMTP_USER;
export const _smtpPassword = process.env.SMTP_PASSWORD;
export const _smtpSender = process.env.SMTP_SENDER;
export const _smtpPort = parseInt(process.env.SMTP_PORT, 10) || 587;
export const _testReceiverEmail = process.env.SMTP_RECEIVER;

export function randomPassword(longitud: number) {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pwd = '';

  for (let i = 0; i < longitud; i++) {
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
    pwd += randomChar;
  }
  return pwd;
}

export function getOwnerName(user: User) {
  if (user.companies && user.companies.length === 1) {
    const company = user.companies.at(0);
    return {
      id: company.id,
      name: company.name,
    };
  }

  if (user.farmers && user.farmers.length === 1) {
    const farmer = user.farmers.at(0);
    return {
      id: farmer.id,
      firstName: farmer.firstName,
      lastName: farmer.lastName,
    };
  }

  return user.id;
}

export function getFieldInfo(field: Field) {
  if (field.name) {
    return {
      id: field.id,
      name: field.name,
    };
  }

  return field.id;
}

export function getGreenhouseInfo(greenhouse: Greenhouse) {
  if (greenhouse.name) {
    return {
      id: greenhouse.id,
      name: greenhouse.name,
    };
  }

  return greenhouse.id;
}

export function getCropInfo(crop: Crop) {
  if (crop.name) {
    return {
      id: crop.id,
      name: crop.name,
    };
  }

  return crop.id;
}
