import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getPromosByTargetDomainRequest: { promoType: null, filterParams: {} },
    getPromosByTargetDomainSuccess: { data: [], promoType: null },
    getPromosByTargetDomainFailure: { error: null, promoType: null },

    getPromoDetailsByTargetDomainRequest: { promoType: null, promoId: null },
    getPromoDetailsByTargetDomainSuccess: { promoDetail: null, promoType: null },
    getPromoDetailsByTargetDomainFailure: { error: null, promoType: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.PROMO}_` },
);
