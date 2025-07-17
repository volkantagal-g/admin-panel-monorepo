import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PROMO.PERSONAL_DETAIL;

export const personalPromoSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state?.personalPromo?.data || {},
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.personalPromo?.isPending || false,
  ),
};
