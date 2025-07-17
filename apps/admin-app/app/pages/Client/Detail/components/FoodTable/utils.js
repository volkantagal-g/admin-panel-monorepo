import moment from 'moment';

import { FOOD_ORDER_STATUS } from '@shared/shared/constants';

export const transformData = data => {
  return data?.map(food => ({
    id: food.id,
    restaurant: food.restaurant,
    courier: food.courier,
    checkoutDate: food.checkoutDate,
    status: food.status,
    totalPrice: food.totalPrice,
    deliveryType: food.deliveryType,
    isBasket: food.isBasket,
  }));
};

const INITIAL_VALUES = { paymentMethods: [] };

export const transformValuesForApi = (values = INITIAL_VALUES) => {
  const queryParams = {};
  queryParams.page = values.page;
  queryParams.count = values.count;
  queryParams.clientId = values.clientId;
  queryParams.deliveryTypes = values.deliveryTypes ?? [];
  queryParams.paymentMethods = values.paymentMethods?.map(Number).filter(Boolean) ?? [];

  if (values.startDate) {
    queryParams.createdAtStart = moment(values.startDate).toDate();
  }
  if (values.endDate) {
    queryParams.createdAtEnd = moment(values.endDate).toDate();
  }

  if (values.status === 'SUCCESS_ORDERS') {
    queryParams.statusStart = FOOD_ORDER_STATUS.DELIVERED;
    queryParams.statusEnd = FOOD_ORDER_STATUS.RATED;
  }
  else if (values.status === 'CANCELED_ORDERS') {
    queryParams.statusStart = FOOD_ORDER_STATUS.CANCELED_ADMIN;
    queryParams.statusEnd = FOOD_ORDER_STATUS.CANCELED_RESTAURANT;
  }
  else if (values.status === 'ACTIVE_ORDERS') {
    queryParams.statusStart = FOOD_ORDER_STATUS.VERIFYING;
    queryParams.statusEnd = FOOD_ORDER_STATUS.REACHED;
  }

  return queryParams;
};
