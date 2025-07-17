import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { marketProductStatuses, productSegments } from '@shared/shared/constantValues';
import { PRODUCT_SEGMENT } from '@shared/shared/constants';
import Excel from '@shared/utils/excel';

export const getMarketProductsExcelConfig = t => {
  return {
    fields: [
      {
        key: '_id',
        title: '_id',
        default: '',
      },
      {
        key: 'barcodes',
        title: t('marketProductPageV2:BARCODES'),
        default: '',
      },
      {
        key: 'fullName',
        title: t('global:NAME_1'),
        default: '',
      },
      {
        key: 'isEnabled',
        title: 'isEnabled',
        default: '',
      },
      {
        key: 'isBundle',
        title: 'isBundle',
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.TEST}`,
        title: get(productSegments, [PRODUCT_SEGMENT.TEST, getLangKey()]),
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.LAUNCH}`,
        title: get(productSegments, [PRODUCT_SEGMENT.LAUNCH, getLangKey()]),
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.REGULAR}`,
        title: get(productSegments, [PRODUCT_SEGMENT.REGULAR, getLangKey()]),
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.REGIONAL_SENSITIVE}`,
        title: get(productSegments, [PRODUCT_SEGMENT.REGIONAL_SENSITIVE, getLangKey()]),
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.ONLY_PROMO}`,
        title: get(productSegments, [PRODUCT_SEGMENT.ONLY_PROMO, getLangKey()]),
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.DELIST_ON_DELETION}`,
        title: get(productSegments, [PRODUCT_SEGMENT.DELIST_ON_DELETION, getLangKey()]),
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.DELIST}`,
        title: get(productSegments, [PRODUCT_SEGMENT.DELIST, getLangKey()]),
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.FIXED_ASSET}`,
        title: get(productSegments, [PRODUCT_SEGMENT.FIXED_ASSET, getLangKey()]),
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.CONSUMABLE}`,
        title: get(productSegments, [PRODUCT_SEGMENT.CONSUMABLE, getLangKey()]),
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.SEASONAL}`,
        title: get(productSegments, [PRODUCT_SEGMENT.SEASONAL, getLangKey()]),
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.SUPPLY_SHORTAGE}`,
        title: get(productSegments, [PRODUCT_SEGMENT.SUPPLY_SHORTAGE, getLangKey()]),
        default: '',
      },
      {
        key: `segment${PRODUCT_SEGMENT.STAND_BY}`,
        title: get(productSegments, [PRODUCT_SEGMENT.STAND_BY, getLangKey()]),
        default: '',
      },
      {
        key: 'status',
        title: t('marketProductPageV2:STATUS'),
        default: '',
      },
    ],
  };
};

export const exportMarketProductsToExcel = (marketProducts, t) => {
  const newMarketProducts = marketProducts.map(product => {
    const fullName = get(product, ['fullName', getLangKey()], '');
    const barcodes = get(product, 'barcodes', []);
    const status = get(marketProductStatuses, [product.status, getLangKey()]);
    const segments = {};
    Object.values(PRODUCT_SEGMENT).forEach(segmentValue => {
      segments[`segment${segmentValue}`] = product?.segments?.includes(segmentValue) || false;
    });
    const newProduct = {
      ...product,
      fullName,
      barcodes: ` ${barcodes?.join(', ')}`,
      status,
      ...segments,
    };
    return newProduct;
  });

  return new Excel({
    name: 'marketProducts',
    fields: getMarketProductsExcelConfig(t).fields,
    data: newMarketProducts,
  }).export();
};
