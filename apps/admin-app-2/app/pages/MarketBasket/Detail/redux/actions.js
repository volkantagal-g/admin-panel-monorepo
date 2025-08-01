import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MARKET_BASKET.DETAIL}_`;

export const { Types, Creators } = createActions(
  {
    getMarketBasketRequest: { basketId: null },
    getMarketBasketSuccess: { data: [] },
    getMarketBasketFailure: { error: null },
    cancelMarketBasketRequest: { basketId: null, onCancelSuccess: null },
    cancelMarketBasketSuccess: { data: [] },
    cancelMarketBasketFailure: { error: null },
    initPage: null,
    destroyPage: null,
    setFilters: { filters: null },
  },
  { prefix },
);
