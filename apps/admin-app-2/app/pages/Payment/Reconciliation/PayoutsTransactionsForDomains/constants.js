import moment from 'moment';

export const INIT_FILTERS = {
  date: [moment().subtract(1, 'days'), moment()],
  activityId: '',
  iban: '',
  payoutStatus: '',
  pageNumber: 1,
  pageSize: 10,
};

export const PAYOUT_OPTIONS = t => [
  {
    label: t('payoutTransactionsForDomains:PAYOUT_OPTIONS.InProgress'),
    value: 200,
  },
  {
    label: t('payoutTransactionsForDomains:PAYOUT_OPTIONS.Completed'),
    value: 300,
  },
  {
    label: t('payoutTransactionsForDomains:PAYOUT_OPTIONS.Error'),
    value: 400,
  },

];

export const excelFileName = `payouts_for_domains_${moment(new Date()).format(
  'DD-MM-YYYY',
)}`;

export const CUSTOM_DATE_FORMAT = 'DD-MM-YYYY HH:mm:ss';
