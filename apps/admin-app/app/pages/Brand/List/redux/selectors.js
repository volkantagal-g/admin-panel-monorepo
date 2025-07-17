import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BRAND.LIST;

export const brandsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'brands');
    },
    ({ data }) => {
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'brands');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const filtersSelector = {
  getSelectedFilterOptions: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ selectedStatuses }) => {
      return selectedStatuses || [];
    },
  ),
};
