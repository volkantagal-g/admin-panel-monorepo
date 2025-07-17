import moment from 'moment-timezone';

import { PREDEFINED_DATES } from './constants';

export const getPredefinedDateRange = selection => {
  const predefinedDateRanges = {
    [PREDEFINED_DATES.SEVEN_DAYS]: {
      endDate: moment().subtract(1, 'day').endOf('day'),
      startDate: moment().subtract(7, 'day').startOf('day'),
    },
    [PREDEFINED_DATES.YESTERDAY]: {
      endDate: moment().subtract(1, 'day').endOf('day'),
      startDate: moment().subtract(1, 'day').startOf('day'),
    },
    [PREDEFINED_DATES.TODAY]: {
      endDate: moment(),
      startDate: moment().startOf('day'),
    },
  };

  return predefinedDateRanges[selection] || {};
};
