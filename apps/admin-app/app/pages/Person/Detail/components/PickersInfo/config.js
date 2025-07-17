import { Button } from 'antd';

import { getLangKey } from '@shared/i18n';
import { PICKER_TYPES, courierStatuses } from '@shared/shared/constantValues';
import { PICKER_TYPE } from '@shared/shared/constants';
import { showActivenessTag } from '../../utils';

export const getTableColumns = ({ convertedWarehouses, t }) => {
  return [
    {
      title: t('TYPE2'),
      key: 'pickerType',
      width: 150,
      render: () => PICKER_TYPES[PICKER_TYPE.GENERAL][getLangKey()],
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
      render: pickerId => (
        <Button
          size="small"
          type="ghost"
          target="_blank"
          href={`/picker/detail/${pickerId}`}
        >
          {t('DETAIL')}
        </Button>
      ),
    },
  ];
};
