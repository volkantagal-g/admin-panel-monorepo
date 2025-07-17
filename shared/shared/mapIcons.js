import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  WAREHOUSE_BUSY_STATUS,
  WAREHOUSE_OUT_OF_COURIER_STATUS,
  WAREHOUSE_FREE_STATUS,
  COURIER_TYPE_FOR_COURIER_PLAN,
  COURIER_STATUS_FREE,
  COURIER_STATUS_BUSY,
  COURIER_STATUS_BROWSING,
  COURIER_STATUS_RESERVED,
  COURIER_STATUS_VERIFYING,
  COURIER_STATUS_REACHED_TO_RESTAURANT,
  COURIER_STATUS_PREPARING,
  COURIER_STATUS_GATHERING,
  COURIER_STATUS_ONWAY,
  COURIER_STATUS_REACHED,
  COURIER_STATUS_RETURNING,
  COURIER_STATUS_CANCELED,
  COURIER_STATUS_VERIFYING_REFILL,
  COURIER_STATUS_ONWAY_REFILL,
  COURIER_STATUS_REFILL,
  VEHICLE_TYPE,
} from '@shared/shared/constants';

import markerOrderRed from '@shared/assets/markers/marker_order_red.png';
import markerOrderFail from '@shared/assets/markers/marker_order_fail.png';
import voyagerOrderRed from '@shared/assets/markers/voyager/order_red.png';
import voyagerOrderRedTransparent from '@shared/assets/markers/voyager/order_red_transparent.png';
import voyagerOrderFail from '@shared/assets/markers/voyager/order_fail.png';
import voyagerOrderFailTransparent from '@shared/assets/markers/voyager/order_fail_transparent.png';
import marketOrderRed from '@shared/assets/markers/market_order_red.png';
import marketOrderRedTransparent from '@shared/assets/markers/market_order_red_transparent.png';
import marketOrderFail from '@shared/assets/markers/market_order_fail.png';
import marketOrderFailTransparent from '@shared/assets/markers/market_order_fail_transparent.png';

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

import markerMotoGreen from '@shared/assets/markers/marker_moto_green.png';
import markerMotoReserved from '@shared/assets/markers/marker_moto_reserved.png';
import markerMotoYellow from '@shared/assets/markers/marker_moto_yellow.png';
import markerMotoRed from '@shared/assets/markers/marker_moto_red.png';
import markerMotoPrimary from '@shared/assets/markers/marker_moto_primary.png';

import markerVanRed from '@shared/assets/markers/marker_van_red.png';
import markerVanPrimary from '@shared/assets/markers/marker_van_primary.png';
import markerVanReserved from '@shared/assets/markers/marker_van_reserved.png';
import markerVanYellow from '@shared/assets/markers/marker_van_yellow.png';
import markerVanGreen from '@shared/assets/markers/marker_van_green.png';

import markerOnFootGreen from '@shared/assets/markers/marker_onfoot_green.png';
import markerOnFootRed from '@shared/assets/markers/marker_onfoot_red.png';
import markerOnFootPrimary from '@shared/assets/markers/marker_onfoot_primary.png';
import markerOnFootReserved from '@shared/assets/markers/marker_onfoot_reserved.png';
import markerOnFootYellow from '@shared/assets/markers/marker_onfoot_yellow.png';

import markerBicycleGreen from '@shared/assets/markers/marker_bicycle_green.png';
import markerBicycleRed from '@shared/assets/markers/marker_bicycle_red.png';
import markerBicyclePrimary from '@shared/assets/markers/marker_bicycle_primary.png';
import markerBicycleYellow from '@shared/assets/markers/marker_bicycle_yellow.png';

import markerMituGreen from '@shared/assets/markers/marker_mitu_green.png';
import markerMituRed from '@shared/assets/markers/marker_mitu_red.png';
import markerMituPrimary from '@shared/assets/markers/marker_mitu_primary.png';
import markerMituYellow from '@shared/assets/markers/marker_mitu_yellow.png';

import markerOnlyFoodServingGreen from '@shared/assets/markers/marker_onlyFoodServing_green.png';
import markerOnlyFoodServingRed from '@shared/assets/markers/marker_onlyFoodServing_red.png';
import markerOnlyFoodServingPrimary from '@shared/assets/markers/marker_onlyFoodServing_primary.png';
import markerOnlyFoodServingYellow from '@shared/assets/markers/marker_onlyFoodServing_yellow.png';

import markerVanFranchiseGreen from '@shared/assets/markers/marker_van_franchise_green.png';
import markerVanFranchiseRed from '@shared/assets/markers/marker_van_franchise_red.png';
import markerVanFranchisePrimary from '@shared/assets/markers/marker_van_franchise_primary.png';
import markerVanFranchiseYellow from '@shared/assets/markers/marker_van_franchise_yellow.png';
import markerVanFranchiseReserved from '@shared/assets/markers/marker_van_franchise_reserved.png';

import markerMotoPartTimeGreen from '@shared/assets/markers/marker_moto_parttime_green.png';
import markerMotoPartTimeRed from '@shared/assets/markers/marker_moto_parttime_red.png';
import markerMotoPartTimePrimary from '@shared/assets/markers/marker_moto_parttime_primary.png';
import markerMotoPartTimeYellow from '@shared/assets/markers/marker_moto_parttime_yellow.png';
import markerMotoPartTimeReserved from '@shared/assets/markers/marker_moto_parttime_reserved.png';

import marketDabloGreen from '@shared/assets/markers/market_doblo_green.png';
import marketDabloRed from '@shared/assets/markers/market_doblo_red.png';
import marketDabloPrimary from '@shared/assets/markers/market_doblo_primary.png';
import marketDabloYellow from '@shared/assets/markers/market_doblo_yellow.png';

export const markerIcons = {
  markerStorePrimary,
  markerStoreRed,
  markerStoreYellow,
  marketG30Primary,
  marketG30Red,
  marketG30Yellow,
  voyagerWarehousePrimary,
  voyagerWarehouseRed,
  voyagerWarehouseYellow,
  marketWarehouseMergedPrimary,
  marketWarehouseMergedRed,
  marketWarehouseMergedYellow,
};

const warehouseMarkersByDomainTypeByStatus = {
  [GETIR_10_DOMAIN_TYPE]: {},
  [GETIR_MARKET_DOMAIN_TYPE]: {},
  [GETIR_VOYAGER_DOMAIN_TYPE]: {},
  MERGED: {},
};

// g10
warehouseMarkersByDomainTypeByStatus[GETIR_10_DOMAIN_TYPE][WAREHOUSE_FREE_STATUS] = markerStorePrimary;
warehouseMarkersByDomainTypeByStatus[GETIR_10_DOMAIN_TYPE][WAREHOUSE_BUSY_STATUS] = markerStoreRed;
warehouseMarkersByDomainTypeByStatus[GETIR_10_DOMAIN_TYPE][WAREHOUSE_OUT_OF_COURIER_STATUS] = markerStoreYellow;

// g30
warehouseMarkersByDomainTypeByStatus[GETIR_MARKET_DOMAIN_TYPE][WAREHOUSE_FREE_STATUS] = marketG30Primary;
warehouseMarkersByDomainTypeByStatus[GETIR_MARKET_DOMAIN_TYPE][WAREHOUSE_BUSY_STATUS] = marketG30Red;
warehouseMarkersByDomainTypeByStatus[GETIR_MARKET_DOMAIN_TYPE][WAREHOUSE_OUT_OF_COURIER_STATUS] = marketG30Yellow;

// VOYAGER
warehouseMarkersByDomainTypeByStatus[GETIR_VOYAGER_DOMAIN_TYPE][WAREHOUSE_FREE_STATUS] = voyagerWarehousePrimary;
warehouseMarkersByDomainTypeByStatus[GETIR_VOYAGER_DOMAIN_TYPE][WAREHOUSE_BUSY_STATUS] = voyagerWarehouseRed;
warehouseMarkersByDomainTypeByStatus[GETIR_VOYAGER_DOMAIN_TYPE][WAREHOUSE_OUT_OF_COURIER_STATUS] = voyagerWarehouseYellow;

// merged
warehouseMarkersByDomainTypeByStatus.MERGED[WAREHOUSE_FREE_STATUS] = marketWarehouseMergedPrimary;
warehouseMarkersByDomainTypeByStatus.MERGED[WAREHOUSE_BUSY_STATUS] = marketWarehouseMergedRed;
warehouseMarkersByDomainTypeByStatus.MERGED[WAREHOUSE_OUT_OF_COURIER_STATUS] = marketWarehouseMergedYellow;

// Couriers
const { COURIER_TYPE_GETIR_MARKET } = COURIER_TYPE_FOR_COURIER_PLAN;

const { E_BICYCLE, E_MOTORCYCLE, MITU, MOTO, ON_FOOT, VAN, E_CAR, MOTO_50CC } = VEHICLE_TYPE;

const getirMarketCouriersIcons = {};
getirMarketCouriersIcons[MOTO] = {
  [COURIER_STATUS_FREE]: markerMotoGreen,
  [COURIER_STATUS_BUSY]: markerMotoRed,
  [COURIER_STATUS_BROWSING]: markerMotoPrimary,
  [COURIER_STATUS_RESERVED]: markerMotoReserved,
  [COURIER_STATUS_VERIFYING]: markerMotoPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: markerMotoPrimary,
  [COURIER_STATUS_PREPARING]: markerMotoPrimary,
  [COURIER_STATUS_GATHERING]: markerMotoPrimary,
  [COURIER_STATUS_ONWAY]: markerMotoPrimary,
  [COURIER_STATUS_REACHED]: markerMotoPrimary,
  [COURIER_STATUS_RETURNING]: markerMotoYellow,
  [COURIER_STATUS_CANCELED]: markerMotoRed,
  [COURIER_STATUS_VERIFYING_REFILL]: markerMotoYellow,
  [COURIER_STATUS_ONWAY_REFILL]: markerMotoYellow,
  [COURIER_STATUS_REFILL]: markerMotoYellow,
};
getirMarketCouriersIcons[MOTO_50CC] = {
  [COURIER_STATUS_FREE]: markerMotoGreen,
  [COURIER_STATUS_BUSY]: markerMotoRed,
  [COURIER_STATUS_BROWSING]: markerMotoPrimary,
  [COURIER_STATUS_RESERVED]: markerMotoReserved,
  [COURIER_STATUS_VERIFYING]: markerMotoPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: markerMotoPrimary,
  [COURIER_STATUS_PREPARING]: markerMotoPrimary,
  [COURIER_STATUS_GATHERING]: markerMotoPrimary,
  [COURIER_STATUS_ONWAY]: markerMotoPrimary,
  [COURIER_STATUS_REACHED]: markerMotoPrimary,
  [COURIER_STATUS_RETURNING]: markerMotoYellow,
  [COURIER_STATUS_CANCELED]: markerMotoRed,
  [COURIER_STATUS_VERIFYING_REFILL]: markerMotoYellow,
  [COURIER_STATUS_ONWAY_REFILL]: markerMotoYellow,
  [COURIER_STATUS_REFILL]: markerMotoYellow,
};
getirMarketCouriersIcons[VAN] = {
  [COURIER_STATUS_FREE]: markerVanGreen,
  [COURIER_STATUS_BUSY]: markerVanRed,
  [COURIER_STATUS_BROWSING]: markerVanPrimary,
  [COURIER_STATUS_RESERVED]: markerVanReserved,
  [COURIER_STATUS_VERIFYING]: markerVanPrimary,
  [COURIER_STATUS_PREPARING]: markerVanPrimary,
  [COURIER_STATUS_GATHERING]: markerVanPrimary,
  [COURIER_STATUS_ONWAY]: markerVanPrimary,
  [COURIER_STATUS_REACHED]: markerVanPrimary,
  [COURIER_STATUS_RETURNING]: markerVanYellow,
  [COURIER_STATUS_CANCELED]: markerVanRed,
  [COURIER_STATUS_VERIFYING_REFILL]: markerVanYellow,
  [COURIER_STATUS_ONWAY_REFILL]: markerVanYellow,
  [COURIER_STATUS_REFILL]: markerVanYellow,
};
getirMarketCouriersIcons[ON_FOOT] = {
  [COURIER_STATUS_FREE]: markerOnFootGreen,
  [COURIER_STATUS_BUSY]: markerOnFootRed,
  [COURIER_STATUS_BROWSING]: markerOnFootPrimary,
  [COURIER_STATUS_RESERVED]: markerOnFootReserved,
  [COURIER_STATUS_VERIFYING]: markerOnFootPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: markerOnFootPrimary,
  [COURIER_STATUS_PREPARING]: markerOnFootPrimary,
  [COURIER_STATUS_GATHERING]: markerOnFootPrimary,
  [COURIER_STATUS_ONWAY]: markerOnFootPrimary,
  [COURIER_STATUS_REACHED]: markerOnFootPrimary,
  [COURIER_STATUS_RETURNING]: markerOnFootYellow,
  [COURIER_STATUS_CANCELED]: markerOnFootRed,
  [COURIER_STATUS_VERIFYING_REFILL]: markerOnFootYellow,
  [COURIER_STATUS_ONWAY_REFILL]: markerOnFootYellow,
  [COURIER_STATUS_REFILL]: markerOnFootYellow,
};

getirMarketCouriersIcons[MITU] = {
  [COURIER_STATUS_FREE]: markerMituGreen,
  [COURIER_STATUS_BUSY]: markerMituRed,
  [COURIER_STATUS_BROWSING]: markerMituPrimary,
  [COURIER_STATUS_RESERVED]: markerMituPrimary,
  [COURIER_STATUS_VERIFYING]: markerMituPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: markerMituPrimary,
  [COURIER_STATUS_PREPARING]: markerMituPrimary,
  [COURIER_STATUS_GATHERING]: markerMituPrimary,
  [COURIER_STATUS_ONWAY]: markerMituPrimary,
  [COURIER_STATUS_REACHED]: markerMituPrimary,
  [COURIER_STATUS_RETURNING]: markerMituYellow,
  [COURIER_STATUS_CANCELED]: markerMituRed,
  [COURIER_STATUS_VERIFYING_REFILL]: markerMituYellow,
  [COURIER_STATUS_ONWAY_REFILL]: markerMituYellow,
  [COURIER_STATUS_REFILL]: markerMituYellow,
};

getirMarketCouriersIcons[E_MOTORCYCLE] = {
  [COURIER_STATUS_FREE]: markerMotoGreen,
  [COURIER_STATUS_BUSY]: markerMotoRed,
  [COURIER_STATUS_BROWSING]: markerMotoPrimary,
  [COURIER_STATUS_RESERVED]: markerMotoReserved,
  [COURIER_STATUS_VERIFYING]: markerMotoPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: markerMotoPrimary,
  [COURIER_STATUS_PREPARING]: markerMotoPrimary,
  [COURIER_STATUS_GATHERING]: markerMotoPrimary,
  [COURIER_STATUS_ONWAY]: markerMotoPrimary,
  [COURIER_STATUS_REACHED]: markerMotoPrimary,
  [COURIER_STATUS_RETURNING]: markerMotoYellow,
  [COURIER_STATUS_CANCELED]: markerMotoRed,
  [COURIER_STATUS_VERIFYING_REFILL]: markerMotoYellow,
  [COURIER_STATUS_ONWAY_REFILL]: markerMotoYellow,
  [COURIER_STATUS_REFILL]: markerMotoYellow,
};

getirMarketCouriersIcons[E_BICYCLE] = {
  [COURIER_STATUS_FREE]: markerBicycleGreen,
  [COURIER_STATUS_BUSY]: markerBicycleRed,
  [COURIER_STATUS_BROWSING]: markerBicyclePrimary,
  [COURIER_STATUS_VERIFYING]: markerBicyclePrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: markerBicyclePrimary,
  [COURIER_STATUS_PREPARING]: markerBicyclePrimary,
  [COURIER_STATUS_GATHERING]: markerBicyclePrimary,
  [COURIER_STATUS_ONWAY]: markerBicyclePrimary,
  [COURIER_STATUS_REACHED]: markerBicyclePrimary,
  [COURIER_STATUS_RETURNING]: markerBicycleYellow,
  [COURIER_STATUS_CANCELED]: markerBicycleRed,
  [COURIER_STATUS_VERIFYING_REFILL]: markerBicycleYellow,
  [COURIER_STATUS_ONWAY_REFILL]: markerBicycleYellow,
  [COURIER_STATUS_REFILL]: markerBicycleYellow,
};

getirMarketCouriersIcons[E_CAR] = {
  [COURIER_STATUS_FREE]: markerBicycleGreen,
  [COURIER_STATUS_BUSY]: markerBicycleRed,
  [COURIER_STATUS_BROWSING]: markerBicyclePrimary,
  [COURIER_STATUS_VERIFYING]: markerBicyclePrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: markerBicyclePrimary,
  [COURIER_STATUS_PREPARING]: markerBicyclePrimary,
  [COURIER_STATUS_GATHERING]: markerBicyclePrimary,
  [COURIER_STATUS_ONWAY]: markerBicyclePrimary,
  [COURIER_STATUS_REACHED]: markerBicyclePrimary,
  [COURIER_STATUS_RETURNING]: markerBicycleYellow,
  [COURIER_STATUS_CANCELED]: markerBicycleRed,
  [COURIER_STATUS_VERIFYING_REFILL]: markerBicycleYellow,
  [COURIER_STATUS_ONWAY_REFILL]: markerBicycleYellow,
  [COURIER_STATUS_REFILL]: markerBicycleYellow,
};

const noVehicleIcons = {
  [COURIER_STATUS_FREE]: marketDabloGreen,
  [COURIER_STATUS_BUSY]: marketDabloRed,
  [COURIER_STATUS_BROWSING]: marketDabloPrimary,
  [COURIER_STATUS_VERIFYING]: marketDabloPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: marketDabloPrimary,
  [COURIER_STATUS_PREPARING]: marketDabloPrimary,
  [COURIER_STATUS_GATHERING]: marketDabloPrimary,
  [COURIER_STATUS_ONWAY]: marketDabloPrimary,
  [COURIER_STATUS_REACHED]: marketDabloPrimary,
  [COURIER_STATUS_RETURNING]: marketDabloYellow,
  [COURIER_STATUS_CANCELED]: marketDabloRed,
  [COURIER_STATUS_VERIFYING_REFILL]: marketDabloYellow,
  [COURIER_STATUS_ONWAY_REFILL]: marketDabloYellow,
  [COURIER_STATUS_REFILL]: marketDabloYellow,
};

export const foodCourierIcons = {
  [COURIER_STATUS_FREE]: markerOnlyFoodServingGreen,
  [COURIER_STATUS_BUSY]: markerOnlyFoodServingRed,
  [COURIER_STATUS_BROWSING]: markerOnlyFoodServingPrimary,
  [COURIER_STATUS_RESERVED]: markerOnlyFoodServingPrimary,
  [COURIER_STATUS_VERIFYING]: markerOnlyFoodServingPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: markerOnlyFoodServingPrimary,
  [COURIER_STATUS_PREPARING]: markerOnlyFoodServingPrimary,
  [COURIER_STATUS_GATHERING]: markerOnlyFoodServingPrimary,
  [COURIER_STATUS_ONWAY]: markerOnlyFoodServingPrimary,
  [COURIER_STATUS_REACHED]: markerOnlyFoodServingPrimary,
  [COURIER_STATUS_RETURNING]: markerOnlyFoodServingYellow,
  [COURIER_STATUS_CANCELED]: markerOnlyFoodServingRed,
};

export const franchiseVanIcons = {
  [COURIER_STATUS_FREE]: markerVanFranchiseGreen,
  [COURIER_STATUS_BUSY]: markerVanFranchiseRed,
  [COURIER_STATUS_BROWSING]: markerVanFranchisePrimary,
  [COURIER_STATUS_RESERVED]: markerVanFranchiseReserved,
  [COURIER_STATUS_VERIFYING]: markerVanFranchisePrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: markerVanFranchisePrimary,
  [COURIER_STATUS_PREPARING]: markerVanFranchisePrimary,
  [COURIER_STATUS_GATHERING]: markerVanFranchisePrimary,
  [COURIER_STATUS_ONWAY]: markerVanFranchisePrimary,
  [COURIER_STATUS_REACHED]: markerVanFranchisePrimary,
  [COURIER_STATUS_RETURNING]: markerVanFranchiseYellow,
  [COURIER_STATUS_CANCELED]: markerVanFranchiseRed,
};

export const partTimeMotoIcons = {
  [COURIER_STATUS_FREE]: markerMotoPartTimeGreen,
  [COURIER_STATUS_BUSY]: markerMotoPartTimeRed,
  [COURIER_STATUS_BROWSING]: markerMotoPartTimePrimary,
  [COURIER_STATUS_RESERVED]: markerMotoPartTimeReserved,
  [COURIER_STATUS_VERIFYING]: markerMotoPartTimePrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: markerMotoPartTimePrimary,
  [COURIER_STATUS_PREPARING]: markerMotoPartTimePrimary,
  [COURIER_STATUS_GATHERING]: markerMotoPartTimePrimary,
  [COURIER_STATUS_ONWAY]: markerMotoPartTimePrimary,
  [COURIER_STATUS_REACHED]: markerMotoPartTimePrimary,
  [COURIER_STATUS_RETURNING]: markerMotoPartTimeYellow,
  [COURIER_STATUS_CANCELED]: markerMotoPartTimeRed,
};

const courierIcons = { [COURIER_TYPE_GETIR_MARKET]: getirMarketCouriersIcons, noVehicleIcons };

export const failMarketOrderIcons = {
  [GETIR_VOYAGER_DOMAIN_TYPE]: {
    RED: voyagerOrderRed,
    RED_TRANSPARENT: voyagerOrderRedTransparent,
    FAIL: voyagerOrderFail,
    FAIL_TRANSPARENT: voyagerOrderFailTransparent,
  },
  [GETIR_MARKET_DOMAIN_TYPE]: {
    RED: marketOrderRed,
    RED_TRANSPARENT: marketOrderRedTransparent,
    FAIL: marketOrderFail,
    FAIL_TRANSPARENT: marketOrderFailTransparent,
  },
  [GETIR_10_DOMAIN_TYPE]: {
    RED: markerOrderRed,
    FAIL: markerOrderFail,
  },
};

export { warehouseMarkersByDomainTypeByStatus, courierIcons };
