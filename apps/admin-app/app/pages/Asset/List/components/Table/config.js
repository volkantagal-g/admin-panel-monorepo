import { Button } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';

export const tableColumns = ({ t, canAccess }) => [
  {
    title: t('NAME_OF_ASSET'),
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: name => name,
  },
  {
    title: t('DEVICE_TYPE'),
    dataIndex: 'deviceType',
    key: 'deviceType',
    width: 150,
    render: deviceType => t(`assetPage:ASSET_TYPES.${deviceType?.toString()}`),
  },
  {
    title: t('ASSIGNMENT_STATUS'),
    dataIndex: 'assignmentStatus',
    key: 'assignmentStatus',
    width: 150,
    render: assignmentStatus => t(`assetPage:ASSET_ASSIGNMENT_STATUSES.${assignmentStatus?.toString()}`),
  },
  {
    title: t('assetPage:COUNTRY'),
    dataIndex: 'country',
    key: 'country',
    width: 150,
    render: country => (country ? t(`assetPage:ASSET_COUNTRIES.${country?.toString()}`) : ''),
  },
  {
    title: t('CITY'),
    dataIndex: 'city',
    key: 'city',
    width: 150,
    render: city => city?.name || city || '',
  },
  {
    title: t('DEVICE_SERIAL_NUMBER'),
    dataIndex: 'deviceSerialNumber',
    key: 'deviceSerialNumber',
    width: 150,
    render: deviceSerialNumber => deviceSerialNumber,
  },
  {
    title: t('assetPage:INVOICE_NUMBER'),
    dataIndex: 'invoiceNumber',
    key: 'invoiceNumber',
    width: 150,
    render: invoiceNumber => invoiceNumber,
  },
  {
    title: t('ASSIGNED_EMPLOYEE'),
    dataIndex: 'assignedEmployee',
    key: 'assignedEmployee',
    width: 150,
    render: assignedEmployee => assignedEmployee?.fullName || '',
  },
  {
    title: t('ACTION'),
    align: 'right',
    width: 100,
    render: record => {
      const id = _.get(record, '_id', '');
      const path = ROUTE.EMPLOYEE_ASSET_DETAIL.path.replace(':assetId', id);
      return (canAccess(permKey.PAGE_EMPLOYEE_ASSET_DETAIL) && (
        <Link to={path}>
          <Button type="default" size="small">
            {t('DETAIL')}
          </Button>
        </Link>
      ));
    },
  },
];
