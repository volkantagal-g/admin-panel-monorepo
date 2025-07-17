import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GETIR_WATER.ORDER_FILTER;

export const brandsSelector = {
  getBrands: state => state?.[reducerKey]?.brands?.data,
  getBrandsIsPending: state => state?.[reducerKey]?.brands?.isPending,
};

export const vendorsSelector = {
  getVendors: state => state?.[reducerKey]?.vendors?.data,
  getVendorsIsPending: state => state?.[reducerKey]?.vendors?.isPending,
};

export const paymentMethodsSelector = {
  getPaymentMethods: state => state?.[reducerKey]?.paymentMethods?.data,
  getPaymentMethodsIsPending: state => state?.[reducerKey]?.paymentMethods?.isPending,
};

export const ordersSelector = {
  getOrders: state => state?.[reducerKey]?.orders?.data,
  getOrdersIsPending: state => state?.[reducerKey]?.orders?.isPending,
};

export const filterSelector = { getFilters: state => state?.[reducerKey]?.filters };
