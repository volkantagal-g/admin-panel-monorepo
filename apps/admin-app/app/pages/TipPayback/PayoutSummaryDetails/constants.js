export const INIT_FILTERS = {
  pageNo: 1,
  pageSize: 25,
  id: null,
  personName: null,
  person: null,
  payoutStatus: null,
  taxNum: null,
};

export const PAYOUT_STATUS_OPTIONS = t => [
  {
    label: t('payoutSummaryPage:NOT_PAID'),
    value: 100,
  },
  {
    label: t('payoutSummaryPage:WAITING'),
    value: 200,
  },
  {
    label: t('payoutSummaryPage:PAID'),
    value: 300,
  },
  {
    label: t('payoutSummaryPage:PAYMENT_ERROR'),
    value: 400,
  },
  {
    label: t('payoutSummaryPage:CANCEL'),
    value: 500,
  },
  {
    label: t('payoutSummaryPage:PAYMENT_SERVICE_ERROR'),
    value: 600,
  },
];

export const PAYOUT_STATUS_VALUES = {
  100: {
    label: 'NOT_PAID',
    color: 'grey',
  },
  200: {
    label: 'WAITING',
    color: 'yellow',
  },
  300: {
    label: 'PAID',
    color: 'green',
  },
  400: {
    label: 'PAYMENT_ERROR',
    color: 'red',
  },
  500: {
    label: 'CANCEL',
    color: 'red',
  },
  600: {
    label: 'PAYMENT_SERVICE_ERROR',
    color: 'red',
  },
};
