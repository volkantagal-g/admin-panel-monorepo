import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getPersonalPromoRequest: { promoCode: undefined, promoUsageType: undefined },
  getPersonalPromoSuccess: { data: [] },
  getPersonalPromoFailure: { error: null },

  disablePersonalPromoRequest: { id: undefined, body: undefined },
  disablePersonalPromoSuccess: { data: [] },
  disablePersonalPromoFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.PERSONAL_PROMO.LIST}_` });
