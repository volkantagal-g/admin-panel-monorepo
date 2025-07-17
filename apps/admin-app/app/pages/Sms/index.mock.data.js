import { SMS_STATUS } from '@app/pages/Sms/constants';
import { targetServiceType } from '@shared/shared/constantValues';
import { DRAFT_TYPES } from '@shared/components/Marketing/DraftImporter/constant';

export const SAMPLE_SMS_ID = '620e3ff36529da230c96dbeb';
export const SAMPLE_PROMO_CODE = 'ACTIVATE_PROMO_DISCOUNT_50';
const CSV_NAME = 'sample.csv';
const DATE_START = new Date('2020-01-01');
const DATE_END = new Date('2020-02-01');

const sampleClientImportTemplate = {
  type: DRAFT_TYPES.CSV,
  csv: {
    name: CSV_NAME,
    originalFileName: CSV_NAME,
  },
};

export const sampleSmsFormPayload = {
  phoneLanguages: [
    'tr',
  ],
  contents: { tr: { message: '' } },
  domainType: targetServiceType.GETIR_LOCAL,
  customTag: '',
  responsibleDepartment: 1,
  priority: 1,
  clientImportTemplate: {
    type: 1,
    csv: {
      csvName: CSV_NAME,
      originalFileName: CSV_NAME,
    },
  },
  validDates: [
    DATE_START,
    DATE_END,
  ],
  status: SMS_STATUS.INACTIVE,
};

export const sampleSmsRequest = {
  phoneLanguages: ['tr'],
  contents: [{
    phoneLanguage: 'tr',
    message: '',
  }],
  domainType: targetServiceType.GETIR_LOCAL,
  customTag: '',
  responsibleDepartment: 1,
  priority: 1,
  clientImportTemplate: sampleClientImportTemplate,
  startDate: DATE_START.toISOString(),
  endDate: DATE_END.toISOString(),
  status: SMS_STATUS.INACTIVE,
};

export const sampleGenericSmsRequest = { ...sampleSmsRequest };

export const sampleGenericSmsResponse = { id: SAMPLE_SMS_ID, ...sampleGenericSmsRequest };
