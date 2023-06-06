import { codeTemplate } from './CodeTemplate';
import { defaultTemplate } from './DefaultTemplate';
import { passwordTemplate } from './PasswordSendTemplate';

export const getTemplate = (template: string, text: string) => {
  switch (template) {
    case 'sendCode':
      return codeTemplate(text);

    case 'sendPassword':
      return passwordTemplate(text);

    default:
      return defaultTemplate;
  }
};
