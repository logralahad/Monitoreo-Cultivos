import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EmailBody } from './models/email.interface';
import { EmailsService } from './emails.service';

@ApiBearerAuth()
@Controller('emails')
export class EmailsController {
  private readonly logger = new Logger('emails');
  constructor(private emailService: EmailsService) {}

  @Post()
  sendMessage(@Body() request: EmailBody, @Res() response) {
    const { status, error } = this.emailService.checkAvailabilty();
    if (!status) {
      this.logger.error('Error:', error);
      throw new InternalServerErrorException(error);
    }

    this.emailService
      .sendEmail(request, 'sendCode')
      .then((res) => {
        this.logger.warn('Email enviado');
        response.status(HttpStatus.CREATED).json(res);
      })
      .catch((err) => {
        this.logger.error('Email falló al enviarse');
        throw new BadRequestException(err);
      });
  }
}
