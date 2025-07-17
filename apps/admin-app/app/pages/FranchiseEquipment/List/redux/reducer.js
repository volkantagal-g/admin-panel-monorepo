import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseEquipmentList: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const franchiseEquipmentListRequest = state => {
  return {
    ...state,
    franchiseEquipmentList: {
      ...state.franchiseEquipmentList,
      isPending: true,
    },
  };
};

export const franchiseEquipmentListSuccess = (state, { data = [] }) => {
  return {
    ...state,
    franchiseEquipmentList: {
      ...state.franchiseEquipmentList,
      data,
      isPending: false,
    },
  };
};

export const franchiseEquipmentListFailure = (state, { error }) => {
  return {
    ...state,
    franchiseEquipmentList: {
      ...state.franchiseEquipmentList,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_EQUIPMENT_LIST_REQUEST]: franchiseEquipmentListRequest,
  [Types.GET_FRANCHISE_EQUIPMENT_LIST_SUCCESS]: franchiseEquipmentListSuccess,
  [Types.GET_FRANCHISE_EQUIPMENT_LIST_FAILURE]: franchiseEquipmentListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
