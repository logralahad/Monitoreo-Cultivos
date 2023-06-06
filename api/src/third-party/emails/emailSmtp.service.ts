import {
  _smtpPassword,
  _smtpPort,
  _smtpUrl,
  _smtpUser,
} from 'src/utils/constants';

import nodemailer = require('nodemailer');

export const SMTPService = nodemailer.createTransport({
  host: _smtpUrl,
  port: _smtpPort,
  secure: false, // true for 465, false for other ports
  auth: {
    user: _smtpUser, // AWS access key ID
    pass: _smtpPassword, // AWS access password
  },
});
