import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  deleteSlotPlans: {
    isPending: false,
    data: [],
  },
};

const deleteSlotPlansRequest = state => ({
  ...state,
  deleteSlotPlans: {
    ...state.deleteSlotPlans,
    isPending: true,
    data: [],
  },
});

const deleteSlotPlansSuccess = (state, { data }) => ({
  ...state,
  deleteSlotPlans: {
    ...state.deleteSlotPlans,
    isPending: false,
    data,
  },
});

const deleteSlotPlansFailure = state => ({
  ...state,
  deleteSlotPlans: {
    ...state.deleteSlotPlans,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.DELETE_SLOT_PLANS_REQUEST]: deleteSlotPlansRequest,
  [Types.DELETE_SLOT_PLANS_SUCCESS]: deleteSlotPlansSuccess,
  [Types.DELETE_SLOT_PLANS_FAILURE]: deleteSlotPlansFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
