import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getLocalsMerchantByNameRequest: { searchString: '' },
  getLocalsMerchantByNameSuccess: { data: [] },
  getLocalsMerchantByNameFailure: { error: null },
  getShopByIdRequest: { shopId: null },
  getShopByIdSuccess: { data: {} },
  getShopByIdFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SELECT.LOCALS_MERCHANT}_` });
