import { Row, Tag } from 'antd';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import { getLangKey, t } from '@shared/i18n';

import { PLANOGRAM_PRODUCT_DOMAIN_TYPES, productSegments } from '@shared/shared/constantValues';
import { formatDate } from '@shared/utils/dateHelper';
import { Button } from '@shared/components/GUI';

const tableFormatter = (key, data = []) => {
  if (data?.length > 0) {
    const foundType = data?.find(element => element?.id === key);
    if (foundType?.name) return <Tag>{foundType?.name}</Tag>;
    return null;
  }
  return null;
};

export const tableColumns = (demographyList, sizeList) => {
  return [
    {
      title: t('planogramPage:WAREHOUSES_DETAIL_PAGE.PRODUCT_NAME'),
      dataIndex: 'name',
      render: name => name[getLangKey()],
    },
    {
      title: t('planogramPage:WAREHOUSES_DETAIL_PAGE.DEMOGRAPHY'),
      dataIndex: 'demographyIds',
      render: demographyIds => demographyIds?.map(element => element && tableFormatter(element, demographyList)),
    },
    {
      title: t('planogramPage:WAREHOUSES_DETAIL_PAGE.SIZE'),
      dataIndex: 'sizeIds',
      render: sizeIds => sizeIds?.map(element => element && tableFormatter(element, sizeList)),
    },
    {
      title: t('planogramPage:WAREHOUSES_DETAIL_PAGE.DOMAIN'),
      dataIndex: 'domainTypes',
      render: domainTypes => domainTypes?.map(type => {
        const foundType = PLANOGRAM_PRODUCT_DOMAIN_TYPES.find(domainType => domainType?.key === type);
        return foundType?.name?.[getLangKey()] && <Tag> {foundType?.name?.[getLangKey()]}</Tag>;
      }),
    },
    {
      title: t('planogramPage:WAREHOUSES_DETAIL_PAGE.SEGMENT'),
      key: 'segments',
      dataIndex: 'segments',
      width: 150,
      render: segments => {
        return segments?.map(segment => <Tag>{productSegments?.[segment]?.[getLangKey()]}</Tag>);
      },
    },
    {
      title: t('planogramPage:WAREHOUSES_DETAIL_PAGE.STORAGE_TYPE'),
      dataIndex: 'storageType',
    },
    {
      title: t('planogramPage:WAREHOUSES_DETAIL_PAGE.LOCAL'),
      dataIndex: 'isManuelAssignment',
      width: 60,
      render: isManuelAssignment => <Row>{t(isManuelAssignment ? 'TRUE' : 'FALSE')}</Row>,
    },
    {
      title: t('planogramPage:WAREHOUSES_DETAIL_PAGE.WAREHOUSE_COUNT'),
      dataIndex: 'warehouseCount',
    },
    {
      title: t('planogramPage:WAREHOUSES_DETAIL_PAGE.LAST_UPDATED'),
      dataIndex: 'updatedAt',
      render: updatedAt => formatDate(updatedAt),
    },
    {
      title: t('planogramPage:TABLES.COLUMN_TITLES.ACTION'),
      key: 'action',
      fixed: 'right',
      render: product => {
        const id = get(product, 'productId', '');
        const detailPath = ROUTE.PLANOGRAM_PRODUCT_DETAIL.path.replace(
          ':id',
          id,
        );
        return (
          <Link to={detailPath}>
            <Button type="default" size="small">
              {t('global:DETAIL')}
            </Button>
          </Link>
        );
      },
    },
  ];
};
