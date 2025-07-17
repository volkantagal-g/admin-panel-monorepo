import { get } from 'lodash';

import {
  FOOD_ORDER_STATUS,
  GETIR_FOOD_DOMAIN_TYPE,
  COURIER_SERVICE_DOMAIN_TYPES,
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
  COURIER_TYPE_FOR_COURIER_PLAN,
  WORK_TYPE_PART_TIME,
} from '@shared/shared/constants';

import foodOrderMarkerYellow from '@shared/assets/markers/marker_food_order_yellow.png';
import foodOrderMarkerRed from '@shared/assets/markers/marker_food_order_red.png';
import foodOrderMarkerPrimary from '@shared/assets/markers/marker_food_order_primary.png';
import foodOrderMarkerGreen from '@shared/assets/markers/marker_food_order_green.png';
import foodOrderPrimaryTransparent from '@shared/assets/markers/marker_food_order_primary_transparent.png';
import onlyFoodServingMarkerGreen from '@shared/assets/markers/marker_onlyFoodServing_green.png';
import onlyFoodServingMarkerRed from '@shared/assets/markers/marker_onlyFoodServing_red.png';
import onlyFoodServingMarkerYellow from '@shared/assets/markers/marker_onlyFoodServing_yellow.png';
import onlyFoodServingMarkerPrimary from '@shared/assets/markers/marker_onlyFoodServing_primary.png';
import vanFranchiseMarkerGreen from '@shared/assets/markers/marker_van_franchise_green.png';
import vanFranchiseMarkerRed from '@shared/assets/markers/marker_van_franchise_red.png';
import vanFranchiseMarkerPrimary from '@shared/assets/markers/marker_van_franchise_primary.png';
import vanFranchiseMarkerReserved from '@shared/assets/markers/marker_van_franchise_reserved.png';
import vanFranchiseMarkerYellow from '@shared/assets/markers/marker_van_franchise_yellow.png';
import motoPartTimeMarkerGreen from '@shared/assets/markers/marker_moto_parttime_green.png';
import motoPartTimeMarkerRed from '@shared/assets/markers/marker_moto_parttime_red.png';
import motoPartTimeMarkerReserved from '@shared/assets/markers/marker_moto_parttime_reserved.png';
import motoPartTimeMarkerPrimary from '@shared/assets/markers/marker_moto_parttime_primary.png';
import motoPartTimeMarkerYellow from '@shared/assets/markers/marker_moto_parttime_yellow.png';
import courierMituGreen from '@shared/assets/markers/marker_mitu_green.png';
import courierMituRed from '@shared/assets/markers/marker_mitu_red.png';
import courierMituPrimary from '@shared/assets/markers/marker_mitu_primary.png';
import courierMituYellow from '@shared/assets/markers/marker_mitu_yellow.png';
import courierMarkerPrimary from '@shared/assets/markers/marker_moto_primary.png';
import courierMarkerGreen from '@shared/assets/markers/marker_moto_green.png';
import courierMarkerYellow from '@shared/assets/markers/marker_moto_yellow.png';
import courierMarkerRed from '@shared/assets/markers/marker_moto_red.png';

const foodOrderMarkersByStatus = {
  [FOOD_ORDER_STATUS.INCOMPLETE]: foodOrderMarkerYellow,
  [FOOD_ORDER_STATUS.ABORTED]: foodOrderMarkerRed,
  [FOOD_ORDER_STATUS.BROWSING]: foodOrderMarkerPrimary,
  [FOOD_ORDER_STATUS.VERIFYING]: foodOrderMarkerPrimary,
  [FOOD_ORDER_STATUS.PREPARING]: foodOrderMarkerPrimary,
  [FOOD_ORDER_STATUS.PREPARED]: foodOrderMarkerPrimary,
  [FOOD_ORDER_STATUS.HANDOVER]: foodOrderMarkerPrimary,
  [FOOD_ORDER_STATUS.ONWAY]: foodOrderMarkerPrimary,
  [FOOD_ORDER_STATUS.REACHED]: foodOrderMarkerPrimary,
  [FOOD_ORDER_STATUS.DELIVERED]: foodOrderMarkerGreen,
  [FOOD_ORDER_STATUS.RATED]: foodOrderMarkerGreen,
  [FOOD_ORDER_STATUS.CANCELED_ADMIN]: foodOrderMarkerRed,
  [FOOD_ORDER_STATUS.CANCELED_RESTAURANT]: foodOrderMarkerRed,
};

const foodCourierIcons = {
  [COURIER_STATUS_FREE]: onlyFoodServingMarkerGreen,
  [COURIER_STATUS_BUSY]: onlyFoodServingMarkerRed,
  [COURIER_STATUS_BROWSING]: onlyFoodServingMarkerPrimary,
  [COURIER_STATUS_RESERVED]: onlyFoodServingMarkerPrimary,
  [COURIER_STATUS_VERIFYING]: onlyFoodServingMarkerPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: onlyFoodServingMarkerPrimary,
  [COURIER_STATUS_PREPARING]: onlyFoodServingMarkerPrimary,
  [COURIER_STATUS_GATHERING]: onlyFoodServingMarkerPrimary,
  [COURIER_STATUS_ONWAY]: onlyFoodServingMarkerPrimary,
  [COURIER_STATUS_REACHED]: onlyFoodServingMarkerPrimary,
  [COURIER_STATUS_RETURNING]: onlyFoodServingMarkerYellow,
  [COURIER_STATUS_CANCELED]: onlyFoodServingMarkerRed,
};

const franchiseVanMarkersByStatus = {
  [COURIER_STATUS_FREE]: vanFranchiseMarkerGreen,
  [COURIER_STATUS_BUSY]: vanFranchiseMarkerRed,
  [COURIER_STATUS_BROWSING]: vanFranchiseMarkerPrimary,
  [COURIER_STATUS_RESERVED]: vanFranchiseMarkerReserved,
  [COURIER_STATUS_VERIFYING]: vanFranchiseMarkerPrimary,
  [COURIER_STATUS_PREPARING]: vanFranchiseMarkerPrimary,
  [COURIER_STATUS_GATHERING]: vanFranchiseMarkerPrimary,
  [COURIER_STATUS_ONWAY]: vanFranchiseMarkerPrimary,
  [COURIER_STATUS_REACHED]: vanFranchiseMarkerPrimary,
  [COURIER_STATUS_RETURNING]: vanFranchiseMarkerYellow,
  [COURIER_STATUS_CANCELED]: vanFranchiseMarkerRed,
};

const parttimeMotoMarkersByStatus = {
  [COURIER_STATUS_FREE]: motoPartTimeMarkerGreen,
  [COURIER_STATUS_BUSY]: motoPartTimeMarkerRed,
  [COURIER_STATUS_BROWSING]: motoPartTimeMarkerPrimary,
  [COURIER_STATUS_RESERVED]: motoPartTimeMarkerReserved,
  [COURIER_STATUS_VERIFYING]: motoPartTimeMarkerPrimary,
  [COURIER_STATUS_PREPARING]: motoPartTimeMarkerPrimary,
  [COURIER_STATUS_GATHERING]: motoPartTimeMarkerPrimary,
  [COURIER_STATUS_ONWAY]: motoPartTimeMarkerPrimary,
  [COURIER_STATUS_REACHED]: motoPartTimeMarkerPrimary,
  [COURIER_STATUS_RETURNING]: motoPartTimeMarkerYellow,
  [COURIER_STATUS_CANCELED]: motoPartTimeMarkerRed,
};

const dedicatedCourierMarker = {
  [COURIER_STATUS_FREE]: courierMituGreen,
  [COURIER_STATUS_BUSY]: courierMituRed,
  [COURIER_STATUS_RETURNING]: courierMituYellow,
  [COURIER_STATUS_VERIFYING]: courierMituPrimary,
  [COURIER_STATUS_PREPARING]: courierMituPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: courierMituPrimary,
  [COURIER_STATUS_REACHED]: courierMituPrimary,
  [COURIER_STATUS_GATHERING]: courierMituPrimary,
  [COURIER_STATUS_ONWAY]: courierMituPrimary,
};

const poolCourierMarker = {
  [COURIER_STATUS_FREE]: courierMarkerGreen,
  [COURIER_STATUS_BUSY]: courierMarkerRed,
  [COURIER_STATUS_RETURNING]: courierMarkerYellow,
  [COURIER_STATUS_VERIFYING]: courierMarkerPrimary,
  [COURIER_STATUS_PREPARING]: courierMarkerPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: courierMarkerPrimary,
  [COURIER_STATUS_GATHERING]: courierMarkerPrimary,
  [COURIER_STATUS_REACHED]: courierMarkerPrimary,
  [COURIER_STATUS_ONWAY]: courierMarkerPrimary,
};

const courierMarkerType = (courierDomainType, courierStatus) => {
  if (courierDomainType.length === 1 && courierDomainType[0] === GETIR_FOOD_DOMAIN_TYPE) {
    return get(dedicatedCourierMarker, courierStatus, '');
  }
  return get(poolCourierMarker, courierStatus, '');
};

export const foodOrderCourierDeliveredMarkerIcons = foodOrderPrimaryTransparent;

export const getFoodOrderClientIcon = orderStatus => get(foodOrderMarkersByStatus, [orderStatus], '');

export const getFoodOrderCourierIcon = courier => {
  const courierStatus = get(courier, 'status', '');
  const courierDomainType = get(courier, 'courierDomainType', '');
  const courierType = get(courier, 'courierType', '');
  const isFranchise = get(courier, 'isFranchise', '');
  const workType = get(courier, 'workType', '');
  const serviceDomainTypes = get(courier, 'serviceDomainTypes', '');

  const isFoodServing = serviceDomainTypes.includes(COURIER_SERVICE_DOMAIN_TYPES.FOOD);
  const isOnlyFoodServing = isFoodServing && serviceDomainTypes.length === 1;

  if (isOnlyFoodServing) {
    return get(foodCourierIcons, courierStatus, '');
  }
  if (courierType === COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_VAN && isFranchise) {
    return get(franchiseVanMarkersByStatus, courierStatus, '');
  }
  if (courierType === COURIER_TYPE_FOR_COURIER_PLAN.COURIER_TYPE_MOTO && workType === WORK_TYPE_PART_TIME) {
    return get(parttimeMotoMarkersByStatus, courierStatus, '');
  }

  return courierMarkerType(courierDomainType, courierStatus);
};
