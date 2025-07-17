import { t } from '@shared/i18n';
import { ROUTE } from '@app/routes';

export const SEGMENT_TYPE_NAMES = {
  100: t('warehouseSegmentPage:DELIVERY_FEE'),
  200: t('warehouseSegmentPage:PRODUCT_PRICING'),
};
export const DELIVERY_FEE = 'DELIVERY_FEE';
export const PRODUCT_PRICING = 'PRODUCT_PRICING';
export const SEGMENT_TYPES = [DELIVERY_FEE, PRODUCT_PRICING];
export const SEGMENT_PERM_KEYS = {
  NEW: {
    DELIVERY_FEE: 'PAGE_WAREHOUSE_SEGMENT_NEW_DELIVERY_FEE',
    PRODUCT_PRICING: 'PAGE_WAREHOUSE_SEGMENT_NEW_PRODUCT_PRICING',
  },
  UPLOAD: {
    DELIVERY_FEE: 'PAGE_WAREHOUSE_SEGMENT_MATCHING_DELIVERY_FEE',
    PRODUCT_PRICING: 'PAGE_WAREHOUSE_SEGMENT_MATCHING_PRODUCT_PRICING',
  },
};
export const IS_DEFAULT_OPTIONS = [
  {
    label: t('global:YES'),
    value: true,
  },
  {
    label: t('global:NO'),
    value: false,
  },
];
export const SEGMENT_TYPE_OPTIONS = t => {
  return [
    {
      label: t('warehouseSegmentPage:DELIVERY_FEE'),
      value: 100,
    },
    {
      label: t('warehouseSegmentPage:PRODUCT_PRICING'),
      value: 200,
    },
  ];
};
export const SEGMENT_PAGES = t => ([
  {
    title: t('warehouseSegmentPage:PAGES.NEW'),
    to: ROUTE.WAREHOUSE_SEGMENT_NEW.path,
  },
  {
    title: t('warehouseSegmentPage:PAGES.UPLOAD'),
    to: ROUTE.WAREHOUSE_SEGMENT_MATCHING_UPLOAD.path,
  },
]);
export const DEFAULT_ACTIVE_KEY = 1;
export const CSV_TYPES = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
