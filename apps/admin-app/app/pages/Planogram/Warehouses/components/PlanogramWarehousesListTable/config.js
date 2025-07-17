import { Row, Tag } from 'antd';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { Button } from '@shared/components/GUI';
import { formatDate } from '@shared/utils/dateHelper';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';

import { PLANOGRAM_PRODUCT_DOMAIN_TYPES } from '@shared/shared/constantValues';
import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';

export const tableColumns = (demographyList, sizeList, classes) => {
  const renderWarehouseActionColumn = record => {
    const id = get(record, 'warehouseId', '');
    const detailPath = ROUTE.PLANOGRAM_WAREHOUSES_DETAIL.path.replace(':id', id);

    if (!record.isConverted) {
      const convertPath = ROUTE.PLANOGRAM_WAREHOUSE_CONVERT.path.replace(':id', id);
      return (
        <Link to={convertPath}>
          <Button type="secondary" size="small" className={classes.listButton}>
            {t('planogramPage:CONVERT')}
          </Button>
        </Link>
      );
    }

    return (
      <Link to={detailPath}>
        <Button type="default" size="small" className={classes.listButton}>
          {t('global:DETAIL')}
        </Button>
      </Link>
    );
  };

  return [
    {
      title: t('planogramPage:WAREHOUSE_NAME'),
      width: 200,
      key: 'warehouseName',
      render: warehouse => (
        <>
          <Row>{warehouse?.name}</Row>
          {warehouse?.warehouseId && (
            <CopyToClipboard message={warehouse?.warehouseId} />
          )}
        </>
      ),
    },
    {
      title: t('planogramPage:WAREHOUSES_PAGES.LIST_AND_FILTER.DEMOGRAPHY'),
      key: 'demographyName',
      render: warehouse => {
        return (
          demographyList?.length > 0 && (
            <Tag>
              {demographyList?.find(demography => demography?.id === warehouse?.demographyId)?.name}
            </Tag>
          )
        );
      },
    },
    {
      title: t('planogramPage:WAREHOUSES_PAGES.LIST_AND_FILTER.SIZE'),
      key: 'sizeName',
      render: warehouse => {
        return (
          sizeList?.length > 0 && (
            <Tag>
              {sizeList?.find(size => size?.id === warehouse?.sizeId)?.name}
            </Tag>
          )
        );
      },
    },
    {
      title: t('planogramPage:WAREHOUSES_PAGES.LIST_AND_FILTER.DOMAIN'),
      key: 'warehouseDomain',
      render: warehouse => warehouse?.domainTypes?.map(domain => {
        const foundType = PLANOGRAM_PRODUCT_DOMAIN_TYPES.find(
          domainType => domainType?.key === domain,
        );
        return foundType?.name?.[getLangKey()] && <Tag> {foundType?.name?.[getLangKey()]}</Tag>;
      }),
    },
    {
      title: t('planogramPage:WAREHOUSES_PAGES.LIST_AND_FILTER.WAREHOUSE_TYPE'),
      key: 'warehouseType',
      render: warehouse => t(`${'global:WAREHOUSE_TYPES'}:${warehouse?.warehouseType}`),
    },
    {
      title: t('planogramPage:WAREHOUSES_PAGES.LIST_AND_FILTER.CITY'),
      key: 'city',
      render: warehouse => warehouse?.city?.name[getLangKey()],
    },
    {
      title: t('planogramPage:WAREHOUSES_PAGES.LIST_AND_FILTER.REGION'),
      key: 'region',
      render: warehouse => warehouse?.region?.name[getLangKey()],
    },
    {
      title: t('planogramPage:WAREHOUSES_PAGES.LIST_AND_FILTER.PRODUCT_COUNT'),
      key: 'planogramCount',
      render: warehouse => warehouse?.productCount,
    },
    {
      title: t('planogramPage:WAREHOUSES_PAGES.LIST_AND_FILTER.LAST_UPDATED'),
      key: 'updatedAt',
      render: warehouse => formatDate(warehouse?.updatedAt),
    },
    {
      title: t('planogramPage:TABLES.COLUMN_TITLES.ACTION'),
      key: 'action',
      fixed: 'right',
      render: renderWarehouseActionColumn,
    },
  ];
};
