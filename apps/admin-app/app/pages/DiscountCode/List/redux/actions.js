import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getDiscountCodeRequest: { discountCode: undefined },
  getDiscountCodeSuccess: { data: [] },
  getDiscountCodeFailure: { error: null },

  getDiscountCodeUsedClientsRequest: { clientIds: [] },
  getDiscountCodeUsedClientsSuccess: { data: [] },
  getDiscountCodeUsedClientsFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.DISCOUNT_CODE.LIST}_` });
