import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.STAFF_PLAN_PUBLICATION;

export const publishSelector = {
  publishIsPending: createSelector(
    state => state?.[reducerKey]?.response,
    ({ isPending }) => isPending,
  ),
};

export const courierPlanTypeSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.planType,
    planType => planType,
  ),
};

export const storeAssistantSelector = {
  isPublishPending: createSelector(
    state => state?.[reducerKey]?.response,
    ({ isPending }) => isPending,
  ),
};

export const courierSlotCapacityExcelSelector = { getIsPending: state => state[reducerKey]?.courierSlotCapacityExcel.isPending };
