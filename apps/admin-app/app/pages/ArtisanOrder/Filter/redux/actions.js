import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getResultsRequest: { data: {} },
  getResultsSuccess: { data: [] },
  getResultsFailure: { error: null },
  getPaymentMethods: { data: {} },
  setPaymentMethods: { paymentMethods: [] },
  getPaymentMethodsFailure: { error: null },
  setFilters: { data: {} },
  setCities: { cities: [] },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.ARTISAN_ORDER.FILTER}_` });
