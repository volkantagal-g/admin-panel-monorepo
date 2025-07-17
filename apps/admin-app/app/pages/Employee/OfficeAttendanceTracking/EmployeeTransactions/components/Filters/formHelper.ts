import moment from 'moment';

import { DAILY_STATS_STATUSES } from '../../../constants';

type EmployeeTransactionFilterValuesType = {
  startDate: moment.Moment | string | null;
  endDate: moment.Moment | string | null;
  status?: string | null;
  employee?: string;
};

export const initialValues: EmployeeTransactionFilterValuesType = {
  startDate: moment().subtract(1, 'month').startOf('isoWeek'),
  endDate: moment().endOf('day'),
  employee: '',
};

export const getEmployeeDailyStatStatusOptions = ({ t: translate }: { t: Function; }) => {
  return Object.keys(DAILY_STATS_STATUSES).map(key => ({
    value: key,
    label: translate(`officeAttendanceTracking:DAILY_STATS_STATUSES.${key}`) as string,
  }));
};
