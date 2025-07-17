import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PERSONAL_PROMO.LIST;

export const getPersonalPromoSelector = {
  getData: createSelector(
    state => state[reducerKey]?.personalPromo,
    ({ data }) => data?.promosByPromoCode || [],
  ),
  getIsPending: createSelector(
    state => state[reducerKey]?.personalPromo,
    ({ isPending }) => isPending,
  ),
};
