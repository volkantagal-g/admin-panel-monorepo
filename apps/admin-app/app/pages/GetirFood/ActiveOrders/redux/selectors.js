import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { mapResults, activeOrderHasFilterField } from '../utils';

const reducerKey = REDUX_KEY.FOOD_ORDER.ACTIVE;

export const activesSelector = {
  getActives: createSelector(
    state => {
      const data = state?.[reducerKey]?.activeOrders?.data?.data;
      return mapResults(data);
    },
    paymentMethodsState => paymentMethodsState?.[reducerKey]?.paymentMethods,
    filtersState => filtersState?.[reducerKey]?.filters,
    (activeOrders, { data: paymentMethods }, filters) => {
      return activeOrderHasFilterField(activeOrders, { data: paymentMethods }, filters);
    },
  ),
  getActivesTotalCount: state => state?.[reducerKey]?.activeOrders?.data?.totalFoodOrderCount,
  getActivesIsPending: state => state?.[reducerKey]?.activeOrders?.isPending,
};

export const paymentMethodsSelector = {
  getPaymentMethods: state => state?.[reducerKey]?.paymentMethods?.data,
  getPaymentMethodsIsPending: state => state?.[reducerKey]?.paymentMethods?.isPending,
};

export const restaurantsSelector = {
  getRestaurantsByName: state => state?.[reducerKey]?.restaurants?.data,
  getRestaurantsByNameIsPending: state => state?.[reducerKey]?.restaurants?.isPending,
};

export const fetchersSelector = {
  getFetchersCountry: state => state?.[reducerKey]?.fetchers?.country,
  getFetchersCity: state => state?.[reducerKey]?.fetchers?.city,
};

export const filtersSelector = {
  getFilters: state => state?.[reducerKey]?.filters,
  getRestaurant: state => state?.[reducerKey]?.filters?.restaurantsValue,
  getCity: state => state?.[reducerKey]?.filters?.city,
  getDelivery: state => state?.[reducerKey]?.filters?.deliveryValue,
  getPlatform: state => state?.[reducerKey]?.filters?.platformValue,
  getCouriers: state => state?.[reducerKey]?.filters?.couriers,
  getPaymentTypes: state => state?.[reducerKey]?.filters?.paymentTypes,
  getRestaurantsSearchValue: state => state?.[reducerKey]?.filters?.searchRestaurantsValue,
  getPagination: state => state?.[reducerKey]?.filters?.pagination,
};
