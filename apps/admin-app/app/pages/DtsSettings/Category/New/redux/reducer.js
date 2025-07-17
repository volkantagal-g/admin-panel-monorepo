import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createDtsCategorySetting: {
    isPending: false,
    error: null,
  },
};

export const createDtsCategorySettingRequest = state => {
  return {
    ...state,
    createDtsCategorySetting: {
      ...state.createDtsCategorySetting,
      isPending: true,
    },
  };
};

export const createDtsCategorySettingSuccess = state => {
  return {
    ...state,
    createDtsCategorySetting: {
      ...state.createDtsCategorySetting,
      isPending: false,
    },
  };
};

export const createDtsCategorySettingFailure = (state, { error }) => {
  return {
    ...state,
    createDtsCategorySetting: {
      ...state.createDtsCategorySetting,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_DTS_CATEGORY_SETTING_REQUEST]: createDtsCategorySettingRequest,
  [Types.CREATE_DTS_CATEGORY_SETTING_SUCCESS]: createDtsCategorySettingSuccess,
  [Types.CREATE_DTS_CATEGORY_SETTING_FAILURE]: createDtsCategorySettingFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
