import * as Yup from 'yup';

import { TableFiltersType } from '../../d';
import { DAILY_STATS_INVITE_STATUSES, DAILY_STATS_STATUSES } from '../../../constants';
import { EMPLOYEE_PERMIT_TYPES } from '@app/pages/Employee/constants';

export function validationSchema() {
  return Yup.object()
    .shape({
      employee: Yup.string().optional(),
      supervisor: Yup.string().optional(),
      status: Yup.mixed().oneOf(Object.values(DAILY_STATS_STATUSES)),
    });
}

export const initialValues: TableFiltersType = {
  employee: undefined,
  lineManager: undefined,
  status: undefined,
  leaveType: undefined,
  inviteStatus: undefined,
};

export const getEmployeeDailyStatStatusOptions = ({ t: translate }: { t: Function; }) => {
  return Object.keys(DAILY_STATS_STATUSES).map(key => ({
    value: key,
    label: translate(`officeAttendanceTracking:DAILY_STATS_STATUSES.${key}`) as string,
  }));
};

export const getDailyStatsInviteStatusOptions = ({ t: translate }: { t: Function; }) => {
  return Object.keys(DAILY_STATS_INVITE_STATUSES).map(key => ({
    value: key,
    label: translate(`officeAttendanceTracking:DAILY_STATS_INVITE_STATUSES.${key}`) as string,
  }));
};

export const getPermitTypeOptions = ({ t: translate }: { t: Function; }) => {
  const { NO_SHOW_EXCUSE, ...OTHER_EMPLOYEE_PERMIT_TYPES } = EMPLOYEE_PERMIT_TYPES;
  return Object.values(OTHER_EMPLOYEE_PERMIT_TYPES).map(val => ({
    value: val,
    label: translate(`employeePage:PERMIT_TYPES.${val}`) as string,
  }));
};

export const manipulateValuesBeforeSubmit = (values: TableFiltersType) => {
  return {
    ...values,
    // @ts-ignore
    employee: values.employee?.value,
    // @ts-ignore
    lineManager: values.lineManager?.value,
  };
};
