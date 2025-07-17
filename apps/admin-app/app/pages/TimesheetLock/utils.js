import moment from 'moment';

import { TIMESHEET_ACTION } from './constants';

export const getBetweenDates = (startDate, endDate) => {
  const dates = [];
  let currentDate = moment(startDate);
  const stopDate = moment(endDate);

  while (currentDate <= stopDate) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = moment(currentDate).add(1, 'days');
  }

  return dates;
};

export const getTimesheetAction = (timesheets, startDate, endDate) => {
  const hasLockedTimesheets = timesheets.some(ts => ts.isLocked && moment(ts.date).isBetween(startDate, endDate, 'day', '[]'));
  const hasUnlockedTimesheets = timesheets.some(ts => !ts.isLocked && moment(ts.date).isBetween(startDate, endDate, 'day', '[]'));

  if (hasLockedTimesheets && hasUnlockedTimesheets) {
    return TIMESHEET_ACTION.BOTH;
  }
  if (hasLockedTimesheets) {
    return TIMESHEET_ACTION.UNLOCK;
  }

  return TIMESHEET_ACTION.LOCK;
};
