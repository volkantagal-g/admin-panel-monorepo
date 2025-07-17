import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey =REDUX_KEY.SELECT.USER;

export const getUsersSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'users');
    },
    ({ data }) => {
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'users');
    },
    ({ isPending }) => {
      return !!isPending;
    }
  ),
};
