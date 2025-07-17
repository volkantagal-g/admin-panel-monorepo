import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.CUSTOMER_SATISFACTION_REQUEST.NEW}_`;

export const { Types, Creators } = createActions(
  {
    createCustomerSatisfactionRequestRequest: {
      requestBody: {
        products: [],
        warehouseId: '',
      },
    },
    createCustomerSatisfactionRequestSuccess: { data: [] },
    createCustomerSatisfactionRequestFailure: { error: null },
    filterProductsRequest: {
      requestBody: {
        warehouseId: '',
        keyword: undefined,
        limit: '',
        offset: '',
        language: '',
      },
    },
    filterProductsSuccess: { data: [], total: 0 },
    filterProductsFailure: { error: null },
    initPage: null,
    resetCreateRequest: '',
    destroyPage: null,
  },
  { prefix },
);
