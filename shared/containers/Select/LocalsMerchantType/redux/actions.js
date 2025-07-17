import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getLocalsMerchantTypesRequest: { body: null },
  getLocalsMerchantTypesSuccess: { data: {} },
  getLocalsMerchantTypesFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SELECT.LOCALS_MERCHANT_TYPE}_` });
