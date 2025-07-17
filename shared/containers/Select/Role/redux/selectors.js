import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.SELECT.ROLE;

export const getRolesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'roles');
    },
    ({ data }) => {
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'roles');
    },
    ({ isPending }) => {
      return !!isPending;
    }
  ),
};
