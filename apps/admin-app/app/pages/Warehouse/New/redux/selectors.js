import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.WAREHOUSE.NEW;

export const formDataSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'form');
    },
    ({ data }) => {
      return data;
    },
  ),
};

export const sapDraftWarehousesSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'sapDraftWarehouses'),
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => getStateObject(state, reducerKey, 'sapDraftWarehouses'),
    ({ isPending }) => {
      return isPending;
    },
  ),
};
