import _ from 'lodash';

import { Link } from 'react-router-dom';

import permKey from '@shared/shared/permKey.json';
import { t } from '@shared/i18n';
import { ListTag } from '@shared/components/UI/List';
import { ACTIVE, CLOSED, COURIER_ACTIVENESS, INACTIVE } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';

export const tableColumns = canAccess => [
  {
    title: t('global:NAME'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('warehousePage:GSM'),
    dataIndex: 'gsm',
    key: 'gsm',
  },
  {
    title: t('warehousePage:VEHICLE'),
    dataIndex: '',
    key: 'vehicle',
    render: obj => {
      const vehiclePlate = _.get(obj, 'fleetVehiclePlate', '-');
      const vehicleType = _.get(obj, 'fleetVehicleType', '-');
      const vehicleTypeText = t(`warehousePage:MARKET_VEHICLE_TYPES.${vehicleType}`, { defaultValue: '-' });
      return `${vehiclePlate}(${vehicleTypeText})`;
    },
  },
  {
    title: t('global:STATUS'),
    dataIndex: 'status',
    key: 'status',
    render: status => {
      return t(`warehousePage:COURIER_STATUSES.${status}`);
    },
  },
  {
    title: t('warehousePage:ACTIVENESS'),
    dataIndex: 'isLoggedIn',
    key: 'isLoggedIn',
    render: status => {
      const statusKey = (status && ACTIVE) || (status === false && CLOSED) || INACTIVE;
      return ListTag({
        tagCode: statusKey,
        tagType: COURIER_ACTIVENESS,
        namespace: 'warehousePage',
      });
    },
  },
  {
    title: '',
    key: '_id',
    width: '10%',
    render: obj => {
      // neeeds to be replaced with an internal link with a permission check when courier detail page is migrated
      return canAccess(permKey.PAGE_COURIER_DETAIL) && <Link to={ROUTE.COURIER_DETAIL.path.replace(':id', obj._id)}>{t('global:DETAIL')}</Link>;
    },
  },
];
