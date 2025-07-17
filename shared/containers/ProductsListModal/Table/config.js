import { Link } from 'react-router-dom';
import { get as _get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { OrderProductSubType, OrderProductType, OrderProductWeightUnit } from '@app/pages/MarketOrderAnalytics/constants';

const countColumnSorter = (a, b) => {
  const productA = a.product;
  const productB = b.product;

  const isProductAWeightProduct = productA?.type === OrderProductType.WEIGHT;
  const isProductAFreshFruitOrVegetable = productA?.subType === OrderProductSubType.FRESH_FRUIT_AND_VEGETABLES;
  const isProductAWeightUnitKg = productA?.weightInfo?.unit === OrderProductWeightUnit.G;

  const isProductBWeightProduct = productB?.type === OrderProductType.WEIGHT;
  const isProductBFreshFruitOrVegetable = productB?.subType === OrderProductSubType.FRESH_FRUIT_AND_VEGETABLES;
  const isProductBWeightUnitKg = productB?.weightInfo?.unit === OrderProductWeightUnit.G;

  let productAComparableCount = a.count;
  let productBComparableCount = b.count;

  if (isProductAWeightProduct && isProductAFreshFruitOrVegetable && isProductAWeightUnitKg) {
    productAComparableCount /= 1000;
  }

  if (isProductBWeightProduct && isProductBFreshFruitOrVegetable && isProductBWeightUnitKg) {
    productBComparableCount /= 1000;
  }

  return productAComparableCount - productBComparableCount;
};

export const tableColumns = (hasPermissionToProductDetail, isMobile, t) => {
  return [
    {
      title: t('global:PRODUCT'),
      dataIndex: 'product',
      key: 'name',
      sorter: (a, b) => {
        const nameA = _get(a, ['product', 'fullName', getLangKey()], '')?.trim();
        const nameB = _get(b, ['product', 'fullName', getLangKey()], '')?.trim();
        return nameA.localeCompare(nameB);
      },
      render: product => {
        if (hasPermissionToProductDetail) {
          return (<Link to={`/marketProduct/detail/${product?._id}`}>{product?.fullName?.[getLangKey()]}</Link>);
        }
        return (<p>{product?.fullName?.[getLangKey()]}</p>);
      },
      width: isMobile ? '50%' : '70%',
    },
    {
      title: t('activeOrdersForExecutiveDashboardPage:BASKET_COUNT'),
      dataIndex: 'basketCount',
      key: 'basketCount',
      sorter: (a, b) => a.basketCount - b.basketCount,
      align: 'right',
      width: isMobile ? '30%' : '15%',
    },
    {
      title: t('global:TOTAL'),
      dataIndex: 'count',
      key: 'count',
      sorter: countColumnSorter,
      defaultSortOrder: 'descend',
      width: isMobile ? '20%' : '15%',
      align: 'right',
      render: (value, record) => {
        const { product } = record;

        const isWeightProduct = product?.type === OrderProductType.WEIGHT;
        const isFreshFruitOrVegetable = product?.subType === OrderProductSubType.FRESH_FRUIT_AND_VEGETABLES;
        const isWeightUnitKg = product?.weightInfo?.unit === OrderProductWeightUnit.G;

        if (isWeightProduct && isFreshFruitOrVegetable && isWeightUnitKg) {
          return value / 1000;
        }

        return value;
      },
    },
  ];
};
