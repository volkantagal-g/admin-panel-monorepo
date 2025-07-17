import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.POPUP.LIST;

export const resultsSelector = {
  getResults: state => state?.[reducerKey]?.results?.data ?? [],
  isPending: state => state?.[reducerKey]?.results?.isPending,
};

export const filtersSelector = { getFilters: state => state?.[reducerKey]?.filters };
export const globalRulesetSelector = { getRuleSet: state => state?.[reducerKey]?.globalRuleset };
