import { createSelector } from 'reselect';
import { get } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COURIER_PLAN.NEW;

export const formDataSelector = {
  getData: createSelector(
    state => get(state, [reducerKey, 'form']),
    ({ data }) => data,
  ),
  getIsPending: createSelector(
    state => get(state, [reducerKey, 'form']),
    ({ isPending }) => isPending,
  ),
};
