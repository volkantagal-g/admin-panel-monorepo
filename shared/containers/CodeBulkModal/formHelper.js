import moment from 'moment';

import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';

export const getTimezonedDates = (startDate, endDate) => {
  if (startDate && endDate) {
    const timezonedStartDate = moment.tz(startDate, getSelectedCountryTimezone.getData()).valueOf();
    const timezonedEndDate = moment.tz(endDate, getSelectedCountryTimezone.getData()).valueOf();
    return { validFrom: timezonedStartDate, validUntil: timezonedEndDate };
  }
  return { startDate, endDate };
};

export const getOnlyModifiedValuesBeforeSubmit = ({ values, t }) => {
  const { validFrom, validUntil } = getTimezonedDates(values.validFrom, values.validUntil);

  if (!validFrom || !validUntil) {
    throw new Error(t('ERR_START_END_DATES'));
  }

  const newValues = {
    ...values,
    validFrom,
    validUntil,
  };

  return newValues;
};
