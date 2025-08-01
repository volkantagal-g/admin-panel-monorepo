import { Button, Badge, Tooltip } from 'antd';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { marketProductStatuses } from '@shared/shared/constantValues';
import jssTheme from '@shared/jssTheme';
import { MARKET_PRODUCT_CATEGORY_STATUS } from '@shared/shared/constants';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';

export const getTableColumns = ({ warehousesMap, categoriesMap }) => {
  const columns = [
    {
      title: t('global:CITY'),
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: 80,
      render: warehouseId => {
        const cityName = get(warehousesMap, [warehouseId, 'city', 'name', getLangKey()]);
        return cityName;
      },
    },
    {
      title: t('global:WAREHOUSE'),
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: 80,
      render: warehouseId => {
        const warehouseName = get(warehousesMap, [warehouseId, 'name']);
        const path = ROUTE.WAREHOUSE_DETAIL.path.replace(':id', warehouseId);
        return (
          <Link to={path}>
            {warehouseName}
          </Link>
        );
      },
    },
    {
      title: t('global:CATEGORY'),
      dataIndex: 'category',
      key: 'category',
      width: 80,
      render: (categoryId, { isSubCategory }) => {
        const category = categoriesMap?.[categoryId];
        let catId = categoryId;
        let categoryName = category?.name?.[getLangKey()];
        let tooltipTitle = marketProductStatuses?.[category?.status]?.[getLangKey()];
        let color = MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE === category?.status ? jssTheme.color.green : jssTheme.color.red;
        if (isSubCategory) {
          catId = category?.parent;
          const parentCategory = get(categoriesMap, [catId]);
          categoryName = parentCategory?.name?.[getLangKey()];
          tooltipTitle = marketProductStatuses?.[parentCategory?.status]?.[getLangKey()];
          color = MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE === parentCategory?.status ? jssTheme.color.green : jssTheme.color.red;
        }
        const path = ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', catId);
        return (
          <Tooltip title={tooltipTitle}>
            <Badge color={color} />
            <Link to={path}>
              {categoryName}
            </Link>
          </Tooltip>
        );
      },
    },
    {
      title: t('global:SUB_CATEGORY'),
      dataIndex: 'category',
      key: 'category',
      width: 80,
      render: (categoryId, { isSubCategory }) => {
        const category = categoriesMap?.[categoryId];
        let categoryName = '-';
        if (isSubCategory) {
          categoryName = category?.name?.[getLangKey()];
        }
        const tooltipTitle = marketProductStatuses?.[category?.status]?.[getLangKey()];
        const color = MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE === category?.status ? jssTheme.color.green : jssTheme.color.red;
        const path = ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', categoryId);
        return (
          <Tooltip title={isSubCategory ? tooltipTitle : ''}>
            {isSubCategory && <Badge color={color} />}
            <Link to={path}>
              {categoryName}
            </Link>
          </Tooltip>
        );
      },
    },
    {
      title: t('global:DOMAIN_TYPE'),
      dataIndex: 'domainType',
      key: 'domainType',
      width: 80,
      render: domainType => {
        const domainTypeText = get(getirMarketDomainTypes, [domainType, getLangKey()]);
        return domainTypeText;
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      width: 120,
      render: record => {
        const id = get(record, '_id', '');
        const path = ROUTE.MARKET_PRODUCT_CATEGORY_VISIBILITY_DETAIL.path.replace(':id', id);

        return (
          <span>
            <Link to={path}>
              <Button className="ml-2" type="default" size="small">
                {t('global:DETAIL')}
              </Button>
            </Link>
          </span>
        );
      },
    },
  ];
  return columns;
};
