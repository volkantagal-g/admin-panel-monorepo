import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SLOT_PLAN_MANAGEMENT}_`;

export const { Types, Creators } = createActions({
  deleteSlotPlansRequest: { minDate: undefined, maxDate: undefined, employeeType: undefined, warehouseIds: undefined },
  deleteSlotPlansSuccess: { data: [] },
  deleteSlotPlansFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
