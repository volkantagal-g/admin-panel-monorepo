import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.SELECT.DDS_CRITERIA;

export const getDdsCriteriaSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'ddsCriteria');
    },
    ({ data }) => {
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'ddsCriteria');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
