import moment from 'moment';

import { PREDEFINED_DATES } from './constants';

export const getPredefinedDateRange = selection => {
  const predefinedDateRanges = {
    [PREDEFINED_DATES.SEVEN_DAYS]: {
      startDate: moment().subtract(6, 'day').startOf('day'),
      endDate: moment().endOf('day'),
    },
    [PREDEFINED_DATES.YESTERDAY]: {
      startDate: moment().subtract(1, 'day').startOf('day'),
      endDate: moment().subtract(1, 'day').endOf('day'),
    },
    [PREDEFINED_DATES.TODAY]: {
      startDate: moment().startOf('day'),
      endDate: moment().endOf('day'),
    },
  };

  return predefinedDateRanges[selection] || {};
};
