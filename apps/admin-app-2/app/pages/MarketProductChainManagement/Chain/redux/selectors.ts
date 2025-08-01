import { createSelector } from 'reselect';

import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { FilterParams, RootState } from './types';
import { FORM_FIELDS } from '../constants';

const selectChainState = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN] || {
  chains: [],
  isLoading: false,
  selectedChainIds: [],
  isBulkEditMode: false,
  nextCursor: null,
  hasNextPage: false,
  currentPage: 1,
  totalPages: 1,
  total: 0,
  filterParams: {},
  sortConfig: null,
  categoryOptions: {
    [FORM_FIELDS.CATEGORY_LEVEL_3]: [],
    [FORM_FIELDS.CATEGORY_LEVEL_4]: [],
  },
};

export const selectChainList = createSelector(
  selectChainState,
  state => state.chains,
);

export const selectChainListLoading = createSelector(
  selectChainState,
  state => state.isLoading,
);

export const selectSelectedChainIds = createSelector(
  selectChainState,
  state => state.selectedChainIds,
);

export const selectIsBulkEditMode = createSelector(
  selectChainState,
  state => state.isBulkEditMode,
);

export const selectIsBulkEditing = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.isBulkEditing || false;
export const selectChainError = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.error || null;
export const selectSortConfig = createSelector(
  selectChainState,
  state => state.sortConfig,
);
export const selectNextCursor = createSelector(
  selectChainState,
  state => state.nextCursor,
);
export const selectHasNextPage = createSelector(
  selectChainState,
  state => state.hasNextPage,
);
export const selectTotal = createSelector(
  selectChainState,
  state => state.total,
);
export const selectCurrentPage = createSelector(
  selectChainState,
  state => state.currentPage,
);
export const selectFilterParams = createSelector(
  selectChainState,
  state => state.filterParams,
);

export const selectCategoryOptions = createSelector(
  selectChainState,
  state => state.categoryOptions,
);

export const selectDomainTypes = (state: RootState) => state[REDUX_STORE_KEYS.CHAIN]?.domainTypes || [];
