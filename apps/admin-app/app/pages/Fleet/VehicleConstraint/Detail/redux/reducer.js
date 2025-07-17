import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getVehicleConstraint: {
    data: {},
    isPending: false,
  },
  updateVehicleConstraint: { isPending: false },
  changeVehicleConstraintActiveness: {
    isPending: false,
    error: null,
  },
};

export const getVehicleConstraintRequest = state => {
  return {
    ...state,
    getVehicleConstraint: {
      ...state.getVehicleConstraint,
      isPending: true,
    },
  };
};

export const getVehicleConstraintSuccess = (state, { data = {} }) => {
  return {
    ...state,
    getVehicleConstraint: {
      ...state.getVehicleConstraint,
      data,
      isPending: false,
    },
  };
};

export const getVehicleConstraintFailure = state => {
  return {
    ...state,
    getVehicleConstraint: {
      ...state.getVehicleConstraint,
      isPending: false,
    },
  };
};

export const updateVehicleConstraintRequest = state => {
  return {
    ...state,
    updateVehicleConstraint: {
      ...state.updateVehicleConstraint,
      isPending: true,
    },
  };
};

export const updateVehicleConstraintSuccess = state => {
  return {
    ...state,
    updateVehicleConstraint: {
      ...state.updateVehicleConstraint,
      isPending: false,
    },
  };
};

export const updateVehicleConstraintFailure = state => {
  return {
    ...state,
    updateVehicleConstraint: {
      ...state.updateVehicleConstraint,
      isPending: false,
    },
  };
};

export const changeVehicleConstraintActivenessRequest = state => {
  return {
    ...state,
    changeVehicleConstraintActiveness: {
      ...state.changeVehicleConstraintActiveness,
      isPending: true,
    },
  };
};

export const changeVehicleConstraintActivenessSuccess = state => {
  return {
    ...state,
    changeVehicleConstraintActiveness: {
      ...state.changeVehicleConstraintActiveness,
      isPending: false,
    },
  };
};

export const changeVehicleConstraintActivenessFailure = (state, { error }) => {
  return {
    ...state,
    changeVehicleConstraintActiveness: {
      ...state.changeVehicleConstraintActiveness,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_VEHICLE_CONSTRAINT_REQUEST]: getVehicleConstraintRequest,
  [Types.GET_VEHICLE_CONSTRAINT_SUCCESS]: getVehicleConstraintSuccess,
  [Types.GET_VEHICLE_CONSTRAINT_FAILURE]: getVehicleConstraintFailure,
  [Types.UPDATE_VEHICLE_CONSTRAINT_REQUEST]: updateVehicleConstraintRequest,
  [Types.UPDATE_VEHICLE_CONSTRAINT_SUCCESS]: updateVehicleConstraintSuccess,
  [Types.UPDATE_VEHICLE_CONSTRAINT_FAILURE]: updateVehicleConstraintFailure,
  [Types.CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_REQUEST]: changeVehicleConstraintActivenessRequest,
  [Types.CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_SUCCESS]: changeVehicleConstraintActivenessSuccess,
  [Types.CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_FAILURE]: changeVehicleConstraintActivenessFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
