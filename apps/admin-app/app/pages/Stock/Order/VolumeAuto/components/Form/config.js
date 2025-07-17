import moment from 'moment';

export const initialValues = {
  storeTransferDay: 1.5,
  maximumStockDay: 10,
  demandMultiplier: 7,
  maxColiCountExist: false,
  maxBoxCount: 5,
  demandRange: [
    moment().startOf('isoWeek').subtract(1, 'week'),
    moment().endOf('isoWeek').subtract(1, 'week'),
  ],
  pastStockOrderDay: moment().subtract(7, 'days').startOf('day'),
  pastStockTransferDay: moment().subtract(7, 'days').startOf('day'),
};
