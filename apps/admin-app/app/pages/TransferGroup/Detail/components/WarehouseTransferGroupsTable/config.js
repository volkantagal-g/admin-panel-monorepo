import { Button } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getLangKey, t } from '@shared/i18n';
import Excel from '@shared/utils/excel';
import { createMap } from '@shared/utils/common';
import { ROUTE } from '@app/routes';

export const getTableColumns = warehouses => {
  const warehousesMap = createMap(warehouses);
  const columns = [
    {
      title: t('global:NAME'),
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: '80%',
      render: warehouse => {
        return _.get(warehousesMap, [warehouse, 'name'], '');
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      render: record => {
        const warehouseId = _.get(record, 'warehouse', '');
        const path = ROUTE.WAREHOUSE_DETAIL.path.replace(':id', warehouseId);

        return (
          <Link to={path}>
            <Button type="default" size="small">
              {t('global:DETAIL')}
            </Button>
          </Link>
        );
      },
    },
  ];
  return columns;
};

export const excelConfig = {
  fields: [
    {
      key: 'warehouse',
      title: t('transferGroupPage:WAREHOUSE_ID'),
      default: '',
    },
    {
      key: 'warehouseName',
      title: t('transferGroupPage:WAREHOUSE_NAME'),
      default: '',
    },
    {
      key: 'transferGroup',
      title: t('transferGroupPage:TRANSFER_GROUP_ID'),
      default: '',
    },
    {
      key: 'transferGroupName',
      title: t('transferGroupPage:TRANSFER_GROUP_NAME'),
      default: '',
    },
  ],
};

export const exportWarehouseTransferGroupsToExcel = (warehouseTransferGroups = [],
  transferGroup = {}, warehouses = []) => {
  const warehousesMap = createMap(warehouses);
  const newWarehouseTransferGroups = warehouseTransferGroups.map(item => {
    return {
      ...item,
      warehouseName: _.get(warehousesMap, [item.warehouse, 'name'], ''),
      transferGroupName: _.get(transferGroup, ['name', getLangKey()], ''),
    };
  });
  return new Excel({
    fields: excelConfig.fields,
    data: newWarehouseTransferGroups,
  }).export();
};

export const exampleCsv = { "warehouse_id": "5f462f3912009117d823901c" };
