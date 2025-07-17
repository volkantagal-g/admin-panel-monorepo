import moment from 'moment-timezone';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';

export const getInitialDateRanges = () => {
  const timezone = getSelectedCountryTimezone.getData();

  const startOfDay = moment.tz(timezone).startOf('day');
  const endOfDay = moment.tz(timezone).endOf('day');

  return {
    startDate: startOfDay,
    endDate: endOfDay,
  };
};

export const getInitialEndDate = () => moment.tz(getSelectedCountryTimezone.getData()).endOf('day');

export const getIsoDateString = date => {
  const selectedCountryTimezone = getSelectedCountry().timezones[0].timezone;
  return moment.tz(date, selectedCountryTimezone).toISOString();
};

export const getHours = (hourRangeMin, hourRangeMax, timezone) => {
  const hourRange = [];

  if (!(hourRangeMin === 0 && hourRangeMax === 24)) {
    const startHour = hourRangeMin;
    const endHour = hourRangeMax;
    for (let i = startHour; i < endHour; i += 1) {
      hourRange.push(moment.tz(timezone).startOf('day').add(i, 'hours').utc()
        .hour());
    }
  }

  return hourRange;
};

export const getDisabledDates = current => current > moment().endOf('day');
