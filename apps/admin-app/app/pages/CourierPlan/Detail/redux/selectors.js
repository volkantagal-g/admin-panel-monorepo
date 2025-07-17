import { get } from 'lodash';
import { createSelector } from 'reselect';

import { formatCourierPlanDetails } from '../../utils';
import reducerKey from './key';

export const courierPlanSelector = t => ({
  getData: createSelector(
    state => get(state, [reducerKey, 'plan']),
    ({ data }) => formatCourierPlanDetails({ plan: data, t }),
  ),
  getIsPending: createSelector(
    state => get(state, [reducerKey, 'plan']),
    ({ isPending }) => isPending,
  ),
});
