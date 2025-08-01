import { get } from 'lodash';

import {
  GETIR_DOMAIN_TYPES,
  MARKET_ORDER_STATUS,
  WAREHOUSE_BUSY_STATUS,
  WAREHOUSE_FREE_STATUS,
  WAREHOUSE_OUT_OF_COURIER_STATUS,
} from '@shared/shared/constants';

import OrderMakerGreen from '@shared/assets/markers/marker_order_green.png';
import OrderMakerYellow from '@shared/assets/markers/marker_order_yellow.png';
import OrderMakerRed from '@shared/assets/markers/marker_order_red.png';
import OrderMakerPrimary from '@shared/assets/markers/marker_order_primary.png';
import OrderMakerPrimaryTransparent from '@shared/assets/markers/marker_order_primary_transparent.png';
import MarketOrderMakerPrimary from '@shared/assets/markers/market_order_yellow.png';
import MarketOrderMakerRed from '@shared/assets/markers/market_order_red.png';
import MarketOrderMakerGreen from '@shared/assets/markers/market_order_green.png';
import storeMarkerPrimary from '@shared/assets/markers/marker_store_primary.png';
import storeMarkerYellow from '@shared/assets/markers/marker_store_yellow.png';
import storeMarkerRed from '@shared/assets/markers/marker_store_red.png';
import g30StoreMarkerPrimary from '@shared/assets/markers/market_warehouse_g30_primary.png';
import g30StoreMarkerYellow from '@shared/assets/markers/market_warehouse_g30_yellow.png';
import g30StoreMarkerRed from '@shared/assets/markers/market_warehouse_g30_red.png';
import voyagerStoreMarkerPrimary from '@shared/assets/markers/voyager/warehouse_primary.png';
import voyagerStoreMarkerYellow from '@shared/assets/markers/voyager/warehouse_yellow.png';
import voyagerStoreMarkerRed from '@shared/assets/markers/voyager/warehouse_red.png';
import mergedStoreMarkerPrimary from '@shared/assets/markers/market_warehouse_merged_primary.png';
import mergedStoreMarkerYellow from '@shared/assets/markers/market_warehouse_merged_yellow.png';
import mergedStoreMarkerRed from '@shared/assets/markers/market_warehouse_merged_red.png';

export const g10OrderMarkersByStatus = {
  [MARKET_ORDER_STATUS.INCOMPLETE]: OrderMakerYellow,
  [MARKET_ORDER_STATUS.ABORTED]: OrderMakerRed,
  [MARKET_ORDER_STATUS.BROWSING]: OrderMakerYellow,
  [MARKET_ORDER_STATUS.WAITING_FOR_PICKER]: OrderMakerPrimary,
  [MARKET_ORDER_STATUS.VERIFYING]: OrderMakerPrimary,
  [MARKET_ORDER_STATUS.PREPARING]: OrderMakerPrimary,
  [MARKET_ORDER_STATUS.PREPARED]: OrderMakerPrimary,
  [MARKET_ORDER_STATUS.HANDOVER]: OrderMakerPrimary,
  [MARKET_ORDER_STATUS.ONWAY]: OrderMakerPrimary,
  [MARKET_ORDER_STATUS.REACHED]: OrderMakerPrimary,
  [MARKET_ORDER_STATUS.DELIVERED]: OrderMakerPrimaryTransparent,
  [MARKET_ORDER_STATUS.RATED]: OrderMakerGreen,
  [MARKET_ORDER_STATUS.CANCELED_COURIER]: OrderMakerRed,
  [MARKET_ORDER_STATUS.CANCELED_CLIENT]: OrderMakerRed,
  [MARKET_ORDER_STATUS.CANCELED_STAFF]: OrderMakerRed,
  [MARKET_ORDER_STATUS.CANCELED_SYSTEM]: OrderMakerRed,
  [MARKET_ORDER_STATUS.CANCELED_ADMIN]: OrderMakerRed,
};

export const g30OrderMarkersByStatus = {
  [MARKET_ORDER_STATUS.INCOMPLETE]: MarketOrderMakerPrimary,
  [MARKET_ORDER_STATUS.ABORTED]: MarketOrderMakerRed,
  [MARKET_ORDER_STATUS.BROWSING]: MarketOrderMakerPrimary,
  [MARKET_ORDER_STATUS.WAITING_FOR_PICKER]: MarketOrderMakerPrimary,
  [MARKET_ORDER_STATUS.VERIFYING]: MarketOrderMakerPrimary,
  [MARKET_ORDER_STATUS.PREPARING]: MarketOrderMakerPrimary,
  [MARKET_ORDER_STATUS.PREPARED]: MarketOrderMakerPrimary,
  [MARKET_ORDER_STATUS.HANDOVER]: MarketOrderMakerPrimary,
  [MARKET_ORDER_STATUS.ONWAY]: MarketOrderMakerPrimary,
  [MARKET_ORDER_STATUS.REACHED]: MarketOrderMakerPrimary,
  [MARKET_ORDER_STATUS.DELIVERED]: MarketOrderMakerGreen,
  [MARKET_ORDER_STATUS.RATED]: MarketOrderMakerGreen,
  [MARKET_ORDER_STATUS.CANCELED_COURIER]: MarketOrderMakerRed,
  [MARKET_ORDER_STATUS.CANCELED_CLIENT]: MarketOrderMakerRed,
  [MARKET_ORDER_STATUS.CANCELED_STAFF]: MarketOrderMakerRed,
  [MARKET_ORDER_STATUS.CANCELED_SYSTEM]: MarketOrderMakerRed,
  [MARKET_ORDER_STATUS.CANCELED_ADMIN]: MarketOrderMakerRed,
};

export const warehouseMarkersByDomainTypeByStatus = {
  [GETIR_DOMAIN_TYPES.GETIR10]: {
    [WAREHOUSE_FREE_STATUS]: storeMarkerPrimary,
    [WAREHOUSE_BUSY_STATUS]: storeMarkerRed,
    [WAREHOUSE_OUT_OF_COURIER_STATUS]: storeMarkerYellow,
  },
  [GETIR_DOMAIN_TYPES.MARKET]: {
    [WAREHOUSE_FREE_STATUS]: g30StoreMarkerPrimary,
    [WAREHOUSE_BUSY_STATUS]: g30StoreMarkerRed,
    [WAREHOUSE_OUT_OF_COURIER_STATUS]: g30StoreMarkerYellow,
  },
  [GETIR_DOMAIN_TYPES.VOYAGER]: {
    [WAREHOUSE_FREE_STATUS]: voyagerStoreMarkerPrimary,
    [WAREHOUSE_BUSY_STATUS]: voyagerStoreMarkerRed,
    [WAREHOUSE_OUT_OF_COURIER_STATUS]: voyagerStoreMarkerYellow,
  },
  MERGED: {
    [WAREHOUSE_FREE_STATUS]: mergedStoreMarkerPrimary,
    [WAREHOUSE_BUSY_STATUS]: mergedStoreMarkerRed,
    [WAREHOUSE_OUT_OF_COURIER_STATUS]: mergedStoreMarkerYellow,
  },
};

export const markerZIndexes = {
  warehouse: 10000000,
  orderMarker: 20000000,
  queueOrderMarker: 60000000,
  failOrderMarker: 70000000,
  courier: 30000000,
};

export const getWarehouseMarker = warehouse => {
  const warehouseDomainTypes = get(warehouse, 'domainTypes', []);
  const isServingG10 = warehouseDomainTypes.includes(GETIR_DOMAIN_TYPES.GETIR10);
  const isServingG30 = warehouseDomainTypes.includes(GETIR_DOMAIN_TYPES.MARKET);
  let warehouseDomainTypeForIcon = warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.GETIR10];
  if (isServingG10 && isServingG30) {
    warehouseDomainTypeForIcon = warehouseMarkersByDomainTypeByStatus.MERGED;
  }
  else if (isServingG30) {
    warehouseDomainTypeForIcon = warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.MARKET];
  }
  return warehouseDomainTypeForIcon[warehouse?.status];
};
