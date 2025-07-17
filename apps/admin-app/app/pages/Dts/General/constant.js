import moment from 'moment';

export const dtsStartDate = moment().subtract(1, 'months').endOf('day');
export const dtsEndDate = moment().endOf('day');

export const DtsStatusCodes = {
  100: {
    tr: 'Cevap bekleniyor',
    en: 'Waiting for apology',
  },
  200: {
    tr: 'Karar bekleniyor',
    en: 'Waiting for decision',
  },
  1000: {
    tr: 'Kapandı',
    en: 'Closed',
  },
};

export const DtsDecisionCodes = {
  1: {
    tr: 'Kabul',
    en: 'Accept',
  },
  2: {
    tr: 'Uyarı',
    en: 'Warn',
  },
  3: {
    tr: 'Ret',
    en: 'Reject',
  },
};

export const DtsStatusColors = {
  100: 'orange',
  200: 'magenta',
  1000: 'green',
};

export const DtsDecisionColors = {
  1: 'green',
  2: 'orange',
  3: 'red',
};

export const DtsStatusCodeEnum = {
  WAITING_APOLOGY: 100,
  WAITING_DECISION: 200,
  CLOSED: 1000,
};

export const DtsDecisionCodeEnum = {
  ACCEPT: 1,
  WARN: 2,
  REJECT: 3,
};

export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';
