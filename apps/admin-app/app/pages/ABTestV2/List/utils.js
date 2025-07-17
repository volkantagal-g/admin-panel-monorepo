import moment from 'moment';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';

export const getInitialDates = () => {
  return [moment().subtract(1, 'day').startOf('day'), moment()];
};

export const getFormattedRequestData = ({ dates, testName = '', experimentId = '' }) => {
  const formatted = {
    testStartDate: dates[0].format(DEFAULT_DATE_FORMAT),
    testEndDate: dates[1].format(DEFAULT_DATE_FORMAT),
    testName,
    experimentId,
  };
  return formatted;
};
