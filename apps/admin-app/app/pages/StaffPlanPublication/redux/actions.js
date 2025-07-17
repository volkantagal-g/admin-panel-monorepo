import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

import { COURIER_PLAN_TYPE_KEYS } from '../constants';

export const { Types, Creators } = createActions(
  {
    publishCourierPlanRequest: { courierPlans: [] },
    publishCourierPlanSuccess: null,
    publishCourierPlanFailure: { error: null },
    updateCourierPlanType: { planType: COURIER_PLAN_TYPE_KEYS.STANDARD },
    publishStoreAssistantPlanRequest: { file: null, timezone: '' },
    publishStoreAssistantPlanSuccess: null,
    publishStoreAssistantPlanFailure: { error: null },
    exportCourierSlotCapacityExcelRequest: {
      startDate: undefined,
      endDate: undefined,
    },
    exportCourierSlotCapacityExcelSuccess: null,
    exportCourierSlotCapacityExcelFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.STAFF_PLAN_PUBLICATION}_` },
);
