import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createVehicleConstraint: { isPending: false },
  getVehicleConstraints: {
    data: [],
    isPending: false,
  },
};

export const createVehicleConstraintRequest = state => {
  return {
    ...state,
    createVehicleConstraint: {
      ...state.createVehicleConstraint,
      isPending: true,
    },
  };
};

export const createVehicleConstraintSuccess = state => {
  return {
    ...state,
    createVehicleConstraint: {
      ...state.createVehicleConstraint,
      isPending: false,
    },
  };
};

export const createVehicleConstraintFailure = state => {
  return {
    ...state,
    createVehicleConstraint: {
      ...state.createVehicleConstraint,
      isPending: false,
    },
  };
};

export const getVehicleConstraintsRequest = state => {
  return {
    ...state,
    getVehicleConstraints: {
      ...state.getVehicleConstraints,
      isPending: true,
    },
  };
};

export const getVehicleConstraintsSuccess = (state, { data = [] }) => {
  return {
    ...state,
    getVehicleConstraints: {
      ...state.getVehicleConstraints,
      data,
      isPending: false,
    },
  };
};

export const getVehicleConstraintsFailure = state => {
  return {
    ...state,
    getVehicleConstraints: {
      ...state.getVehicleConstraints,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_VEHICLE_CONSTRAINT_REQUEST]: createVehicleConstraintRequest,
  [Types.CREATE_VEHICLE_CONSTRAINT_SUCCESS]: createVehicleConstraintSuccess,
  [Types.CREATE_VEHICLE_CONSTRAINT_FAILURE]: createVehicleConstraintFailure,
  [Types.GET_VEHICLE_CONSTRAINTS_REQUEST]: getVehicleConstraintsRequest,
  [Types.GET_VEHICLE_CONSTRAINTS_SUCCESS]: getVehicleConstraintsSuccess,
  [Types.GET_VEHICLE_CONSTRAINTS_FAILURE]: getVehicleConstraintsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
