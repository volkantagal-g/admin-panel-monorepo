import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GETIR_WATER.ACTIVE_ORDER;

export const brandsSelector = {
  getBrands: state => state?.[reducerKey]?.brands?.data,
  getBrandsIsPending: state => state?.[reducerKey]?.brands?.isPending,
};

export const activeOrdersSelector = {
  getActiveOrders: state => state?.[reducerKey]?.activeOrders?.data,
  getTotalOrders: state => state?.[reducerKey]?.activeOrders?.totalElements,
  getActiveOrdersIsPending: state => state?.[reducerKey]?.activeOrders?.isPending,
};

export const vendorsSelector = {
  getVendors: state => state?.[reducerKey]?.vendors?.data,
  getVendorsIsPending: state => state?.[reducerKey]?.vendors?.isPending,
};

export const paymentMethodsSelector = {
  getPaymentMethods: state => state?.[reducerKey]?.paymentMethods?.data,
  getPaymentMethodsIsPending: state => state?.[reducerKey]?.paymentMethods?.isPending,
};

export const filterSelector = { getFilters: state => state?.[reducerKey]?.filters };
