import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dtsFeedbackSettingList: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
};

export const getDtsFeedbackSettingListRequest = state => {
  return {
    ...state,
    dtsFeedbackSettingList: {
      ...state.dtsFeedbackSettingList,
      isPending: true,
    },
  };
};

export const getDtsFeedbackSettingListSuccess = (state, { data, total }) => {
  return {
    ...state,
    dtsFeedbackSettingList: {
      ...state.dtsFeedbackSettingList,
      data,
      total,
      isPending: false,
    },
  };
};

export const getDtsFeedbackSettingListFailure = (state, { error }) => {
  return {
    ...state,
    dtsFeedbackSettingList: {
      ...state.dtsFeedbackSettingList,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DTS_FEEDBACK_SETTING_LIST_REQUEST]: getDtsFeedbackSettingListRequest,
  [Types.GET_DTS_FEEDBACK_SETTING_LIST_SUCCESS]: getDtsFeedbackSettingListSuccess,
  [Types.GET_DTS_FEEDBACK_SETTING_LIST_FAILURE]: getDtsFeedbackSettingListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
