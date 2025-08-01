import { getLangKey } from '@shared/i18n';

export function getTableColumns({ t }) {
  return [
    {
      title: t('employeePage:EMPLOYEE'),
      dataIndex: 'fullName',
    },
    {
      title: t('employeePage:DEPARTMENT'),
      dataIndex: ['departmentName', getLangKey()],
    },
    {
      title: t('officeAttendanceTracking:BUSINESS_UNIT'),
      dataIndex: ['businessUnitName', getLangKey()],
    },
    {
      title: t('employeePage:SUPERVISOR'),
      dataIndex: ['lineManager', 'fullName'],
    },
    {
      title: t('officeAttendanceTracking:LOCATION'),
      dataIndex: ['mainWorkLocation', 'name', getLangKey()],
    },
    {
      title: t('global:GSM'),
      dataIndex: 'personalGSM',
      render: (personalGSM: {dialCode:string, number: string}) => <a href={`tel:${personalGSM?.number}`}>{personalGSM?.number}</a>,
    },
  ];
}
