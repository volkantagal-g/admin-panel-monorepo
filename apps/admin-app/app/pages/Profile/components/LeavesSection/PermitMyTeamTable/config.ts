import { TFunction } from 'react-i18next';
import moment from 'moment';

import { LOCAL_DATE_FORMAT } from '@shared/shared/constants';

export const getTableColumns = (t: TFunction) => {
  return [
    {
      title: t('employeePage:EMPLOYEE_NAME'),
      dataIndex: 'fullName',
      width: 180,
    },
    {
      title: t('employeePage:WORK_EMAIL'),
      dataIndex: 'workEmail',
      width: 180,
    },
    {
      title: t('employeePage:WORK_START_DATE'),
      dataIndex: 'workStartDate',
      width: 100,
      render: (workStartDate: string) => moment(workStartDate).format(LOCAL_DATE_FORMAT.EN),
    },
    {
      title: t('employeePage:VESTED_PERMIT_DAYS'),
      dataIndex: 'vested',
      width: 100,
      render: (vestedLeaveDays: number) => vestedLeaveDays || 0,
    },
    {
      title: t('employeePage:USED_PERMIT_DAYS'),
      dataIndex: 'used',
      width: 100,
      render: (usedLeaveDays: number) => usedLeaveDays || 0,
    },
    {
      title: t('employeePage:REMAINING_PERMIT_DAYS'),
      width: 100,
      dataIndex: 'remaining',
    },
  ];
};
