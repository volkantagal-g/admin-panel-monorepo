import moment from 'moment';
import { TFunction } from 'react-i18next';
import { Badge } from 'antd';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';

export function getTableColumns({ t } : {t: TFunction}) {
  return [
    {
      title: '#',
      dataIndex: ['isReturned'],
      width: 25,
      render: (isReturned: boolean) => <Badge status={isReturned ? 'error' : 'success'} />,
    },
    {
      title: t('profile:COMPONENTS.VEHICLES.PLATE_NUMBER'),
      dataIndex: ['asset', 'uniqueIdentifier'],
      render: (text: string) => text || '-',
    },
    {
      title: t('profile:COMPONENTS.VEHICLES.VEHICLE_BRAND'),
      dataIndex: ['asset', 'fieldValues', 'vehicleBrand'],
      render: (vehicleBrand: number) => t(`assetManagement:VEHICLE_BRANDS.${vehicleBrand}`),
    },
    {
      title: t('profile:COMPONENTS.VEHICLES.VEHICLE_MODEL'),
      dataIndex: ['asset', 'fieldValues', 'vehicleModel'],
      render: (vehicleModel: number) => t(`assetManagement:VEHICLE_MODELS.${vehicleModel}`),
    },
    {
      title: t('profile:COMPONENTS.VEHICLES.CHASSIS_NUMBER'),
      dataIndex: ['asset', 'fieldValues', 'vehicleChassisNumber'],
      render: (vehicleChassisNumber: string) => vehicleChassisNumber || '-',
    },
    {
      title: t('profile:COMPONENTS.VEHICLES.DATE_ASSIGNED_TO_EMPLOYEE'),
      dataIndex: ['assignDate'],
      render: (assignDate: string) => moment(assignDate).format(DEFAULT_DATE_FORMAT) || '-',
    },
    {
      title: t('profile:COMPONENTS.VEHICLES.DATE_OF_WITHDRAWAL_FROM_EMPLOYEE'),
      dataIndex: ['returnDate'],
      render: (returnDate: string) => (returnDate ? moment(returnDate).format(DEFAULT_DATE_FORMAT) : '-'),
    },
  ];
}
