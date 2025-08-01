import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TRANSACTIONS.LIST;

export const transactionsSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.transactionList.data.data,
    data => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.transactionList?.isPending,
    isPending => {
      return isPending;
    },
  ),
  getTotalDataCount: createSelector(
    state => state?.[reducerKey]?.transactionList?.data?.totalCount,
    totalCount => {
      return totalCount;
    },
  ),
};

export const getSortOptions = createSelector(
  state => state?.[reducerKey].sortOptions,
  data => {
    return data;
  },
);

export const getFilters = createSelector(
  state => state?.[reducerKey].filters,
  data => {
    return data;
  },
);

export const getPagination = createSelector(
  state => state?.[reducerKey].pagination,
  data => {
    return data;
  },
);

export const merchantListSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.merchantList.data.data,
    data => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.merchantList?.isPending,
    isPending => {
      return isPending;
    },
  ),
};
