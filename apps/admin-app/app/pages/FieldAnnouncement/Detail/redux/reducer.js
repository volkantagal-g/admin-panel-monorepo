import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  detail: {
    data: {},
    isPending: false,
    error: null,
  },
  updateData: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getAnnouncementDetailRequest = state => {
  return {
    ...state,
    detail: {
      ...state.detail,
      isPending: true,
    },
  };
};

export const getAnnouncementDetailSuccess = (state, { data }) => {
  return {
    ...state,
    detail: {
      ...state.detail,
      data,
      isPending: false,
    },
  };
};

export const getAnnouncementDetailFailure = (state, { error }) => {
  return {
    ...state,
    detail: {
      ...state.detail,
      isPending: false,
      error,
    },
  };
};

export const updateWarehouseAnnouncementDetailRequest = (state, { requestBody }) => {
  return {
    ...state,
    updateData: {
      ...state.updateData,
      data: requestBody,
      isPending: true,
    },
  };
};

export const updateWarehouseAnnouncementDetailSuccess = (state, { data }) => {
  return {
    ...state,
    updateData: {
      ...state.updateData,
      data,
      isPending: false,
    },
  };
};

export const updateWarehouseAnnouncementDetailFailure = (state, { error }) => {
  return {
    ...state,
    updateData: {
      ...state.updateData,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ANNOUNCEMENT_DETAIL_REQUEST]: getAnnouncementDetailRequest,
  [Types.GET_ANNOUNCEMENT_DETAIL_SUCCESS]: getAnnouncementDetailSuccess,
  [Types.GET_ANNOUNCEMENT_DETAIL_FAILURE]: getAnnouncementDetailFailure,
  [Types.UPDATE_WAREHOUSE_ANNOUNCEMENT_DETAIL_REQUEST]: updateWarehouseAnnouncementDetailRequest,
  [Types.UPDATE_WAREHOUSE_ANNOUNCEMENT_DETAIL_SUCCESS]: updateWarehouseAnnouncementDetailSuccess,
  [Types.UPDATE_WAREHOUSE_ANNOUNCEMENT_DETAIL_FAILURE]: updateWarehouseAnnouncementDetailFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
