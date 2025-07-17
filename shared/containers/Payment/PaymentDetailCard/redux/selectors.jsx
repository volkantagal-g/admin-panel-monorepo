import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PAYMENT_EVENT.DETAIL_CARD;

export const transactionDetailCardSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.transactionDetailCard?.data,
    data => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.transactionDetailCard.isPending,
    isPending => {
      return isPending;
    },
  ),
};

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
