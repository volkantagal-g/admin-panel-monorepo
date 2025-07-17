import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.KDS.QUESTION.SELECT_QUESTION_GROUP;

export const getQuestionGroupListSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'questionGroup');
    },
    ({ data }) => {
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'questionGroup');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
