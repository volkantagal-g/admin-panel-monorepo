import { get } from 'lodash';

import moment from 'moment';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import ReturnAsset from './components/ReturnAsset';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import AssignOrReturnConfirmation from './components/AssignOrReturnConfirmation';

export const tableColumns = ({ t }) => [
  {
    title: t('assetPage:NAME'),
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: name => name,
  },
  {
    title: t('assetPage:DEVICE_TYPE'),
    dataIndex: 'deviceType',
    key: 'deviceType',
    width: 150,
    render: deviceType => t(`assetPage:ASSET_TYPES.${deviceType?.toString()}`),
  },
  {
    title: t('assetPage:DEVICE_SERIAL_NUMBER'),
    dataIndex: 'deviceSerialNumber',
    key: 'deviceSerialNumber',
    width: 150,
    render: deviceSerialNumber => deviceSerialNumber,
  },
  {
    title: t('assetPage:ASSIGNED_DATE'),
    dataIndex: 'assignDate',
    key: 'assignDate',
    width: 150,
    render: assignDate => moment(assignDate).format(DEFAULT_DATE_FORMAT) || '',
  },
  {
    title: t('assetPage:ASSIGNED_NOTE'),
    dataIndex: 'assignNote',
    key: 'assignNote',
    width: 150,
    render: assignNote => assignNote || '',
  },
  {
    title: t('assetPage:ASSIGN_BY'),
    dataIndex: 'assignBy',
    key: 'assignBy',
    width: 150,
    render: assignBy => assignBy?.fullName || '',
  },
  {
    title: t('assetPage:ASSIGNMENT_CONFIRMED_BY_EMPLOYEE'),
    key: 'assignmentConfirmedByEmployee',
    width: 150,
    render: record => {
      const isConfirmed = get(record, 'assignmentConfirmedByEmployee', '');
      const assignmentId = get(record, '_id', '');
      return <AssignOrReturnConfirmation isConfirmed={isConfirmed} isAssignmentConfirmation assignmentId={assignmentId} />;
    },
  },
  {
    title: t('assetPage:RETURN_DATE'),
    key: 'returnDate',
    width: 150,
    render: record => {
      const returnDate = get(record, 'returnDate', '');
      return (returnDate ? moment(returnDate).format(DEFAULT_DATE_FORMAT) : <ReturnAsset {...record} />);
    },
  },
  {
    title: t('assetPage:RETURN_NOTE'),
    dataIndex: 'returnNote',
    key: 'returnNote',
    width: 150,
    render: returnNote => returnNote || '',
  },
  {
    title: t('assetPage:DEVICE_RETURN_CONDITION'),
    dataIndex: 'returnDeviceStatus',
    key: 'returnDeviceStatus',
    width: 150,
    render: returnDeviceStatus => (returnDeviceStatus ? t(`assetPage:ASSET_DEVICE_STATUSES.${returnDeviceStatus?.toString()}`) : ''),
  },
  {
    title: t('assetPage:RETURN_BY'),
    dataIndex: 'returnBy',
    key: 'returnBy',
    width: 150,
    render: returnBy => returnBy?.fullName || '',
  },
  {
    title: t('assetPage:RETURN_CONFIRMED_BY_EMPLOYEE'),
    key: 'returnConfirmedByEmployee',
    width: 150,
    render: record => {
      const isConfirmed = get(record, 'returnConfirmedByEmployee', '');
      const assignmentId = get(record, '_id', '');
      return <AssignOrReturnConfirmation isConfirmed={isConfirmed} isAssignmentConfirmation={false} assignmentId={assignmentId} />;
    },
  },
  {
    title: t('assetPage:ACTION'),
    align: 'right',
    width: 100,
    render: record => {
      const id = get(record, 'asset', '');
      const path = ROUTE.EMPLOYEE_ASSET_DETAIL.path.replace(':assetId', id);
      return <RedirectButtonV2 permKey={permKey.PAGE_EMPLOYEE_ASSET_DETAIL} to={path} text={t('DETAIL')} type="default" size="small" />;
    },
  },
];
