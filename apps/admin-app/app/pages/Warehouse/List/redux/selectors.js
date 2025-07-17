import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.WAREHOUSE.LIST;

export const warehousesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouses');
    },
    ({ data }) => {
      return data;
    }
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouses');
    },
    ({ totalCount }) => {
      return totalCount;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouses');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
