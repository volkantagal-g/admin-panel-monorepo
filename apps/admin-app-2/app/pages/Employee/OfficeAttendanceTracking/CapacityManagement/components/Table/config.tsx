import { get, isEmpty } from 'lodash';

import { t } from '@shared/i18n';
import { ATTENDANCE_LEGEND, FIXED_HEADER_TITLES } from '../../constants';
import { getDateColumnsFromImportData } from '../../utils';

export function getTableColumns({ data }) {
  if (!data || isEmpty(data)) return [];

  const dates = getDateColumnsFromImportData(data[0]);

  return [
    {
      title: FIXED_HEADER_TITLES.EMAIL,
      dataIndex: FIXED_HEADER_TITLES.EMAIL,
      width: 180,
      fixed: 'left',
      render: (email: string) => {
        if (!email || isEmpty(email.trim())) return <span style={{ color: 'red' }}>{t('officeAttendanceTracking:CANNOT_BE_EMPTY')}</span>;

        return email;
      },
    },
    {
      title: FIXED_HEADER_TITLES.EMPLOYEE_NAME,
      dataIndex: FIXED_HEADER_TITLES.EMPLOYEE_NAME,
      width: 180,
      fixed: 'left',
    },
    {
      title: FIXED_HEADER_TITLES.BUSINESS_UNIT,
      dataIndex: FIXED_HEADER_TITLES.BUSINESS_UNIT,
      width: 150,
      fixed: 'left',
    },
    {
      title: FIXED_HEADER_TITLES.DEPARTMENT,
      dataIndex: FIXED_HEADER_TITLES.DEPARTMENT,
      width: 130,
      fixed: 'left',
    },
    ...dates.map(date => ({
      title: date,
      dataIndex: date,
      width: 120,
      render: (value: string | number) => {
        if (!value) return <span style={{ color: 'red' }}>{t('officeAttendanceTracking:CANNOT_BE_EMPTY')}</span>;

        const validValues = Object.keys(ATTENDANCE_LEGEND);
        if (!validValues.includes(value.toString())) {
          return <span style={{ color: 'red' }}>{value} - {t('officeAttendanceTracking:UNACCEPTED_VALUE', { value })}</span>;
        }

        return <span>{t(`officeAttendanceTracking:ATTENDANCE_LEGEND.${ATTENDANCE_LEGEND[value]}`)}</span>;
      },
    })),
  ];
}
