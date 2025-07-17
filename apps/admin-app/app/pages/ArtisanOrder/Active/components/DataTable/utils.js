import moment from 'moment-timezone';
import _ from 'lodash';

import { getLangKey } from '@shared/i18n';

import { currency, formatNumber } from '@shared/utils/common';
import { LOCALS_ORDER_STATUS, LOCALS_DELIVERY, COURIER_TYPE } from '@shared/shared/constants';
import { localsOrderPaymentMethods } from '@shared/shared/constantValues';

export const CALCULATION_AREA = {
  G10: 1,
  GL: 2,
  PROMO: 3,
  LOCAL_ORDER: 4,
  BSKT: 5,
  CHRG: 6,
};

const getirDeliveryThresholdsArtisanOrder = [];
// Minutes
getirDeliveryThresholdsArtisanOrder[LOCALS_ORDER_STATUS.VERIFYING] = 1000 * 60;
getirDeliveryThresholdsArtisanOrder[LOCALS_ORDER_STATUS.PREPARING] = 12 * 1000 * 60;
getirDeliveryThresholdsArtisanOrder[LOCALS_ORDER_STATUS.PREPARED] = 1000 * 60;
getirDeliveryThresholdsArtisanOrder[LOCALS_ORDER_STATUS.HANDOVER] = 1000 * 60;
getirDeliveryThresholdsArtisanOrder[LOCALS_ORDER_STATUS.ONWAY] = 15 * 1000 * 60;
getirDeliveryThresholdsArtisanOrder[LOCALS_ORDER_STATUS.REACHED] = 3 * 1000 * 60;

const shopDeliveryThresholdsArtisanOrder = [];
// Minutes
shopDeliveryThresholdsArtisanOrder[LOCALS_ORDER_STATUS.VERIFYING] = 1000 * 60;
shopDeliveryThresholdsArtisanOrder[LOCALS_ORDER_STATUS.PREPARING] = 15 * 1000 * 60;
shopDeliveryThresholdsArtisanOrder[LOCALS_ORDER_STATUS.ONWAY] = 25 * 1000 * 60;

export const getActivityDiff = order => {
  const now = moment();
  let activityDiff;
  switch (order.status) {
    case LOCALS_ORDER_STATUS.VERIFYING:
      activityDiff = now.diff(order.checkoutDate);
      break;
    case LOCALS_ORDER_STATUS.PREPARING:
      activityDiff = now.diff(order.verifyDate);
      break;
    case LOCALS_ORDER_STATUS.PREPARED:
      activityDiff = now.diff(order.prepareDate);
      break;
    case LOCALS_ORDER_STATUS.HANDOVER:
      activityDiff = now.diff(order.handoverDate);
      break;
    case LOCALS_ORDER_STATUS.ONWAY:
      activityDiff = (order.deliveryType === LOCALS_DELIVERY.GETIR) ?
        now.diff(order.courierVerifyDate) :
        now.diff(order.prepareDate);
      break;
    case LOCALS_ORDER_STATUS.REACHED:
      activityDiff = now.diff(order.reachDate);
      break;
    default:
      activityDiff = 0;
      break;
  }

  return activityDiff;
};

export const getCourierActivityDiff = order => {
  const now = moment();
  const courierLastActivityDiff = now.diff(order?.courier?.statusLastChangedAt);
  return courierLastActivityDiff;
};

export const mapResults = results => {
  const now = moment();
  return results.map(result => {
    const orderExtraProps = {};

    const orderLastActivityDiff = getActivityDiff(result);
    const courierLastActivityDiff = (result.deliveryType === LOCALS_DELIVERY.GETIR) && getCourierActivityDiff(result);
    const orderTotalTimeDiff = now.diff(_.get(result, 'checkoutDate', ''));
    const threshold = result.deliveryType === LOCALS_DELIVERY.STORE ?
      shopDeliveryThresholdsArtisanOrder[result.status] :
      getirDeliveryThresholdsArtisanOrder[result.status];

    orderExtraProps.lastActivityDiff = orderLastActivityDiff;
    orderExtraProps.courierLastActivityDiff = courierLastActivityDiff;
    orderExtraProps.lastActivityDiffStr = Math.floor(moment.duration(orderLastActivityDiff).asMinutes());
    orderExtraProps.courierLastActivityDiffStr = courierLastActivityDiff ? Math.floor(moment.duration(courierLastActivityDiff).asMinutes()) : '';
    orderExtraProps.totalTimeDiff = orderTotalTimeDiff;
    orderExtraProps.totalTimeDiffStr = parseInt(moment.duration(orderTotalTimeDiff).asMinutes(), 10);
    orderExtraProps.isRed = (orderLastActivityDiff > threshold);
    orderExtraProps.isRedCourierLAct = (courierLastActivityDiff > threshold);

    return { ...result, orderExtraProps };
  });
};

export const mapTotals = results => {
  let totalOrderCount = 0;
  let totalShopTotalArtisanOrderCount = 0;
  let totalArtisanOrderCount = 0;
  let overallTotalChargedAmount = 0;
  let overallTotalPrice = 0;
  const totalArtisanOrderWithPromoCount = results.filter(item => item?.promo?.promoCode).length;
  const artisanOrdersLength = results.length;

  results.forEach(result => {
    totalOrderCount += _.get(result, 'client.sucOrderCount', 0) + 1;
    totalShopTotalArtisanOrderCount += _.get(result, 'shopTotalArtisanOrderCount', 0);
    totalArtisanOrderCount += _.get(result, 'client.sucArtisanOrderCount', 0) + 1;
    overallTotalChargedAmount += _.get(result, 'totalChargedAmount', 0);
    overallTotalPrice += _.get(result, 'totalPrice', 0);
  });

  return {
    totalOrderCount,
    totalShopTotalArtisanOrderCount,
    totalArtisanOrderCount,
    overallTotalChargedAmount,
    overallTotalPrice,
    totalArtisanOrderWithPromoCount,
    artisanOrdersLength,
  };
};

export const makeTotalsCalculator = totals => {
  const {
    totalOrderCount,
    totalShopTotalArtisanOrderCount,
    totalArtisanOrderCount,
    overallTotalChargedAmount,
    overallTotalPrice,
    totalArtisanOrderWithPromoCount,
    artisanOrdersLength,
  } = totals;

  return area => {
    let calcValue;
    let basketTotal = 0;
    let chargeTotal = 0;
    switch (area) {
      case CALCULATION_AREA.G10:
        calcValue = Number.parseFloat(((totalOrderCount / artisanOrdersLength) || 0)).toFixed(1);
        break;
      case CALCULATION_AREA.GL:
        calcValue = Number.parseFloat(((totalArtisanOrderCount / artisanOrdersLength) || 0)).toFixed(1);
        break;
      case CALCULATION_AREA.PROMO:
        calcValue = Number.parseFloat(((totalArtisanOrderWithPromoCount / artisanOrdersLength) * 100 || 0)).toFixed(1);
        break;
      case CALCULATION_AREA.LOCAL_ORDER:
        calcValue = Number.parseFloat(((totalShopTotalArtisanOrderCount / artisanOrdersLength) || 0)).toFixed(1);
        break;
      case CALCULATION_AREA.BSKT:
        basketTotal = (overallTotalPrice / artisanOrdersLength) || 0;
        calcValue = _.isNumber(basketTotal) && `${formatNumber(basketTotal)} ${currency()}`;
        break;
      case CALCULATION_AREA.CHRG:
        chargeTotal = (overallTotalChargedAmount / artisanOrdersLength) || 0;
        calcValue = _.isNumber(chargeTotal) && `${formatNumber(chargeTotal)} ${currency()}`;
        break;
      default:
        calcValue = 0;
        break;
    }

    return calcValue;
  };
};

const markerType = (bgColor, desc, type = null, courierTitle = null) => {
  return {
    bgColor,
    desc,
    type,
    courierTitle,
  };
};

/**
 * Checks order and puts marker to the data table
 * to identify the delivery ownership of the order
 * Locals currently work only with moto type delivery
 * but this function checks further delivery type
 * and generates marker desc with getir color
 * For GG, this function combines whether worktype is part or full fime,
 * together in GG colors and marker
 * 1. On getirCouriersBusyOnCheckout case:
 * red: LOCALS_DELIVERY.STORE tag has been cancelled
 *
 * @param {*} order
 */
export const getOrderMarker = order => {
  const checkCourierType = _.get(order, 'courier.courierType', '');
  const checkDeliveryType = _.get(order, 'deliveryType', '');

  let orderMarker;
  switch (true) {
    case order.getirCouriersBusyOnCheckout:
    case (checkCourierType === COURIER_TYPE.GM &&
          checkDeliveryType === LOCALS_DELIVERY.GETIR):
      orderMarker = markerType('purple', LOCALS_DELIVERY.IN_SHORT.GG, 'LOCALS_DELIVERY_TYPES.IN_SHORT');
      break;
    case (checkCourierType === COURIER_TYPE.MOTO &&
          order.deliveryType === LOCALS_DELIVERY.STORE):
      orderMarker = markerType('green', LOCALS_DELIVERY.IN_SHORT.IG, 'LOCALS_DELIVERY_TYPES.IN_SHORT');
      break;
    case (checkCourierType === COURIER_TYPE.ON_FOOT):
    case (checkCourierType === COURIER_TYPE.VAN):
    case (checkCourierType === COURIER_TYPE.CAR):
    case (checkCourierType === COURIER_TYPE.MITU):
    case (checkCourierType === COURIER_TYPE.BIKE):
      orderMarker = markerType('purple', LOCALS_DELIVERY.IN_SHORT.GG, 'LOCALS_DELIVERY_TYPES.IN_SHORT', checkCourierType);
      break;
    default:
      orderMarker = null;
      break;
  }

  return orderMarker;
};

export const getCityNameById = (cities = [], id) => cities.find(({ _id }) => _id === id)?.name[getLangKey()] ?? '';
export const getPaymentMethodById = id => localsOrderPaymentMethods[id]?.[getLangKey()] ?? '';
export const filterOption = (input, option) => {
  return option.props.children.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
