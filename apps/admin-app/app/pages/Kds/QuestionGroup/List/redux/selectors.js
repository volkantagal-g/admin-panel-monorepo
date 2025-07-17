import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.KDS.QUESTION_GROUP.LIST;

export const kdsQuestionGroupListSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'kdsQuestionGroupList');
    },
    ({ data }) => {
      return data;
    },
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'kdsQuestionGroupList');
    },
    ({ total }) => {
      return total;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'kdsQuestionGroupList');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
