import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MERCHANTS.LIST;

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

export const filtersSelector = { getFilters: state => state[reducerKey]?.filters };

export const getPagination = createSelector(
  state => state?.[reducerKey].pagination,
  data => {
    return data;
  },
);
