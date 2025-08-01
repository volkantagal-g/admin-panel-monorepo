import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKETING_APPROVAL.LIST;

export const generatedContentListSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'generatedContentList');
    },
    ({ data }) => {
      return data;
    },
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'generatedContentList');
    },
    ({ totalCount }) => {
      return totalCount || 10000;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'generatedContentList');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const generatedContentSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'generatedContent');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'generatedContent');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
