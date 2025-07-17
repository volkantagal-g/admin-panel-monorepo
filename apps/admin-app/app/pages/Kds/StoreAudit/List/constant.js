import moment from 'moment';

export const auditStartDate = moment().endOf('day').subtract(3, 'month');
export const auditEndDate = moment().endOf('day');
