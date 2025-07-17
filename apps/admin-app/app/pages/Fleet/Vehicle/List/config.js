import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { vehicleStatus, vehicleConstraintStatuses } from '@shared/shared/constantValues';
import DetailButton from '@app/pages/Fleet/Vehicle/List/components/DetailButton/index';

export const tableColumns = ({ t }) => {
  return [
    {
      title: t('marketVehicle:WAREHOUSE'),
      dataIndex: 'warehouseName',
      width: '200px',
    },
    {
      title: t('marketVehicle:FRANCHISE'),
      dataIndex: 'franchiseName',
      width: '200px',
    },
    {
      title: t('marketVehicle:PLATE'),
      dataIndex: 'plate',
      width: '100px',
    },
    {
      title: t('marketVehicle:ENGINE_DETAILS'),
      dataIndex: ['licence', 'engineNumber'],
      width: '150px',
      render: value => value || '-',
    },
    {
      title: t('marketVehicle:VEHICLE_TYPE'),
      dataIndex: 'constraint',
      width: '200px',
      render: obj => <span>{ obj?.name || ''}</span>,
    },
    {
      title: t('global:ACTIVE'),
      dataIndex: 'constraint',
      width: '50px',
      render: obj => {
        const element = (
          vehicleConstraintStatuses[obj?.status][getLangKey()] === t('global:ACTIVE') ?
            <CheckOutlined style={{ color: 'green' }} />
            : <CloseOutlined style={{ color: 'red' }} />
        );
        return element;
      },
    },
    {
      title: t('marketVehicle:STATUS'),
      dataIndex: 'status',
      width: '200px',
      render: statusCode => <span>{ statusCode ? vehicleStatus[statusCode][getLangKey()] : ''}</span>,
    },
    {
      title: '',
      key: '_id',
      width: '100px',
      render: obj => DetailButton({
        id: obj._id,
        urlpath: `/fleet/vehicle/detail/${obj._id}`,
      }),
    },
  ];
};
