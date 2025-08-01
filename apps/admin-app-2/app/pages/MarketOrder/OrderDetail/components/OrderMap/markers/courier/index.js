import { isEmpty } from 'lodash';

import {
  COURIER_STATUS_BROWSING,
  COURIER_STATUS_BUSY,
  COURIER_STATUS_CANCELED,
  COURIER_STATUS_FREE,
  COURIER_STATUS_GATHERING,
  COURIER_STATUS_ONWAY,
  COURIER_STATUS_PREPARING,
  COURIER_STATUS_REACHED,
  COURIER_STATUS_REACHED_TO_RESTAURANT,
  COURIER_STATUS_RESERVED,
  COURIER_STATUS_RETURNING,
  COURIER_STATUS_VERIFYING,
  COURIER_TYPE_FOR_COURIER_PLAN,
  VEHICLE_TYPE,
} from '@shared/shared/constants';

import markerMotoGreen from '@shared/assets/markers/marker_moto_green.png';
import markerMotoRed from '@shared/assets/markers/marker_moto_red.png';
import markerMotoPrimary from '@shared/assets/markers/marker_moto_primary.png';
import markerMotoReserved from '@shared/assets/markers/marker_moto_reserved.png';
import markerMotoYellow from '@shared/assets/markers/marker_moto_yellow.png';
import markerVanGreen from '@shared/assets/markers/marker_van_green.png';
import markerVanRed from '@shared/assets/markers/marker_van_red.png';
import markerVanPrimary from '@shared/assets/markers/marker_van_primary.png';
import markerVanReserved from '@shared/assets/markers/marker_van_reserved.png';
import markerVanYellow from '@shared/assets/markers/marker_van_yellow.png';
import markerOnFootGreen from '@shared/assets/markers/marker_onfoot_green.png';
import markerOnFootRed from '@shared/assets/markers/marker_onfoot_red.png';
import markerOnFootReserved from '@shared/assets/markers/marker_onfoot_reserved.png';
import markerOnFootPrimary from '@shared/assets/markers/marker_onfoot_primary.png';
import markerOnFootYellow from '@shared/assets/markers/marker_onfoot_yellow.png';
import markerBicycleGreen from '@shared/assets/markers/marker_bicycle_green.png';
import markerBicycleRed from '@shared/assets/markers/marker_bicycle_red.png';
import markerBicyclePrimary from '@shared/assets/markers/marker_bicycle_primary.png';
import markerBicycleYellow from '@shared/assets/markers/marker_bicycle_yellow.png';
import markerVanWaterGreen from '@shared/assets/markers/marker_van_water_green.png';
import markerVanWaterRed from '@shared/assets/markers/marker_van_water_red.png';
import markerVanWaterReserved from '@shared/assets/markers/marker_van_water_reserved.png';
import markerVanWaterPrimary from '@shared/assets/markers/marker_van_water_primary.png';
import markerVanWaterYellow from '@shared/assets/markers/marker_van_water_yellow.png';
import markerVoyageGreen from '@shared/assets/markers/marker_voyager_green.png';
import markerVoyageRed from '@shared/assets/markers/marker_voyager_red.png';
import markerVoyagePrimary from '@shared/assets/markers/marker_voyager_primary.png';
import markerVoyageYellow from '@shared/assets/markers/marker_voyager_yellow.png';
import courierMituGreen from '@shared/assets/markers/marker_mitu_green.png';
import courierMituRed from '@shared/assets/markers/marker_mitu_red.png';
import courierMituPrimary from '@shared/assets/markers/marker_mitu_primary.png';
import courierMituYellow from '@shared/assets/markers/marker_mitu_yellow.png';
import marketDobloGreen from '@shared/assets/markers/market_doblo_green.png';
import marketDobloRed from '@shared/assets/markers/market_doblo_red.png';
import marketDobloPrimary from '@shared/assets/markers/market_doblo_primary.png';
import marketDobloYellow from '@shared/assets/markers/market_doblo_yellow.png';
import markerFoodServingGreen from '@shared/assets/markers/marker_onlyFoodServing_green.png';
import markerFoodServingRed from '@shared/assets/markers/marker_onlyFoodServing_red.png';
import markerFoodServingPrimary from '@shared/assets/markers/marker_onlyFoodServing_primary.png';
import markerFoodServingYellow from '@shared/assets/markers/marker_onlyFoodServing_yellow.png';
import markerOnFootPrimaryTransparent from '@shared/assets/markers/marker_onfoot_primary_transparent.png';
import markerMotoPrimaryTransparent from '@shared/assets/markers/marker_moto_primary_transparent.png';
import markerVanPrimaryTransparent from '@shared/assets/markers/marker_van_primary_transparent.png';
import markerMituPrimaryTransparent from '@shared/assets/markers/marker_mitu_primary_transparent.png';
import markerVoyagerPrimaryTransparent from '@shared/assets/markers/marker_voyager_primary_transparent.png';
import marketOrderPrimaryTransparent from '@shared/assets/markers/market_order_primary_transparent.png';

export const foodCourierIcons = {};
foodCourierIcons[COURIER_STATUS_FREE] = markerFoodServingGreen;
foodCourierIcons[COURIER_STATUS_BUSY] = markerFoodServingRed;
foodCourierIcons[COURIER_STATUS_BROWSING] = markerFoodServingPrimary;
foodCourierIcons[COURIER_STATUS_RESERVED] = markerFoodServingPrimary;
foodCourierIcons[COURIER_STATUS_VERIFYING] = markerFoodServingPrimary;
foodCourierIcons[COURIER_STATUS_REACHED_TO_RESTAURANT] = markerFoodServingPrimary;
foodCourierIcons[COURIER_STATUS_PREPARING] = markerFoodServingPrimary;
foodCourierIcons[COURIER_STATUS_GATHERING] = markerFoodServingPrimary;
foodCourierIcons[COURIER_STATUS_ONWAY] = markerFoodServingPrimary;
foodCourierIcons[COURIER_STATUS_REACHED] = markerFoodServingPrimary;
foodCourierIcons[COURIER_STATUS_RETURNING] = markerFoodServingYellow;
foodCourierIcons[COURIER_STATUS_CANCELED] = markerFoodServingRed;

export const courierMarkersByStatus = {};
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO] = {};
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_FREE
] = markerMotoGreen;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_BUSY
] = markerMotoRed;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_BROWSING
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_RESERVED
] = markerMotoReserved;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_VERIFYING
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_PREPARING
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_GATHERING
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_REACHED_TO_RESTAURANT
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_ONWAY
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_REACHED
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_RETURNING
] = markerMotoYellow;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO][
  COURIER_STATUS_CANCELED
] = markerMotoRed;

courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN] = {};
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_FREE
] = markerVanGreen;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_BUSY
] = markerVanRed;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_BROWSING
] = markerVanPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_RESERVED
] = markerVanReserved;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_VERIFYING
] = markerVanPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_PREPARING
] = markerVanPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_GATHERING
] = markerVanPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_REACHED_TO_RESTAURANT
] = markerVanPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_ONWAY
] = markerVanPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_REACHED
] = markerVanPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_RETURNING
] = markerVanYellow;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN][
  COURIER_STATUS_CANCELED
] = markerVanRed;

courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT] = {};
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_FREE
] = markerOnFootGreen;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_BUSY
] = markerOnFootRed;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_BROWSING
] = markerOnFootPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_RESERVED
] = markerOnFootReserved;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_VERIFYING
] = markerOnFootPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_PREPARING
] = markerOnFootPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_GATHERING
] = markerOnFootPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_REACHED_TO_RESTAURANT
] = markerOnFootPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_ONWAY
] = markerOnFootPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_REACHED
] = markerOnFootPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_RETURNING
] = markerOnFootYellow;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT][
  COURIER_STATUS_CANCELED
] = markerOnFootRed;

courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE] = {};
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE][
  COURIER_STATUS_FREE
] = markerBicycleGreen;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE][
  COURIER_STATUS_BUSY
] = markerBicycleRed;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE][
  COURIER_STATUS_BROWSING
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE][
  COURIER_STATUS_VERIFYING
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE][
  COURIER_STATUS_PREPARING
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE][
  COURIER_STATUS_GATHERING
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE][
  COURIER_STATUS_REACHED_TO_RESTAURANT
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE][
  COURIER_STATUS_ONWAY
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE][
  COURIER_STATUS_REACHED
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE][
  COURIER_STATUS_RETURNING
] = markerBicycleYellow;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE][
  COURIER_STATUS_CANCELED
] = markerBicycleRed;

courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR] = {};
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_FREE
] = markerVanWaterGreen;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_BUSY
] = markerVanWaterRed;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_BROWSING
] = markerVanWaterPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_RESERVED
] = markerVanWaterReserved;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_VERIFYING
] = markerVanWaterPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_PREPARING
] = markerVanWaterPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_GATHERING
] = markerVanWaterPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_REACHED_TO_RESTAURANT
] = markerVanWaterPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_ONWAY
] = markerVanWaterPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_REACHED
] = markerVanWaterPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_RETURNING
] = markerVanWaterYellow;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR][
  COURIER_STATUS_CANCELED
] = markerVanWaterRed;

courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER] = {};
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_FREE
] = markerVoyageGreen;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_BUSY
] = markerVoyageRed;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_BROWSING
] = markerVoyagePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_RESERVED
] = markerVoyageGreen;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_VERIFYING
] = markerVoyagePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_PREPARING
] = markerVoyagePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_GATHERING
] = markerVoyagePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_REACHED_TO_RESTAURANT
] = markerVoyagePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_ONWAY
] = markerVoyagePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_REACHED
] = markerVoyagePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_RETURNING
] = markerVoyageYellow;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER][
  COURIER_STATUS_CANCELED
] = markerVoyageRed;

courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU] = {};
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU][
  COURIER_STATUS_FREE
] = courierMituGreen;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU][
  COURIER_STATUS_BUSY
] = courierMituRed;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU][
  COURIER_STATUS_BROWSING
] = courierMituPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU][
  COURIER_STATUS_VERIFYING
] = courierMituPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU][
  COURIER_STATUS_PREPARING
] = courierMituPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU][
  COURIER_STATUS_GATHERING
] = courierMituPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU][
  COURIER_STATUS_REACHED_TO_RESTAURANT
] = courierMituPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU][
  COURIER_STATUS_ONWAY
] = courierMituPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU][
  COURIER_STATUS_REACHED
] = courierMituPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU][
  COURIER_STATUS_RETURNING
] = courierMituYellow;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU][
  COURIER_STATUS_CANCELED
] = courierMituRed;

courierMarkersByStatus[
  COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE
] = {};
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_FREE
] = markerMotoGreen;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_BUSY
] = markerMotoRed;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_BROWSING
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_RESERVED
] = markerMotoReserved;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_VERIFYING
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_PREPARING
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_GATHERING
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_REACHED_TO_RESTAURANT
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_ONWAY
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_REACHED
] = markerMotoPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_RETURNING
] = markerMotoYellow;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE][
  COURIER_STATUS_CANCELED
] = markerMotoRed;

courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE] =
  {};
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE][
  COURIER_STATUS_FREE
] = markerBicycleGreen;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE][
  COURIER_STATUS_BUSY
] = markerBicycleRed;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE][
  COURIER_STATUS_BROWSING
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE][
  COURIER_STATUS_VERIFYING
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE][
  COURIER_STATUS_PREPARING
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE][
  COURIER_STATUS_GATHERING
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE][
  COURIER_STATUS_REACHED_TO_RESTAURANT
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE][
  COURIER_STATUS_ONWAY
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE][
  COURIER_STATUS_REACHED
] = markerBicyclePrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE][
  COURIER_STATUS_RETURNING
] = markerBicycleYellow;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE][
  COURIER_STATUS_CANCELED
] = markerBicycleRed;

courierMarkersByStatus[
  COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET
] = {};
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][
  COURIER_STATUS_FREE
] = marketDobloGreen;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][
  COURIER_STATUS_BUSY
] = marketDobloRed;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][
  COURIER_STATUS_BROWSING
] = marketDobloPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][
  COURIER_STATUS_VERIFYING
] = marketDobloPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][
  COURIER_STATUS_PREPARING
] = marketDobloPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][
  COURIER_STATUS_GATHERING
] = marketDobloPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][
  COURIER_STATUS_REACHED_TO_RESTAURANT
] = marketDobloPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][
  COURIER_STATUS_ONWAY
] = marketDobloPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][
  COURIER_STATUS_REACHED
] = marketDobloPrimary;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][
  COURIER_STATUS_RETURNING
] = marketDobloYellow;
courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][
  COURIER_STATUS_CANCELED
] = marketDobloRed;

export const g10CourierMarkersByVehicleTypeAndStatus = {};
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO] = {};
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_FREE] = markerMotoGreen;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_BUSY] = markerMotoRed;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_BROWSING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_RESERVED] = markerMotoReserved;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_VERIFYING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_PREPARING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_GATHERING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_REACHED_TO_RESTAURANT] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_ONWAY] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_REACHED] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_RETURNING] = markerMotoYellow;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO][COURIER_STATUS_CANCELED] = markerMotoRed;

g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC] = {};
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_FREE] = markerMotoGreen;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_BUSY] = markerMotoRed;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_BROWSING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_RESERVED] = markerMotoReserved;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_VERIFYING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_PREPARING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_GATHERING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_REACHED_TO_RESTAURANT] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_ONWAY] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_REACHED] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_RETURNING] = markerMotoYellow;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MOTO_50CC][COURIER_STATUS_CANCELED] = markerMotoRed;

g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN] = {};
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_FREE] = markerVanGreen;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_BUSY] = markerVanRed;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_BROWSING] = markerVanPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_RESERVED] = markerVanReserved;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_VERIFYING] = markerVanPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_PREPARING] = markerVanPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_GATHERING] = markerVanPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_REACHED_TO_RESTAURANT] = markerVanPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_ONWAY] = markerVanPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_REACHED] = markerVanPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_RETURNING] = markerVanYellow;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.VAN][COURIER_STATUS_CANCELED] = markerVanRed;

g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT] = {};
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_FREE] = markerOnFootGreen;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_BUSY] = markerOnFootRed;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_BROWSING] = markerOnFootPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_RESERVED] = markerOnFootReserved;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_VERIFYING] = markerOnFootPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_PREPARING] = markerOnFootPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_GATHERING] = markerOnFootPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_REACHED_TO_RESTAURANT] = markerOnFootPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_ONWAY] = markerOnFootPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_REACHED] = markerOnFootPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_RETURNING] = markerOnFootYellow;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.ON_FOOT][COURIER_STATUS_CANCELED] = markerOnFootRed;

g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU] = {};
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU][COURIER_STATUS_FREE] = courierMituGreen;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU][COURIER_STATUS_BUSY] = courierMituRed;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU][COURIER_STATUS_BROWSING] = courierMituPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU][COURIER_STATUS_VERIFYING] = courierMituPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU][COURIER_STATUS_PREPARING] = courierMituPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU][COURIER_STATUS_GATHERING] = courierMituPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU][COURIER_STATUS_REACHED_TO_RESTAURANT] = courierMituPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU][COURIER_STATUS_ONWAY] = courierMituPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU][COURIER_STATUS_REACHED] = courierMituPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU][COURIER_STATUS_RETURNING] = courierMituYellow;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.MITU][COURIER_STATUS_CANCELED] = courierMituRed;

g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE] = {};
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_FREE] = markerMotoGreen;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_BUSY] = markerMotoRed;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_BROWSING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_RESERVED] = markerMotoReserved;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_VERIFYING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_PREPARING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_GATHERING] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_REACHED_TO_RESTAURANT] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_ONWAY] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_REACHED] = markerMotoPrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_RETURNING] = markerMotoYellow;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_MOTORCYCLE][COURIER_STATUS_CANCELED] = markerMotoRed;

g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE] = {};
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE][COURIER_STATUS_FREE] = markerBicycleGreen;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE][COURIER_STATUS_BUSY] = markerBicycleRed;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE][COURIER_STATUS_BROWSING] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE][COURIER_STATUS_VERIFYING] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE][COURIER_STATUS_PREPARING] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE][COURIER_STATUS_GATHERING] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE][COURIER_STATUS_REACHED_TO_RESTAURANT] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE][COURIER_STATUS_ONWAY] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE][COURIER_STATUS_REACHED] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE][COURIER_STATUS_RETURNING] = markerBicycleYellow;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_BICYCLE][COURIER_STATUS_CANCELED] = markerBicycleRed;

g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR] = {};
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR][COURIER_STATUS_FREE] = markerBicycleGreen;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR][COURIER_STATUS_BUSY] = markerBicycleRed;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR][COURIER_STATUS_BROWSING] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR][COURIER_STATUS_VERIFYING] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR][COURIER_STATUS_PREPARING] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR][COURIER_STATUS_GATHERING] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR][COURIER_STATUS_REACHED_TO_RESTAURANT] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR][COURIER_STATUS_ONWAY] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR][COURIER_STATUS_REACHED] = markerBicyclePrimary;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR][COURIER_STATUS_RETURNING] = markerBicycleYellow;
g10CourierMarkersByVehicleTypeAndStatus[VEHICLE_TYPE.E_CAR][COURIER_STATUS_CANCELED] = markerBicycleRed;

const courierReachedMarkerIcons = {};
courierReachedMarkerIcons[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_CAR] = markerVanPrimaryTransparent;
courierReachedMarkerIcons[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO] = markerMotoPrimaryTransparent;
courierReachedMarkerIcons[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_MOTORCYCLE] = markerMotoPrimaryTransparent;
courierReachedMarkerIcons[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_BICYCLE] = markerMotoPrimaryTransparent;
courierReachedMarkerIcons[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_E_BICYCLE] = markerBicyclePrimary;
courierReachedMarkerIcons[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MITU] = markerMituPrimaryTransparent;
courierReachedMarkerIcons[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_ONFOOT] = markerOnFootPrimaryTransparent;
courierReachedMarkerIcons[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VOYAGER] = markerVoyagerPrimaryTransparent;
courierReachedMarkerIcons[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN] = markerVanPrimaryTransparent;
courierReachedMarkerIcons[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET] = marketOrderPrimaryTransparent;

const CourierReachMarkersByVehicleType = {};
CourierReachMarkersByVehicleType[VEHICLE_TYPE.ON_FOOT] = markerOnFootPrimaryTransparent;
CourierReachMarkersByVehicleType[VEHICLE_TYPE.MOTO] = markerMotoPrimaryTransparent;
CourierReachMarkersByVehicleType[VEHICLE_TYPE.MOTO_50CC] = markerMotoPrimaryTransparent;
CourierReachMarkersByVehicleType[VEHICLE_TYPE.E_MOTORCYCLE] = markerMotoPrimaryTransparent;
CourierReachMarkersByVehicleType[VEHICLE_TYPE.E_BICYCLE] = markerBicyclePrimary;
CourierReachMarkersByVehicleType[VEHICLE_TYPE.MITU] = markerMituPrimaryTransparent;
CourierReachMarkersByVehicleType[VEHICLE_TYPE.VAN] = markerVanPrimaryTransparent;
CourierReachMarkersByVehicleType[VEHICLE_TYPE.E_CAR] = markerVanPrimaryTransparent;

export const getCourierMarker = (courier, reachLocation) => {
  let courierMarker = courierMarkersByStatus[COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_GETIR_MARKET][courier?.status];
  if (!isEmpty(reachLocation)) {
    courierMarker = CourierReachMarkersByVehicleType[courier?.fleetVehicleType];
  }
  else if (courier?.isOnlyFoodServing) {
    courierMarker = foodCourierIcons[courier?.status];
  }
  else if (courier?.fleetVehicleType) {
    courierMarker = g10CourierMarkersByVehicleTypeAndStatus[courier?.fleetVehicleType][courier?.status];
  }
  return courierMarker;
};
