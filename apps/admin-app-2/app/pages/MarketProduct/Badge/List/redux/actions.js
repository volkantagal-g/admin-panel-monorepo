import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getBadgesRequest: { limit: 10, offset: 0 },
  getBadgesSuccess: { data: [] },
  getBadgesFailure: { error: null },
  getMarketProductBadgesRequest: { badgeId: null },
  getMarketProductBadgesSuccess: { data: [] },
  getMarketProductBadgesFailure: { error: null },
  updateMarketProductBadgesBulkRequest: { badgeId: null, productIds: [] },
  updateMarketProductBadgesBulkSuccess: { data: {} },
  updateMarketProductBadgesBulkFailure: { error: null },
  setSelectedBadge: { badge: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.BADGE.LIST}_` });
