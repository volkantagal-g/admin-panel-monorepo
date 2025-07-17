import moment from 'moment';

import { AUTO_TRANSFER_SERVICE_TYPE } from '@app/pages/Stock/Transfer/constants';

export const initialValues = {
  serviceType: AUTO_TRANSFER_SERVICE_TYPE.DEFAULT,
  demandRange: [
    moment().startOf('isoWeek').subtract(1, 'week'),
    moment().endOf('isoWeek').subtract(1, 'week'),
  ],
  storeLeadDay: 5,
  maximumStockDay: 10,
  stockDay: 21,
  ignoreCurrentStock: false,
  pastStockOrderDay: moment().subtract(7, 'days').startOf('day'),
  pastStockTransferDay: moment().subtract(7, 'days').startOf('day'),
  demandMultiplier: 7,
};
