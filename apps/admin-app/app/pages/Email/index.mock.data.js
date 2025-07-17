import { EMAIL_STATUS } from '@app/pages/Email/constants';
import { targetServiceType } from '@shared/shared/constantValues';

export const SAMPLE_EMAIL_ID = '620e3ff36529da230c96dbeb';
export const SAMPLE_DESING_ID = '620e3ff36529da230c96dbe1';
const CSV_NAME = 'sample.csv';
const SAMPLE_MAIL_ADDRESS = 'info@getir.com';
const DATE_START = new Date('2020-01-01');
const DATE_END = new Date('2020-02-01');

const sampleClientImportTemplate = {
  type: 1,
  csv: {
    name: CSV_NAME,
    originalFileName: CSV_NAME,
  },
};

export const sampleEmailFormPayload = {
  phoneLanguages: [
    'tr',
  ],
  contents: {
    tr: {
      designId: SAMPLE_DESING_ID,
      senderEmail: SAMPLE_MAIL_ADDRESS,
      senderName: 'Getir',
    },
  },
  domainType: 6,
  responsibleDepartment: 1,
  clientImportTemplate: sampleClientImportTemplate,
  priority: 1,
  validDates: [
    DATE_START,
    DATE_END,
  ],
  status: EMAIL_STATUS.INACTIVE,
};

export const sampleEmailRequest = {
  phoneLanguages: ['tr'],
  contents: [{
    phoneLanguage: 'tr',
    designId: SAMPLE_DESING_ID,
    senderEmail: SAMPLE_MAIL_ADDRESS,
    senderName: 'Getir',
  }],
  domainType: targetServiceType.GETIR_LOCAL,
  responsibleDepartment: 1,
  priority: 1,
  clientImportTemplate: sampleClientImportTemplate,
  startDate: DATE_START.toISOString(),
  dueDate: DATE_END.toISOString(),
  status: EMAIL_STATUS.INACTIVE,
};

export const sampleGenericEmailRequest = { ...sampleEmailRequest };

export const sampleGenericEmailResponse = { id: SAMPLE_EMAIL_ID, ...sampleGenericEmailRequest };
