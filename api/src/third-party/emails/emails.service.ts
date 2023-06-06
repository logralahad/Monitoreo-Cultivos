import { Injectable } from '@nestjs/common';
import { _smtpSender } from 'src/utils/constants';
import { SMTPService } from './emailSmtp.service';
import { EmailBody } from './models/email.interface';
import { ErrorEmail } from './models/error.interface';
import { getTemplate } from './templates';

@Injectable()
export class EmailsService {
  checkAvailabilty(): ErrorEmail {
    let response = { status: true, error: '' };
    SMTPService.verify(function (error) {
      if (error) {
        response = { status: false, error: error.code };
      }
    });
    return response;
  }

  async sendEmail(email: EmailBody, template: string) {
    await SMTPService.sendMail({
      from: _smtpSender, // sender address
      to: email.to, // list of receivers
      subject: email.subject, // Subject line
      text: email.text, // plain text body
      html: getTemplate(template, email.text), // html body
    });
  }
}
