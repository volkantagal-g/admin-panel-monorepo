import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.SLOT_PLAN_MANAGEMENT;

export const deleteSlotPlansSelector = { getIsPending: state => state[reduxKey]?.deleteSlotPlans.isPending };
