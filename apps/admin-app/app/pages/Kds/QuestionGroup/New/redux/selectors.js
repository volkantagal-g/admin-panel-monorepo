import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.KDS.QUESTION_GROUP.NEW;

export const createKdsQuestionGroupSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createKdsQuestionGroup');
    },
    ({ isPending }) => {
      return isPending;
    }),
};