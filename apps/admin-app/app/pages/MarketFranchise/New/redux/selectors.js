import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.NEW;

export const formDataSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'form');
    },
    ({ data }) => {
      return data;
    }
  ),
};