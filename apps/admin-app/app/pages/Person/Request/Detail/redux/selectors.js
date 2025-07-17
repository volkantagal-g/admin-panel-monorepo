import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';
import { getFormattedData } from '../utils';

const reducerKey = REDUX_KEY.PERSON_REQUEST.STATUS.DETAIL;

export const informationEditRequestDetailSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'informationEditRequestDetail');
    },
    ({ data }) => {
      return getFormattedData(data);
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'informationEditRequestDetail');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
