import { get, isEmpty, toNumber, includes } from 'lodash';
import moment from 'moment-timezone';

import { COURIER_TRACKABILITY_TYPE, FOOD_DELIVERY, FOOD_ORDER_STATUS } from '@shared/shared/constants';
import { searchItemFields, isNullOrEmpty } from '@shared/utils/common';

const activesSearchFields = [
  '_id',
  'client.name',
  'restaurant.name',
  'courier.name',
  'promo.promoCode',
];

const MILLISECONDS_IN_A_SECOND = 1000;

const getirDeliveryThresholdsFoodOrder = [];
// Minutes
getirDeliveryThresholdsFoodOrder[FOOD_ORDER_STATUS.VERIFYING] = MILLISECONDS_IN_A_SECOND * 60;
getirDeliveryThresholdsFoodOrder[FOOD_ORDER_STATUS.PREPARING] = 12 * MILLISECONDS_IN_A_SECOND * 60;
getirDeliveryThresholdsFoodOrder[FOOD_ORDER_STATUS.PREPARED] = MILLISECONDS_IN_A_SECOND * 60;
getirDeliveryThresholdsFoodOrder[FOOD_ORDER_STATUS.HANDOVER] = MILLISECONDS_IN_A_SECOND * 60;
getirDeliveryThresholdsFoodOrder[FOOD_ORDER_STATUS.ONWAY] = 15 * MILLISECONDS_IN_A_SECOND * 60;
getirDeliveryThresholdsFoodOrder[FOOD_ORDER_STATUS.REACHED] = 3 * MILLISECONDS_IN_A_SECOND * 60;

const restaurantDeliveryThresholdsFoodOrder = [];
// Minutes
restaurantDeliveryThresholdsFoodOrder[FOOD_ORDER_STATUS.VERIFYING] = MILLISECONDS_IN_A_SECOND * 60;
restaurantDeliveryThresholdsFoodOrder[FOOD_ORDER_STATUS.PREPARING] = 15 * MILLISECONDS_IN_A_SECOND * 60;
restaurantDeliveryThresholdsFoodOrder[FOOD_ORDER_STATUS.ONWAY] = 25 * MILLISECONDS_IN_A_SECOND * 60;

const getActivityDiff = order => {
  const now = moment();
  let activityDiff;
  switch (order.status) {
    case FOOD_ORDER_STATUS.VERIFYING:
      activityDiff = now.diff(order.checkoutDate);
      break;
    case FOOD_ORDER_STATUS.PREPARING:
      activityDiff = now.diff(order.verifyDate);
      break;
    case FOOD_ORDER_STATUS.PREPARED:
      activityDiff = now.diff(order.prepareDate);
      break;
    case FOOD_ORDER_STATUS.HANDOVER:
      activityDiff = now.diff(order.handoverDate);
      break;
    case FOOD_ORDER_STATUS.ONWAY:
      activityDiff = order.deliveryType === FOOD_DELIVERY.GETIR ? now.diff(order.courierVerifyDate) : now.diff(order.prepareDate);
      break;
    case FOOD_ORDER_STATUS.REACHED:
      activityDiff = now.diff(order.reachDate);
      break;
    default:
      activityDiff = 0;
      break;
  }

  return activityDiff;
};

export const activeOrderHasFilterField = (activeOrders, data, filters) => {
  return activeOrders.filter(activeOrder => searchItemFields(activeOrder, filters.searchValue, activesSearchFields));
};

export const mapResults = results => {
  const now = moment();
  return results.map(result => {
    const orderExtraProps = {};

    const orderLastActivityDiff = getActivityDiff(result);
    const orderTotalTimeDiff = now.diff(get(result, 'checkoutDate', ''));
    const threshold =
      result.deliveryType === FOOD_DELIVERY.RESTAURANT
        ? restaurantDeliveryThresholdsFoodOrder[result.status]
        : getirDeliveryThresholdsFoodOrder[result.status];

    orderExtraProps.lastActivityDiff = orderLastActivityDiff;
    orderExtraProps.lastActivityDiffStr = parseInt(moment.duration(orderLastActivityDiff).asMinutes(), 10);
    orderExtraProps.totalTimeDiff = orderTotalTimeDiff;
    orderExtraProps.totalTimeDiffStr = parseInt(moment.duration(orderTotalTimeDiff).asMinutes(), 10);
    orderExtraProps.isRed = orderLastActivityDiff > threshold;

    return { ...result, orderExtraProps };
  });
};

export const transformValuesForApi = ({ filters, paymentMethods }) => {
  let body = {};
  if (!isNullOrEmpty(filters.pagination.currentPage)) {
    body = { ...body, page: filters.pagination.currentPage };
  }
  if (!isNullOrEmpty(filters.pagination.rowsPerPage)) {
    body = { ...body, count: filters.pagination.rowsPerPage };
  }
  if (!isNullOrEmpty(filters.city)) {
    body = { ...body, cityId: filters.city };
  }
  if (!isNullOrEmpty(filters.restaurantsValue)) {
    body = { ...body, restaurantId: filters.restaurantsValue };
  }
  if (!isEmpty(filters.couriers)) {
    body = { ...body, courierTypes: filters.couriers };
  }
  if (!isNullOrEmpty(filters.platformValue)) {
    const formatedDeviceTypes = [];
    if (filters.platformValue === 'Mobile') {
      formatedDeviceTypes.push('Android', 'iPhone');
    }
    else {
      formatedDeviceTypes.push('Web');
    }
    body = { ...body, deviceTypes: formatedDeviceTypes };
  }
  if (!isNullOrEmpty(filters.deliveryValue)) {
    const deliveryType = toNumber(filters.deliveryValue);
    body = { ...body, deliveryTypes: [deliveryType] };
  }
  if (!isEmpty(filters.paymentTypes)) {
    const paymentTypes = paymentMethods.filter(payment => includes(filters.paymentTypes, payment.id));
    const filteredPaymentTypes = paymentTypes.map(type => type.type);
    body = { ...body, paymentMethods: filteredPaymentTypes };
  }
  if (!isNullOrEmpty(filters.isRDU)) {
    const isRDU = filters.isRDU === COURIER_TRACKABILITY_TYPE.TRACKABLE;
    body = { ...body, isRDU };
  }
  return { body };
};

export const searchSelectOption = ({ inputValue, option }) => option.key.toLowerCase().includes(inputValue?.toLowerCase());
