import { createSelector } from 'reselect';
import { toPairs } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.GROUP.COMMON;
export const rankingScenarioNamesSelector = {
  getData: createSelector(
    (state: any) => state[reducerKey]?.getRankingScenarioNamesRequest,
    (rankingScenarioNames: any) => toPairs(rankingScenarioNames?.data).map(([label, value]) => ({ label, value })),
  ),
  getIsPending: (state: any) => state[reducerKey]?.getRankingScenarioNamesRequest?.isPending,
};
