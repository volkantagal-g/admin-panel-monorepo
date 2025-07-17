import moment from 'moment-timezone';

export const getPreviousDatesBeforeToday = current => current > moment().subtract(1, 'day').endOf('day');
