import moment from 'moment';

const MAIN_STOCK_DAY = 14;
const MAIN_LEAD_DAY = 5;
const STORE_STOCK_DAY = 7;
const IGNORE_STOCK = false;
const GROWTH_RATE = 7;

export const initialValues = {
  demandRange: [
    moment().startOf('isoWeek').subtract(1, 'week'),
    moment().endOf('isoWeek').subtract(1, 'week'),
  ],
  mainStockDay: MAIN_STOCK_DAY,
  mainLeadDay: MAIN_LEAD_DAY,
  storeStockDay: STORE_STOCK_DAY,
  ignoreCurrentStock: IGNORE_STOCK,
  demandMultiplier: GROWTH_RATE,
  pastStockOrderDay: moment().subtract(7, 'days').startOf('day'),
  pastStockTransferDay: moment().subtract(7, 'days').startOf('day'),
};
