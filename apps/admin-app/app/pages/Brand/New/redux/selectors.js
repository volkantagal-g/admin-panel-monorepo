import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BRAND.NEW;

export const createBrandSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createBrand');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};
