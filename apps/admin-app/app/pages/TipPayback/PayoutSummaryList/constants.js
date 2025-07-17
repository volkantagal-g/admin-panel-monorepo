import moment from 'moment';

export const INIT_FILTERS = {
  pageNo: 1,
  pageSize: 25,
  date: [moment().subtract(1, 'days'), moment()],
  startDate: moment().subtract(1, 'days').endOf('day').valueOf(),
  finishDate: moment().endOf('day').valueOf(),
  sort: 'createdAt,desc',
};

export const PAYOUT_SUMMARY_STATUS_VALUES = {
  100: {
    label: 'NOT_STARTED',
    color: 'grey',
  },
  200: {
    label: 'IN_PROGRESS',
    color: 'yellow',
  },
  300: {
    label: 'COMPLETE',
    color: 'green',
  },
  400: {
    label: 'ERROR',
    color: 'red',
  },
  500: {
    label: 'CANCEL',
    color: 'red',
  },
};
