import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getRankingScenarioNamesRequest: null,
  getRankingScenarioNamesSuccess: { data: {} },
  getRankingScenarioNamesFailure: { error: null },
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.GROUP.COMMON}_` });
