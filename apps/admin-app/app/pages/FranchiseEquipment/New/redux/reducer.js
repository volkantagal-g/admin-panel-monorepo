import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createFranchiseEquipment: {
    isPending: false,
    error: null,
  },
};

export const createFranchiseEquipmentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createFranchiseEquipment: {
      ...state.createFranchiseEquipment,
      isPending: true,
    },
  };
};

export const createFranchiseEquipmentSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    createFranchiseEquipment: {
      ...state.createFranchiseEquipment,
      isPending: false,
    },
  };
};

export const createFranchiseEquipmentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createFranchiseEquipment: {
      ...state.createFranchiseEquipment,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_FRANCHISE_EQUIPMENT_REQUEST]: createFranchiseEquipmentRequest,
  [Types.CREATE_FRANCHISE_EQUIPMENT_SUCCESS]: createFranchiseEquipmentSuccess,
  [Types.CREATE_FRANCHISE_EQUIPMENT_FAILURE]: createFranchiseEquipmentFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);