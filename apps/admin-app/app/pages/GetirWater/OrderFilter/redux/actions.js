import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getBrandsRequest: {},
    getBrandsSuccess: { data: [] },
    getBrandsFailure: { error: null },
    getVendorsRequest: { data: {} },
    getVendorsSuccess: { data: [] },
    getVendorsFailure: { error: null },
    getPaymentMethodsRequest: { },
    getPaymentMethodsSuccess: { data: [] },
    getPaymentMethodsFailure: { error: null },
    filterOrdersRequest: { data: {} },
    filterOrdersSuccess: { data: [] },
    filterOrdersFailure: { error: null },
    setFilters: { value: null, fieldName: null, isNumber: false },
    resetFilters: {},
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.GETIR_WATER.ORDER_FILTER}_` },
);
