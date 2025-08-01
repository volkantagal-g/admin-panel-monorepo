import moment from 'moment';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';

export const INIT_FILTERS = {
  date: [moment().subtract(1, 'days'), moment()],
  endDate: moment().format(DEFAULT_DATE_FORMAT),
  startDate: moment().subtract(1, 'days').format(DEFAULT_DATE_FORMAT),

};
