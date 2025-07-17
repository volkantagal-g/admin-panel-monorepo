import { createSelector } from 'reselect';

import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';

const getMatchDarkstoreState = state => state?.[REDUX_STORE_KEYS.MATCH_DARKSTORE];

export const selectCentralWarehouses = createSelector(
  [getMatchDarkstoreState],
  matchDarkstoreState => matchDarkstoreState?.centralWarehouses || [],
);

export const selectDarkstoreMatchData = createSelector(
  [getMatchDarkstoreState],
  matchDarkstoreState => matchDarkstoreState?.darkstoreMatchData,
);

export const selectLoading = createSelector(
  [getMatchDarkstoreState],
  matchDarkstoreState => matchDarkstoreState?.loading?.darkstoreMatch ?? false,
);

export const selectCities = createSelector(
  [getMatchDarkstoreState],
  matchDarkstoreState => matchDarkstoreState?.cities || [],
);

export const selectDarkStores = createSelector(
  [getMatchDarkstoreState],
  matchDarkstoreState => matchDarkstoreState?.darkStores || [],
);

export const selectSuppliers = createSelector(
  [getMatchDarkstoreState],
  matchDarkstoreState => matchDarkstoreState?.suppliers?.data?.suppliers || [],
);

export const selectProducts = createSelector(
  [getMatchDarkstoreState],
  matchDarkstoreState => matchDarkstoreState?.products || [],
);

export const selectCategories = createSelector(
  [getMatchDarkstoreState],
  matchDarkstoreState => matchDarkstoreState?.categories || {},
);

export const selectProductSearchLoading = createSelector(
  [getMatchDarkstoreState],
  matchDarkstoreState => matchDarkstoreState?.loading?.productSearch ?? false,
);
