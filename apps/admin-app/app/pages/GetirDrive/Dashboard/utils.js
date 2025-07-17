import moment from 'moment-timezone';

import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';

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
      endDate: moment().endOf('day'),
      startDate: moment().startOf('day'),
    },
  };

  return predefinedDateRanges[selection];
};

export const getInitialDateRanges = () => ({
  startDate: moment.tz(getSelectedCountryTimezone.getData()).startOf('day'),
  endDate: moment.tz(getSelectedCountryTimezone.getData()).endOf('day'),
});

export const getIsoDateString = date => moment.tz(date, getSelectedCountryTimezone.getData()).toISOString();

export const getHours = (hourRangeMin, hourRangeMax) => {
  const hourRange = [];

  if (!(hourRangeMin === 0 && hourRangeMax === 24)) {
    const startHour = hourRangeMin;
    const endHour = hourRangeMax;
    for (let i = startHour; i < endHour; i += 1) {
      hourRange.push(moment.tz(getSelectedCountryTimezone.getData()).startOf('day').add(i, 'hours').utc()
        .hour());
    }
  }

  return hourRange;
};
