import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FOOD_ORDER.FILTER;

export const resultsSelector = {
  getData: state => state?.[reducerKey]?.results?.data,
  isPending: state => state?.[reducerKey]?.results?.isPending,
};

export const paymentMethodsSelector = {
  getData: state => state?.[reducerKey]?.paymentMethods?.data,
  isPending: state => state?.[reducerKey]?.paymentMethods?.isPending,
};

export const restaurantsSelector = {
  getByName: state => state?.[reducerKey]?.restaurants?.data,
  isPending: state => state?.[reducerKey]?.restaurants?.isPending,
};

export const filtersSelector = {
  getFilters: state => state?.[reducerKey]?.filters,
  getStartDate: state => state?.[reducerKey]?.filters?.startDate,
  getEndDate: state => state?.[reducerKey]?.filters?.endDate,
  paymentMethods: state => state?.[reducerKey]?.filters?.paymentMethods,
  getDeliveryTypes: state => state?.[reducerKey]?.filters?.deliveryTypes,
  getPlatformTypes: state => state?.[reducerKey]?.filters?.platformTypes,
  getTimeTypes: state => state?.[reducerKey]?.filters?.timeTypes,
  getConfirmationCode: state => state?.[reducerKey]?.filters?.confirmationCode,
  getOrderStatus: state => state?.[reducerKey]?.filters?.status,
  getCity: state => state?.[reducerKey]?.filters?.cityId,
  getRestaurant: state => state?.[reducerKey]?.filters?.restaurantId,
};
