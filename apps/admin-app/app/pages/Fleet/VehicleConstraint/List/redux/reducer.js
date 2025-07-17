import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  vehicleConstraintList: {
    data: [],
    isPending: false,
  },
};

export const getVehicleConstraintListRequest = state => {
  return {
    ...state,
    vehicleConstraintList: {
      ...state.vehicleConstraintList,
      isPending: true,
    },
  };
};

export const getVehicleConstraintListSuccess = (state, { data = { vehicleConstraints: [], totalCount: 0 } }) => {
  return {
    ...state,
    vehicleConstraintList: {
      ...state.vehicleConstraintList,
      data,
      isPending: false,
    },
  };
};

export const getVehicleConstraintListFailure = state => {
  return {
    ...state,
    vehicleConstraintList: {
      ...state.vehicleConstraintList,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_VEHICLE_CONSTRAINT_LIST_REQUEST]: getVehicleConstraintListRequest,
  [Types.GET_VEHICLE_CONSTRAINT_LIST_SUCCESS]: getVehicleConstraintListSuccess,
  [Types.GET_VEHICLE_CONSTRAINT_LIST_FAILURE]: getVehicleConstraintListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
