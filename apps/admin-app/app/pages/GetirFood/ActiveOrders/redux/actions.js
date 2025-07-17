import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getActivesRequest: { body: null },
  getActivesSuccess: { data: [] },
  getActivesFailure: { error: null },
  getPaymentMethodsRequest: { includeOnline: false },
  getPaymentMethodsSuccess: { data: [] },
  getPaymentMethodsFailure: { error: null },
  getRestaurantsByNameRequest: { name: '', cityIds: '' },
  getRestaurantsByNameSuccess: { data: [] },
  getRestaurantsByNameFailure: { error: null },
  setFetchersCountry: { country: '' },
  setFetchersCity: { city: '' },
  setCity: { city: '' },
  setRestaurants: { restaurantsValue: '' },
  setSearchRestaurants: { searchRestaurantsValue: '' },
  setDeliveryType: { deliveryValue: '' },
  setPlatformType: { platformValue: '' },
  setCourierTypes: { couriers: [] },
  setPaymentTypes: { paymentTypes: [] },
  setIsRDU: { isRDU: undefined },
  setMappedResults: { data: [] },
  setPagination: {
    pagination: {
      currentPage: null,
      rowsPerPage: null,
    },
  },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FOOD_ORDER.ACTIVE}_` });
