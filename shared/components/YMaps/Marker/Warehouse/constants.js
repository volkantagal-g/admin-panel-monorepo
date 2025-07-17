import markerStorePrimary from '@shared/assets/markers/marker_store_primary.png';
import markerStoreRed from '@shared/assets/markers/marker_store_red.png';
import markerStoreYellow from '@shared/assets/markers/marker_store_yellow.png';
import marketG30Primary from '@shared/assets/markers/market_warehouse_g30_primary.png';
import marketG30Red from '@shared/assets/markers/market_warehouse_g30_red.png';
import marketG30Yellow from '@shared/assets/markers/market_warehouse_g30_yellow.png';
import voyagerWarehousePrimary from '@shared/assets/markers/voyager/warehouse_primary.png';
import voyagerWarehouseRed from '@shared/assets/markers/voyager/warehouse_red.png';
import voyagerWarehouseYellow from '@shared/assets/markers/voyager/warehouse_yellow.png';
import marketWarehouseMergedPrimary from '@shared/assets/markers/market_warehouse_merged_primary.png';
import marketWarehouseMergedRed from '@shared/assets/markers/market_warehouse_merged_red.png';
import marketWarehouseMergedYellow from '@shared/assets/markers/market_warehouse_merged_yellow.png';

import {
  GETIR_DOMAIN_TYPES,
  WAREHOUSE_BUSY_STATUS,
  WAREHOUSE_OUT_OF_COURIER_STATUS,
  WAREHOUSE_FREE_STATUS,
} from '@shared/shared/constants';

export const warehouseMarkersByDomainTypeByStatus = {
  [GETIR_DOMAIN_TYPES.GETIR10]: {},
  [GETIR_DOMAIN_TYPES.MARKET]: {},
  [GETIR_DOMAIN_TYPES.VOYAGER]: {},
  MERGED: {},
};
// g10
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.GETIR10][WAREHOUSE_FREE_STATUS] = markerStorePrimary;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.GETIR10][WAREHOUSE_BUSY_STATUS] = markerStoreRed;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.GETIR10][WAREHOUSE_OUT_OF_COURIER_STATUS] = markerStoreYellow;
// g30
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.MARKET][WAREHOUSE_FREE_STATUS] = marketG30Primary;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.MARKET][WAREHOUSE_BUSY_STATUS] = marketG30Red;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.MARKET][WAREHOUSE_OUT_OF_COURIER_STATUS] = marketG30Yellow;
// VOYAGER
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.VOYAGER][WAREHOUSE_FREE_STATUS] = voyagerWarehousePrimary;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.VOYAGER][WAREHOUSE_BUSY_STATUS] = voyagerWarehouseRed;
warehouseMarkersByDomainTypeByStatus[GETIR_DOMAIN_TYPES.VOYAGER][WAREHOUSE_OUT_OF_COURIER_STATUS] = voyagerWarehouseYellow;
// merged
warehouseMarkersByDomainTypeByStatus.MERGED[WAREHOUSE_FREE_STATUS] = marketWarehouseMergedPrimary;
warehouseMarkersByDomainTypeByStatus.MERGED[WAREHOUSE_BUSY_STATUS] = marketWarehouseMergedRed;
warehouseMarkersByDomainTypeByStatus.MERGED[WAREHOUSE_OUT_OF_COURIER_STATUS] = marketWarehouseMergedYellow;
