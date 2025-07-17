import moment from 'moment-timezone';
import { orderBy, get, isNumber, find } from 'lodash';

import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { currency, formatNumber } from '@shared/utils/common';
import {
  COURIER_TYPE,
  GETIR_10_DOMAIN_TYPE,
  WORK_TYPE_PART_TIME,
  GETIR_FOOD,
} from '@shared/shared/constants';

import motoMarker from '@shared/assets/markers/marker_moto_red_on_green.png';
import botMarker from '@shared/assets/images/bot-icon.png';
import getirDeliveryMarker from '@shared/assets/images/food-getir-delivery-icon.png';
import motoPartTimeMarker from '@shared/assets/markers/marker_moto_parttime_primary.png';
import restaurantDeliveryMarker from '@shared/assets/images/food-restaurant-delivery-icon.png';
import onFootMarker from '@shared/assets/markers/marker_onfoot_yellow.png';
import vanMarker from '@shared/assets/markers/marker_van_green.png';
import vanWaterMarker from '@shared/assets/markers/marker_van_water_green.png';
import mituMarker from '@shared/assets/markers/marker_mitu_green.png';

export const CALCULATION_AREA = {
  G10: 1,
  GL: 2,
  PROMO: 3,
  RESTAURANT_ORDER: 4,
  BSKT: 5,
  CHRG: 6,
};

export const getOrderedData = filteredData => {
  const dataTimeZone = getSelectedCountryTimezone.getData();
  return orderBy(filteredData, data => moment.tz(data.checkoutDate, dataTimeZone).unix(), ['desc']);
};

export const mapTotals = results => {
  let totalOrderCount = 0;
  let totalRestaurantTotalFoodOrderCount = 0;
  let totalFoodOrderCount = 0;
  let overallTotalChargedAmount = 0;
  let overallTotalPrice = 0;
  const totalFoodOrderWithPromoCount = results.filter(item => item?.promo?.promoCode).length;
  const foodOrdersLength = results.length;

  const formattedResults = results.map(result => {
    const clientSucMarketOrderCountsByDomainType = get(result, 'client.sucOrderCounts', []);
    const tempResult = result;
    tempResult.client.sucOrderCount += get(
      find(clientSucMarketOrderCountsByDomainType, { domainType: GETIR_10_DOMAIN_TYPE }),
      'count',
      0,
    );
    return tempResult;
  });

  formattedResults.forEach(result => {
    totalOrderCount += get(result, 'client.sucOrderCount', 0) + 1;
    totalRestaurantTotalFoodOrderCount += get(result, 'restaurantTotalFoodOrderCount', 0);
    totalFoodOrderCount += get(result, 'client.sucFoodOrderCount', 0) + 1;
    overallTotalChargedAmount += get(result, 'totalChargedAmount', 0);
    overallTotalPrice += get(result, 'totalPrice', 0);
  });

  return {
    totalOrderCount,
    totalRestaurantTotalFoodOrderCount,
    totalFoodOrderCount,
    overallTotalChargedAmount,
    overallTotalPrice,
    totalFoodOrderWithPromoCount,
    foodOrdersLength,
  };
};

export const makeTotalsCalculator = totals => {
  const {
    totalOrderCount,
    totalRestaurantTotalFoodOrderCount,
    totalFoodOrderCount,
    overallTotalChargedAmount,
    overallTotalPrice,
    totalFoodOrderWithPromoCount,
    foodOrdersLength,
  } = totals;

  return area => {
    let calcValue;
    let basketTotal = 0;
    let chargeTotal = 0;
    switch (area) {
      case CALCULATION_AREA.G10:
        calcValue = Number.parseFloat(totalOrderCount / foodOrdersLength || 0).toFixed(1);
        break;
      case CALCULATION_AREA.GL:
        calcValue = Number.parseFloat(totalFoodOrderCount / foodOrdersLength || 0).toFixed(1);
        break;
      case CALCULATION_AREA.PROMO:
        calcValue = Number.parseFloat((totalFoodOrderWithPromoCount / foodOrdersLength) * 100 || 0).toFixed(1);
        break;
      case CALCULATION_AREA.RESTAURANT_ORDER:
        calcValue = Number.parseFloat(totalRestaurantTotalFoodOrderCount / foodOrdersLength || 0).toFixed(1);
        break;
      case CALCULATION_AREA.BSKT:
        basketTotal = overallTotalPrice / foodOrdersLength || 0;
        calcValue = isNumber(basketTotal) && `${formatNumber(basketTotal)} ${currency()}`;
        break;
      case CALCULATION_AREA.CHRG:
        chargeTotal = overallTotalChargedAmount / foodOrdersLength || 0;
        calcValue = isNumber(chargeTotal) && `${formatNumber(chargeTotal)} ${currency()}`;
        break;
      default:
        calcValue = 0;
        break;
    }

    return calcValue;
  };
};

/**
 * @param {*} order
 */
export const getOrderMarkerSrc = order => {
  const checkCourierType = get(order, 'courier.courierType', '');
  const checkCourierWorkType = get(order, 'courier.workType', '');
  const checkDeliveryType = get(order, 'deliveryType', '');

  let orderMarkerSrc;
  switch (true) {
    case order?.getirCouriersBusyOnCheckout:
      orderMarkerSrc = motoMarker;
      break;
    case order?.isBot && order?.courier:
      orderMarkerSrc = botMarker;
      break;
    case checkCourierType === COURIER_TYPE.GM &&
      checkCourierWorkType !== WORK_TYPE_PART_TIME &&
      checkDeliveryType === GETIR_FOOD.DELIVERY_TYPES.GETIR:
      orderMarkerSrc = getirDeliveryMarker;
      break;
    case checkCourierType === COURIER_TYPE.GM &&
      checkCourierWorkType === WORK_TYPE_PART_TIME &&
      checkDeliveryType === GETIR_FOOD.DELIVERY_TYPES.GETIR:
      orderMarkerSrc = motoPartTimeMarker;
      break;
    case checkCourierType === COURIER_TYPE.MOTO && checkDeliveryType === GETIR_FOOD.DELIVERY_TYPES.RESTAURANT:
      orderMarkerSrc = restaurantDeliveryMarker;
      break;
    case checkCourierType === COURIER_TYPE.ON_FOOT:
      orderMarkerSrc = onFootMarker;
      break;
    case checkCourierType === COURIER_TYPE.VAN:
      orderMarkerSrc = vanMarker;
      break;
    case checkCourierType === COURIER_TYPE.CAR:
      orderMarkerSrc = vanWaterMarker;
      break;
    case checkCourierType === COURIER_TYPE.MITU:
      orderMarkerSrc = mituMarker;
      break;
    default:
      orderMarkerSrc = null;
      break;
  }

  return orderMarkerSrc;
};

const MAX_CODE_LENGTH = 25;
export const formatPromoCode = code => {
  if (!code) {
    return null;
  }

  if (code.length >= MAX_CODE_LENGTH) {
    return `${code.slice(0, MAX_CODE_LENGTH - 3)}...`;
  }

  return code;
};
