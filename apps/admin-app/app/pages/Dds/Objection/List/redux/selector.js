import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.DDS.OBJECTION.LIST;

export const ddsObjectionListSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'ddsObjectionList');
    },
    ({ data }) => {
      return data;
    }
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'ddsObjectionList');
    },
    ({ total }) => {
      return total;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'ddsObjectionList');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
