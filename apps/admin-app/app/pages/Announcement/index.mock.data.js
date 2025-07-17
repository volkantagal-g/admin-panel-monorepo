import { ANNOUNCEMENT_STATUS } from '@app/pages/Announcement/constants';
import { targetServiceType } from '@shared/shared/constantValues';
import { DRAFT_TYPES } from '@shared/components/Marketing/DraftImporter/constant';

export const SAMPLE_ANNOUNCEMENT_ID = '632c6c7b7119377e3757c837';
export const SAMPLE_COUNTRY_OBJECT_ID = '6059b3ad252472aba0790d66';
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

export const sampleAnnouncementFormPayload = {
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
  status: ANNOUNCEMENT_STATUS.INACTIVE,
};

export const sampleAnnouncementRequest = {
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
  status: ANNOUNCEMENT_STATUS.INACTIVE,
  country: SAMPLE_COUNTRY_OBJECT_ID,
};

export const sampleAnnouncementResponse = { ...sampleAnnouncementRequest };

export const sampleGenericAnnouncementRequest = { ...sampleAnnouncementRequest };

export const sampleGenericAnnouncementResponse = { id: SAMPLE_ANNOUNCEMENT_ID, ...sampleGenericAnnouncementRequest };
