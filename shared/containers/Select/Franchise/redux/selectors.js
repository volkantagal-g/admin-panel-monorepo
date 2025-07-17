import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.SELECT.FRANCHISE;

export const getFranchisesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'franchises');
    },
    ({ data }) => {
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'franchises');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
