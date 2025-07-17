import _ from 'lodash';

import Constants from '@shared/utils/commonConstants';

export const transformValuesForApi = values => {
  const queryParams = {};
  const { timeTypes } = values;
  queryParams.page = 1;
  queryParams.count = 10;
  queryParams.deliveryTypes = values.deliveryTypes;
  queryParams.paymentMethods = values.paymentMethods;
  if (values.startDate) queryParams.createdAtStart = values.startDate.toDate();
  if (values.endDate) queryParams.createdAtEnd = values.endDate.toDate();
  if (!_.isEmpty(timeTypes) && timeTypes.length < 2) {
    queryParams.onlyScheduled = timeTypes[0] === Constants.ARTISAN_ORDER_TIME_TYPES.SCHEDULED;
  }
  if (!_.isEmpty(values.platforms)) {
    queryParams.deviceType = [];

    if (values.platforms.includes(Constants.PLATFORMS.MOBILE)) {
      queryParams.deviceType = ['Android', 'iPhone'];
    }

    if (values.platforms.includes(Constants.PLATFORMS.WEBSITE)) {
      queryParams.deviceType.push('Web');
    }
  }

  if (!_.isEmpty(values.city)) {
    queryParams.cityId = values.city;
  }
  if (!_.isEmpty(values.confirmationId)) {
    queryParams.confirmationId = values.confirmationId;
  }
  if (!_.isEmpty(values.orderNumber)) {
    queryParams.orderNumber = values.orderNumber;
  }
  if (values.status === 'SUCCESS_ORDERS') {
    queryParams.statusStart = Constants.ARTISAN_ORDER_STATUS.DELIVERED;
    queryParams.statusEnd = Constants.ARTISAN_ORDER_STATUS.RATED;
  }
  else if (values.status === 'CANCELED_ORDERS') {
    queryParams.statusStart = Constants.ARTISAN_ORDER_STATUS.CANCELED_ADMIN;
    queryParams.statusEnd = Constants.ARTISAN_ORDER_STATUS.CANCELED_SHOP;
  }
  else if (values.status === 'ACTIVE_ORDERS') {
    queryParams.statusStart = Constants.ARTISAN_ORDER_STATUS.VERIFYING;
    queryParams.statusEnd = Constants.ARTISAN_ORDER_STATUS.REACHED;
  }
  if (values.shop) {
    queryParams.shopId = values.shop.value;
  }
  return queryParams;
};