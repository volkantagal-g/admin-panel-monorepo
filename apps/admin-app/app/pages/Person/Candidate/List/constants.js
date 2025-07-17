import { PERSON_CANDIDATE_FORM_STATUSES } from '@shared/shared/constants';

export const GLOBAL_PANEL_USER_TYPE = 1;

export const CANDIDATE_FORM_STATUSES = {
  [PERSON_CANDIDATE_FORM_STATUSES.ON_CUSTOMER_SERVICE]: {
    en: 'Waiting',
    tr: 'Müşteri Hizmetlerine İletildi',
  },
  [PERSON_CANDIDATE_FORM_STATUSES.ON_LAW]: {
    en: 'Onboarding/Legal check',
    tr: 'Evrak Kontrolünde Bekliyor',
  },
  [PERSON_CANDIDATE_FORM_STATUSES.REJECTED]: {
    en: 'Rejected',
    tr: 'Reddedildi',
  },
  [PERSON_CANDIDATE_FORM_STATUSES.APPROVED]: {
    en: 'Approved',
    tr: 'Onaylandı',
  },
  [PERSON_CANDIDATE_FORM_STATUSES.MANUAL_OPERATION]: {
    en: 'Process Will Be Manual',
    tr: 'Süreç Manuel Yürütülecek',
  },
  [PERSON_CANDIDATE_FORM_STATUSES.MISSING_INFORMATION]: {
    en: 'Missing Information',
    tr: 'Eksik Bilgi',
  },
};

export const DEFAULT_PAGINATION_VALUES = { currentPage: 1, rowsPerPage: 10 };
