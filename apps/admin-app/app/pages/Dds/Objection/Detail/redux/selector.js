import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';
import { getFormattedData } from '../utils';

const reducerKey = REDUX_KEY.DDS.OBJECTION.DETAIL;

export const ddsObjectionDetailSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'ddsObjectionDetail');
    },
    ({ data }) => {
      return getFormattedData(data);
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'ddsObjectionDetail');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
