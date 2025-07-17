import axios from '@shared/axios/common';

export const filterLockedTimesheets = ({ minDate, maxDate, countryCode }) => axios({
  url: '/timesheetLock/filter',
  method: 'POST',
  data: {
    minDate,
    maxDate,
    countryCode,
  },
}).then(response => response.data);

export const lockTimesheets = ({ dates, countryCode }) => axios({
  url: '/timesheetLock/lock',
  method: 'PATCH',
  data: {
    dates,
    countryCode,
  },
}).then(response => response.data);

export const unlockTimesheets = ({ dates, countryCode }) => axios({
  url: '/timesheetLock/unlock',
  method: 'PATCH',
  data: {
    dates,
    countryCode,
  },
}).then(response => response.data);
