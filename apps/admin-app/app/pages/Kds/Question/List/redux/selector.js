import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.KDS.QUESTION.LIST;

export const kdsQuestionListSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'kdsQuestionsList');
    },
    ({ data }) => {
      return data;
    }
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'kdsQuestionsList');
    },
    ({ total }) => {
      return total;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'kdsQuestionsList');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
