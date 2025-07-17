import moment from 'moment';

export const formatDateRange = dateRange => {
  if (!dateRange?.startDate) return null;
  // times for start dates always 00.00, for end dates 23.59
  // so larger than 24 hours means 2 or more days interval
  if (dateRange.endDate.diff(dateRange.startDate, 'hours') > 24) {
    return `${moment(dateRange.startDate).format('DD/MM')} - ${moment(dateRange.endDate).format('DD/MM')}`;
  }
  return moment(dateRange.startDate).format('DD/MM');
};

export const getFormattedPercentage = value => {
  let text = '';
  if (value === Infinity) {
    text = '+∞';
  }
  else if (value === -Infinity) {
    text = '-∞';
  }
  else if (Number.isNaN(value)) {
    text = '0';
  }
  else if (value < 1 && value > -1) {
    // show small values with extra precision
    text = value.toFixed(2);
  }
  else {
    text = value.toFixed(0);
  }
  return `${text}%`;
};

export const getTextTypeForNumbers = value => {
  if (Number.isNaN(value) || value === 0) return undefined;
  if (value > 0) return 'success';
  if (value < 0) return 'danger';
  return undefined;
};
