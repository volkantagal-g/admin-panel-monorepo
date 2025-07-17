import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dtsPrioritySettingDetail: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getDtsPrioritySettingDetailRequest = state => {
  return {
    ...state,
    dtsPrioritySettingDetail: {
      ...state.dtsPrioritySettingDetail,
      isPending: true,
    },
  };
};

export const getDtsPrioritySettingDetailSuccess = (state, { data }) => {
  return {
    ...state,
    dtsPrioritySettingDetail: {
      ...state.dtsPrioritySettingDetail,
      data,
      isPending: false,
    },
  };
};

export const getDtsPrioritySettingDetailFailure = (state, { error }) => {
  return {
    ...state,
    dtsPrioritySettingDetail: {
      ...state.dtsPrioritySettingDetail,
      isPending: false,
      error,
    },
  };
};

export const updateDtsPrioritySettingDetailRequest = state => {
  return {
    ...state,
    dtsPrioritySettingDetail: {
      ...state.dtsPrioritySettingDetail,
      isPending: true,
    },
  };
};

export const updateDtsPrioritySettingDetailFailure = (state, { error }) => {
  return {
    ...state,
    dtsPrioritySettingDetail: {
      ...state.dtsPrioritySettingDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DTS_PRIORITY_SETTING_DETAIL_REQUEST]: getDtsPrioritySettingDetailRequest,
  [Types.GET_DTS_PRIORITY_SETTING_DETAIL_SUCCESS]: getDtsPrioritySettingDetailSuccess,
  [Types.GET_DTS_PRIORITY_SETTING_DETAIL_FAILURE]: getDtsPrioritySettingDetailFailure,
  [Types.UPDATE_DTS_PRIORITY_SETTING_DETAIL_REQUEST]: updateDtsPrioritySettingDetailRequest,
  [Types.UPDATE_DTS_PRIORITY_SETTING_DETAIL_FAILURE]: updateDtsPrioritySettingDetailFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
