import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';

import { Button } from '@shared/components/GUI';
import { PLANOGRAM_PRODUCT_DOMAIN_TYPES } from '@shared/shared/constantValues';
import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { formatDate } from '@shared/utils/dateHelper';

const tableFormatter = (key, data = []) => {
  if (data?.length > 0) return <Tag>{data?.find(element => element?.id === key)?.name}</Tag>;
  return [];
};

export const tableColumns = (
  sizeList,
  demographyList,
  warehouseTypesList,
) => [
  {
    title: t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.WAREHOUSE_NAME'),
    dataIndex: 'name',
  },
  {
    title: t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.DEMOGRAPHY'),
    dataIndex: 'demographyId',
    render: demographyId => tableFormatter(demographyId, demographyList),
  },
  {
    title: t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.SIZE'),
    dataIndex: 'sizeId',
    render: sizeId => tableFormatter(sizeId, sizeList),
  },
  {
    title: t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.DOMAIN'),
    key: 'domainType',
    render: warehouse => warehouse?.domainTypes?.map(
      element => {
        const foundType = PLANOGRAM_PRODUCT_DOMAIN_TYPES.find(domainType => domainType?.key === element);
        return foundType?.name?.[getLangKey()] && <Tag> {foundType?.name?.[getLangKey()]}</Tag>;
      },
    ),
  },
  {
    title: t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.WAREHOUSE_TYPE'),
    dataIndex: 'warehouseType',
    render: warehouseType => warehouseTypesList[warehouseType],
  },
  {
    title: t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.CITY'),
    dataIndex: 'city',
    render: city => city?.name[getLangKey()],
  },
  {
    title: t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.REGION'),
    dataIndex: 'region',
    render: region => region?.name[getLangKey()],
  },
  {
    title: t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.LAST_UPDATED'),
    dataIndex: 'updatedAt',
    render: updatedAt => formatDate(updatedAt),
  },
  {
    title: t('planogramPage:TABLES.COLUMN_TITLES.ACTION'),
    key: 'action',
    fixed: 'right',
    render: warehouse => {
      const id = get(warehouse, 'warehouseId', '');
      const detailPath = ROUTE.PLANOGRAM_WAREHOUSES_DETAIL.path.replace(':id', id);
      return (
        <Link to={detailPath} target="blank">
          <Button type="default" size="small">
            {t('global:DETAIL')}
          </Button>
        </Link>
      );
    },
  },
];
