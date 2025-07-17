import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.SELECT.PERSON;

export const getPeopleSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'people');
    },
    ({ data }) => {
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'people');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
