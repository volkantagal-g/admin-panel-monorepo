import { Button } from 'antd';

import { getLangKey } from '@shared/i18n';
import { allCourierTypes, courierStatuses } from '@shared/shared/constantValues';
import { showActivenessTag } from '../../utils';

export const getTableColumns = ({ convertedWarehouses, t }) => {
  return [
    {
      title: t('TYPE2'),
      dataIndex: 'courierType',
      key: 'courierType',
      width: 150,
      render: courierType => allCourierTypes[courierType]?.[getLangKey()],
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: status => courierStatuses[status]?.[getLangKey()],
    },
    {
      title: t('ACTIVENESS'),
      dataIndex: 'isActivated',
      key: 'isActivated',
      width: 100,
      render: isActivated => showActivenessTag({ isActivated, t }),
    },
    {
      title: t('WAREHOUSE'),
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: 200,
      render: warehouseId => convertedWarehouses?.[warehouseId]?.name || warehouseId,
    },
    {
      dataIndex: '_id',
      key: '_id',
      width: 100,
      render: courierId => (
        <Button
          size="small"
          type="ghost"
          target="_blank"
          href={`/courier/detail/${courierId}`}
        >
          {t('DETAIL')}
        </Button>
      ),
    },
  ];
};
