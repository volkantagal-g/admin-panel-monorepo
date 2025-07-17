import { get } from 'lodash';

import { Tag } from 'antd';

import { DetailButton } from '@shared/components/UI/List';
import { t } from '@shared/i18n';

export const getTableColumns = ({ hasFranchiseEquipmentDetailPermission }) => {
  return [
    {
      title: t('franchiseEquipmentPage:WAREHOUSE_NAME'),
      width: '150px',
      key: 'warehouseName',
      render: row => {
        return row.warehouseName;
      },
    },
    {
      title: t('franchiseEquipmentPage:FRANCHISE_NAME'),
      width: '150px',
      key: 'franchiseName',
      render: row => {
        return row.franchiseName;
      },
    },
    {
      title: t('franchiseEquipmentPage:CAR_COUNT'),
      width: '150px',
      key: 'carCount',
      align: 'right',
      render: row => {
        return row.carCount;
      },
    },
    {
      title: t('franchiseEquipmentPage:MOTO_COUNT'),
      width: '150px',
      key: 'motoCount',
      align: 'right',
      render: row => {
        return row.motoCount;
      },
    },
    {
      title: t('STATUS'),
      width: '150px',
      key: 'isArchived',
      align: 'right',
      render: row => {
        return (
          <Tag color={row.isArchived ? 'orange' : 'green'}>
            {row.isArchived ? t('franchiseEquipmentPage:ARCHIVED') : t('ACTIVE')}
          </Tag>
        );
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      width: '150px',
      render: record => {
        const _id = get(record, '_id', '');
        const urlPath = '/franchiseEquipment/detail/';

        return (
          hasFranchiseEquipmentDetailPermission
            ?
            DetailButton({ _id, urlPath })
            :
            undefined
        );
      },
    },
  ];
};
