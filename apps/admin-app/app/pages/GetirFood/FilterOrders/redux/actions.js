import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  // Init
  initPage: null,
  destroyPage: null,

  // Network
  getResultsRequest: { data: {} },
  getResultsSuccess: { data: [] },
  getResultsFailure: { error: null },
  getPaymentMethodsRequest: { includeOnline: false },
  getPaymentMethodsSuccess: { data: [] },
  getPaymentMethodsFailure: { error: null },
  getRestaurantsByNameRequest: { name: '', cityIds: '' },
  getRestaurantsByNameSuccess: { data: [] },
  getRestaurantsByNameFailure: { error: null },

  // Filters
  setFiltersPage: { page: 1 },
  setFiltersPagePerRow: { pagePerRow: 10 },
  setStartDate: { startDate: null },
  setEndDate: { endDate: null },
  setCityId: { cityId: null },
  setDeliveryTypes: { deliveryTypes: null },
  setIsRDU: { isRDU: undefined },
  setOrderStatus: { status: null },
  setPaymentMethods: { paymentMethods: null },
  setPlatformTypes: { platformTypes: null },
  setRestaurantId: { restaurantId: null },
  setTimeTypes: { timeTypes: null },
  setConfirmationCode: { confirmationCode: null },
}, { prefix: `${REDUX_KEY.FOOD_ORDER.FILTER}_` });
