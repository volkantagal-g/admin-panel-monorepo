import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dtsFeedbackSettingDetail: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getDtsFeedbackSettingDetailRequest = state => {
  return {
    ...state,
    dtsFeedbackSettingDetail: {
      ...state.dtsFeedbackSettingDetail,
      isPending: true,
    },
  };
};

export const getDtsFeedbackSettingDetailSuccess = (state, { data }) => {
  return {
    ...state,
    dtsFeedbackSettingDetail: {
      ...state.dtsFeedbackSettingDetail,
      data,
      isPending: false,
    },
  };
};

export const getDtsFeedbackSettingDetailFailure = (state, { error }) => {
  return {
    ...state,
    dtsFeedbackSettingDetail: {
      ...state.dtsFeedbackSettingDetail,
      isPending: false,
      error,
    },
  };
};

export const updateDtsFeedbackSettingDetailRequest = state => {
  return {
    ...state,
    dtsFeedbackSettingDetail: {
      ...state.dtsFeedbackSettingDetail,
      isPending: true,
    },
  };
};

export const updateDtsCategorySettingDetailFailure = (state, { error }) => {
  return {
    ...state,
    dtsFeedbackSettingDetail: {
      ...state.dtsFeedbackSettingDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DTS_FEEDBACK_SETTING_DETAIL_REQUEST]: getDtsFeedbackSettingDetailRequest,
  [Types.GET_DTS_FEEDBACK_SETTING_DETAIL_SUCCESS]: getDtsFeedbackSettingDetailSuccess,
  [Types.GET_DTS_FEEDBACK_SETTING_DETAIL_FAILURE]: getDtsFeedbackSettingDetailFailure,
  [Types.UPDATE_DTS_FEEDBACK_SETTING_DETAIL_REQUEST]: updateDtsFeedbackSettingDetailRequest,
  [Types.UPDATE_DTS_FEEDBACK_SETTING_DETAIL_FAILURE]: updateDtsCategorySettingDetailFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
