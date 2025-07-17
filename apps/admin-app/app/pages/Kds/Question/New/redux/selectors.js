import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.KDS.QUESTION.NEW;

export const kdsQuestionSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseSegment');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
