import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.PERSON_REQUEST.STATUS.LIST;

export const informationEditRequestListSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'informationEditRequestList');
    },
    ({ data }) => {
      return data;
    }
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'informationEditRequestList');
    },
    ({ total }) => {
      return total;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'informationEditRequestList');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
