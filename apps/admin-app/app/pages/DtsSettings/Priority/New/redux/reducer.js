import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createDtsPrioritySetting: {
    isPending: false,
    error: null,
  },
};

export const createDtsPrioritySettingRequest = state => {
  return {
    ...state,
    createDtsPrioritySetting: {
      ...state.createDtsPrioritySetting,
      isPending: true,
    },
  };
};

export const createDtsPrioritySettingFailure = (state, { error }) => {
  return {
    ...state,
    createDtsPrioritySetting: {
      ...state.createDtsPrioritySetting,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_DTS_PRIORITY_SETTING_REQUEST]: createDtsPrioritySettingRequest,
  [Types.CREATE_DTS_PRIORITY_SETTING_FAILURE]: createDtsPrioritySettingFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
