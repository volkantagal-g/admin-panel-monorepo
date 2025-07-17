import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BANNER.ACTION;

export const getConfigKeySelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getConfigKey');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getConfigKey');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const getSmartSuggestionsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getSmartSuggestions');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getSmartSuggestions');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};
