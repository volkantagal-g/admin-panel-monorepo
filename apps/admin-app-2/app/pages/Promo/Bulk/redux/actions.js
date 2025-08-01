import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getMasterPromoIdsRequest: { promoCode: undefined },
    getMasterPromoIdsSuccess: { promos: [], totalCount: 0 },
    getMasterPromoIdsFailure: { error: null },
    createBulkPromosRequest: { parentId: null, bulkPromos: null },
    createBulkPromosSuccess: { data: [] },
    createBulkPromosFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.PROMO.BULK}_` },
);
