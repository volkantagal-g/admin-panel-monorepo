import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getPromosRequest: {
    promoCode: undefined,
    startDate: undefined,
    endDate: undefined,
    status: undefined,
    discountReason: undefined,
    domainTypes: undefined,
    promoUsageType: undefined,
    promoTarget: undefined,
    limit: undefined,
    page: undefined,
  },
  getPromosSuccess: { promos: [], totalCount: 0 },
  getPromosFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.PROMO.LIST}_` });
