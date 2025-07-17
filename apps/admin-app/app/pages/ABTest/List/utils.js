import moment from 'moment';

export const getInitialDates = () => {
  return [moment().subtract(1, 'day').startOf('day'), moment()];
};

export const getFormattedRequestData = ({ dates, testName = '', testCode = '' }) => {
  const formatted = {
    testStartDate: dates[0].toISOString(),
    testEndDate: dates[1].toISOString(),
    testName,
    testCode,
  };
  return formatted;
};
