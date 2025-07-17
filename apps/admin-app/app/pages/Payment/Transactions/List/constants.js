import moment from 'moment';

export const INIT_FILTERS = {
  transactionId: '',
  merchantReference: '',
  createdAt: [moment().utc().subtract(1, 'months').startOf('day'), moment().utc().endOf('day')],
  createdStartDate: moment().utc().subtract(1, 'months').startOf('day'),
  createdEndDate: moment().utc().endOf('day'),
  currentPage: 1,
  rowsPerPage: 10,
  sort: { field: 'createdAt', orderBy: 'desc' },
  merchantId: undefined,
  paymentProvider: '',
  paymentMethod: '',
  status: undefined,
  mixed: undefined,
  merchantKey: undefined,
  eventId: '',
  shopperId: '',
  merchantOrderId: '',
  pspReference: '',
  deviceType: undefined,
};
