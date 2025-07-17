import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createDtsFeedbackSetting: {
    isPending: false,
    error: null,
  },
};

export const createDtsFeedbackSettingRequest = state => {
  return {
    ...state,
    createDtsFeedbackSetting: {
      ...state.createDtsFeedbackSetting,
      isPending: true,
    },
  };
};

export const createDtsFeedbackSettingSuccess = state => {
  return {
    ...state,
    createDtsFeedbackSetting: {
      ...state.createDtsFeedbackSetting,
      isPending: false,
    },
  };
};

export const createDtsFeedbackSettingFailure = (state, { error }) => {
  return {
    ...state,
    createDtsFeedbackSetting: {
      ...state.createDtsFeedbackSetting,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_DTS_FEEDBACK_SETTING_REQUEST]: createDtsFeedbackSettingRequest,
  [Types.CREATE_DTS_FEEDBACK_SETTING_SUCCESS]: createDtsFeedbackSettingSuccess,
  [Types.CREATE_DTS_FEEDBACK_SETTING_FAILURE]: createDtsFeedbackSettingFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
