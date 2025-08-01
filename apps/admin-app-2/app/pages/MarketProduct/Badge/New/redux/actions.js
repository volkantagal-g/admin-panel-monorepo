import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createBadgeRequest: { body: null },
  createBadgeSuccess: { data: [] },
  createBadgeFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.BADGE.NEW}_` });
