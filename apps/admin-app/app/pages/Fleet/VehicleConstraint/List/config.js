import moment from 'moment';
import { Tag } from 'antd';

import { DetailButton } from '@shared/components/UI/List';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { marketVehicleTypes } from '@shared/shared/constantValues';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { getLangKey } from '@shared/i18n';
import { vehicleStatusObjectForTag } from '../utils';

export const _getTableColumns = ({ t }) => {
  const { Can } = usePermission();

  return [
    {
      title: t('NAME'),
      dataIndex: 'name',
      key: 'name',
      width: '120px',
    },
    {
      title: t('TYPE'),
      dataIndex: 'type',
      key: 'type',
      width: '120px',
      render: type => marketVehicleTypes?.[type]?.[getLangKey()],
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: '80px',
      render: status => {
        const statusObject = vehicleStatusObjectForTag({ status });
        return <Tag color={statusObject.color}>{statusObject.label}</Tag>;
      },
    },
    {
      title: t('CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '130px',
      render: createdAt => moment(createdAt).format(getLocalDateTimeFormat()),
    },
    {
      title: t('UPDATED_AT'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '130px',
      render: updatedAt => moment(updatedAt).format(getLocalDateTimeFormat()),
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      width: '120px',
      render: _id => (
        <Can permKey={permKey?.PAGE_VEHICLE_CONSTRAINT_DETAIL}>
          <DetailButton _id={_id} urlPath="/fleet/vehicleConstraint/detail/" />
        </Can>
      ),
    },
  ];
};
