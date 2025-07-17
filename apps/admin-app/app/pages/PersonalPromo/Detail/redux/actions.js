import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getPersonalPromoRequest: { promoId: null },
    getPersonalPromoSuccess: { personalPromo: {} },
    getPersonalPromoFailure: { error: null },
    updatePersonalPromoDatesRequest: { promoId: null, promoCode: null, validFrom: null, validUntil: null },
    updatePersonalPromoStatusRequest: { promoId: null, status: null },
    updatePersonalPromoDatesFailure: { error: null },
    updatePersonalPromoStatusFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.PROMO.PERSONAL_DETAIL}_` },
);
