import { Row, message, Tag } from 'antd';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import { Button } from '@shared/components/GUI';
import { formatDate } from '@shared/utils/dateHelper';
import { PLANOGRAM_PRODUCT_DOMAIN_TYPES, productSegments } from '@shared/shared/constantValues';
import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';

export const tableColumns = (sizeList, demographyList, classes) => {
  const renderActionColumn = product => {
    const id = get(product, 'productId', '');
    const detailPath = ROUTE.PLANOGRAM_PRODUCT_DETAIL.path.replace(':id', id);

    if (!product?.isConverted) {
      const convertPath = ROUTE.PLANOGRAM_PRODUCT_CONVERT.path.replace(':id', id);
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
      title: t('planogramPage:PRODUCT_LIST.FILTER_AND_TABLE.PRODUCT_ID'),
      key: 'id',
      width: 200,
      render: product => {
        return (
          product?.productId && (
            <Row
              color="secondary"
              onClick={() => {
                copy(product.productId);
                message.success(t('global:COPIED_TO_CLIPBOARD'));
              }}
            >
              <span>{product.productId}</span>
            </Row>
          )
        );
      },
    },
    {
      title: t('planogramPage:PRODUCT_LIST.FILTER_AND_TABLE.PRODUCT_NAME'),
      key: 'name',
      width: 300,
      render: product => <Row>{product?.name?.[getLangKey()]}</Row>,
    },
    {
      title: t('planogramPage:PRODUCT_LIST.FILTER_AND_TABLE.DEMOGRAPHY'),
      key: 'demographyName',
      width: 150,
      render: product => demographyList?.length > 0 && product?.demographyIds?.map(type => {
        const foundType = demographyList.find(demography => demography.id === type);
        return foundType && foundType.name && <Tag> {foundType.name}</Tag>;
      }),
    },
    {
      title: t('planogramPage:PRODUCT_LIST.FILTER_AND_TABLE.SIZE'),
      key: 'sizeName',
      width: 100,
      render: product => sizeList?.length > 0 && product?.sizeIds?.map(type => {
        const foundType = sizeList.find(size => size.id === type);
        return foundType && foundType.name && <Tag> {foundType.name}</Tag>;
      }),
    },
    {
      title: t('planogramPage:PRODUCT_LIST.FILTER_AND_TABLE.DOMAIN'),
      key: 'productDomain',
      width: 100,
      render: product => product?.domainTypes?.map(type => {
        const foundType = PLANOGRAM_PRODUCT_DOMAIN_TYPES.find(domainType => domainType?.key === type);
        return foundType && foundType.name?.[getLangKey()] && <Tag> {foundType.name[getLangKey()]}</Tag>;
      }),
    },
    {
      title: t('planogramPage:PRODUCT_LIST.FILTER_AND_TABLE.SEGMENT'),
      key: 'segments',
      dataIndex: 'segments',
      width: 150,
      render: segments => {
        return segments?.map(segment => <Tag>{productSegments?.[segment]?.[getLangKey()]}</Tag>);
      },
    },
    {
      title: t('planogramPage:PRODUCT_LIST.FILTER_AND_TABLE.LOCAL'),
      dataIndex: 'isManuelAssignment',
      key: 'isManuelAssignment',
      width: 60,
      render: isLocal => <Row>{t(isLocal ? 'TRUE' : 'FALSE')}</Row>,
    },
    {
      title: t('planogramPage:PRODUCT_LIST.FILTER_AND_TABLE.WAREHOUSE_COUNT'),
      dataIndex: 'warehouseCount',
      key: 'warehouseCount',
      width: 100,
    },
    {
      title: t('planogramPage:PRODUCT_LIST.FILTER_AND_TABLE.LAST_UPDATED'),
      key: 'updatedAt',
      width: 150,
      render: record => formatDate(record?.updatedAt),
    },
    {
      title: t('planogramPage:TABLES.COLUMN_TITLES.ACTION'),
      key: 'action',
      fixed: 'right',
      width: 100,
      render: renderActionColumn,
    },
  ];
};
