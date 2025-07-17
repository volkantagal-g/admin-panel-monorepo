import { get } from 'lodash';
import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getFormattedCourierPlanDetails } from '../../utils';

const reducerKey = REDUX_KEY.COURIER_PLAN.LIST;

export const courierPlansSelector = {
  getData: createSelector(
    state => get(state, [reducerKey, 'records']),
    ({ data }) => getFormattedCourierPlanDetails(data),
  ),
  getTotal: createSelector(
    state => get(state, [reducerKey, 'records']),
    ({ totalCount }) => totalCount,
  ),
  getIsPending: createSelector(
    state => get(state, [reducerKey, 'records']),
    ({ isPending }) => isPending,
  ),
};

export const deleteCourierPlanSelector = {
  getIsPending: createSelector(
    state => get(state, [reducerKey, 'recordDeletion']),
    ({ isPending }) => isPending,
  ),
};
