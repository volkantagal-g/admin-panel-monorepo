import moment from 'moment';

import { Link } from 'react-router-dom';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';

export const tableColumns = ({ t, canAccess }) => [
  {
    title: t('ASSIGNED_EMPLOYEE'),
    dataIndex: 'employee',
    key: 'employee',
    width: 150,
    render: employee => {
      const path = ROUTE.EMPLOYEE_DETAIL_ASSET_LIST.path.replace(':id', employee._id);
      if (canAccess(permKey.PAGE_EMPLOYEE_DETAIL_ASSET_LIST)) {
        return <Link to={path}>{employee?.fullName}</Link>;
      }
      return employee?.fullName;
    },
  },
  {
    title: t('ASSIGNED_DATE'),
    dataIndex: 'assignDate',
    key: 'assignDate',
    width: 150,
    render: assignDate => (assignDate ? moment(assignDate).format(DEFAULT_DATE_FORMAT) : ''),
  },
  {
    title: t('RETURN_DATE'),
    dataIndex: 'returnDate',
    key: 'returnDate',
    width: 150,
    render: returnDate => (returnDate ? moment(returnDate).format(DEFAULT_DATE_FORMAT) : ''),
  },
  {
    title: t('WHO_ASSIGNED'),
    dataIndex: 'assignBy',
    key: 'assignBy',
    width: 150,
    render: assignBy => assignBy?.fullName || '',
  },
  {
    title: t('WHO_RECEIVED'),
    dataIndex: 'returnBy',
    key: 'returnBy',
    width: 150,
    render: returnBy => returnBy?.fullName || '',
  },
];

export const LIMIT = 10;
