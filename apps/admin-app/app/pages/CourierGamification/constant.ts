import { MIME_TYPE } from '@shared/shared/constants.ts';

export const TASK_STATUS = {
  ACTIVE: 100,
  COMPLETED: 200,
  DELETED: 300,
};

export const mapKpiNamesToTranslateKeys = (kpiname: string) => {
  switch (kpiname) {
    case 'workHour':
      return 'WORK_HOUR';
    case 'safetyScore':
      return 'SAFETY';
    case 'problematicOrderCount':
      return 'P_ORDER';
    case 'flawlessOrderCountPercent':
      return 'FLAWLESS_ORDER_COUNT_PERCENT';
    case 'pc':
      return 'PC';
    case 'gps':
      return 'GPS';
    case 'duration':
      return 'DURATION';
    case 'orderCount':
      return 'ORDER_COUNT';
    case 'rating':
      return 'RATING';
    default:
      return '-';
  }
};

export const INITIAL_COURIER_GAMIFICATION_TASK_LIST_FILTER_STATES = {
  kpi: undefined,
  status: TASK_STATUS.ACTIVE,
  title: undefined,
  startDate: undefined,
  endDate: undefined,
};

export enum TASK_COVERAGE_CHOOSING_COURIER_TYPES {
    WAREHOUSE_CHOOSE = 'WAREHOUSE_CHOOSE',
    BULK_PERSON_UPLOAD = 'BULK_PERSON_UPLOAD'
}

export enum TASK_TYPES {
    WITH_DEADLINE = 1,
    WITHOUT_DEADLINE = 2
}

export const WAREHOUSE_REQUEST_FIELDS_STRING = '_id name';
export const PERSON_UPLOAD_CSV_COLUMN_TITLE = 'personIds';

export const GOAL_COMPARITION_OPTIONS = [
  {
    value: 'gt',
    label: '>',
  },
  {
    value: 'gte',
    label: '>=',
  },
  {
    value: 'lt',
    label: '<',
  },
  {
    value: 'lte',
    label: '=<',
  },
];

export const getAllDomainOptions = (t: Function) => [
  {
    label: t('DOMAINS.Getir10'),
    value: 1,
  },
  {
    label: t('DOMAINS.Getir30'),
    value: 3,
  },
  {
    label: t('DOMAINS.GetirLocals'),
    value: 6,
  },
  {
    label: t('DOMAINS.GetirWater'),
    value: 8,
  },
  {
    label: t('DOMAINS.GetirFood'),
    value: 2,
  },
  {
    label: t('DOMAINS.GetirFinance'),
    value: 14,
  },
];

export const DEFAULT_MAX_VALUE_FOR_KPI_VALUES = 10000;

export const getGMFCTaskProgressStatus = (t:Function) => [
  {
    label: t('TASK_PROGRESS_STATUS.ACTIVE'),
    value: 100,
  },
  {
    label: t('TASK_PROGRESS_STATUS.SUCCESS'),
    value: 200,
  },
  {
    label: t('TASK_PROGRESS_STATUS.REWARDED'),
    value: 250,
  },
  {
    label: t('TASK_PROGRESS_STATUS.FAILED'),
    value: 300,
  },
  {
    label: t('TASK_PROGRESS_STATUS.CONDITION_FAILED'),
    value: 350,
  },
  {
    label: t('TASK_PROGRESS_STATUS.EARLY_FAILED'),
    value: 375,
  },
];

export const TASK_IMAGE_URL_FOLDER_PATH = 'images';
export const TASK_IMAGE_URL_BUCKET_NAME = 'getir';

export const AWARD_OPTIONS = [
  {
    key: 'money',
    value: 'money',
  },
  {
    key: 'xp',
    value: 'xp',
  },
  {
    key: 'gift',
    value: 'gift',
  },
];

export const PERSON_IDS_EXAMPLE_DATA = { personIds: '602bbf7f64d8a2e29f4542c8,702bbf7f64d8a2e29f4542c8,802bbf7f64d8a2e29f4542c8' };

export const getOneYearFromToday = () => {
  return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
};

export const INITIAL_VALUES_FOR_PAGINATION = {
  currentPage: 1,
  rowsPerPage: 10,
};

export const DATE_TEXT_OPTIONS = {
  timeZone: 'Europe/Istanbul',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

export const maxImageSizeInMB = 5;
export const taskImageRatios = ['4:3'];
export const supportedFileTypes = [MIME_TYPE.JPEG, MIME_TYPE.PNG, MIME_TYPE.WEBP];

export const TASK_IMAGE_TYPES = {
  MAIN: 'main',
  THUMBNAIL: 'thumbnail',
};

export const TIME_GRANULARITY_OPTIONS = {
  DATE: 'date',
  TIME: 'time',
};
