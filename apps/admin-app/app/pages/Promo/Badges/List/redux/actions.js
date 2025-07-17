import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getPromoBadgesByFiltersRequest: {
      name: undefined,
      promoMechanic: undefined,
      limit: undefined,
      page: undefined,
    },
    getPromoBadgesByFiltersSuccess: { promoBadges: [], totalCount: 0 },
    getPromoBadgesByFiltersFailure: { error: null },
    managePromoBadgeRequest: { body: {} },
    managePromoBadgeSuccess: { data: {} },
    managePromoBadgeFailure: { error: null },
    deletePromoBadgeRequest: { id: undefined },
    deletePromoBadgeSuccess: { id: undefined },
    deletePromoBadgeFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.PROMO.BADGES}_` },
);
