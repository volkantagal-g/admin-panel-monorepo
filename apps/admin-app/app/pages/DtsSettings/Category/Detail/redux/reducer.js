import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dtsCategorySettingDetail: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getDtsCategorySettingDetailRequest = state => {
  return {
    ...state,
    dtsCategorySettingDetail: {
      ...state.dtsCategorySettingDetail,
      isPending: true,
    },
  };
};

export const getDtsCategorySettingDetailSuccess = (state, { data }) => {
  return {
    ...state,
    dtsCategorySettingDetail: {
      ...state.dtsCategorySettingDetail,
      data,
      isPending: false,
    },
  };
};

export const getDtsCategorySettingDetailFailure = (state, { error }) => {
  return {
    ...state,
    dtsCategorySettingDetail: {
      ...state.dtsCategorySettingDetail,
      isPending: false,
      error,
    },
  };
};

export const updateDtsCategorySettingDetailRequest = state => {
  return {
    ...state,
    dtsCategorySettingDetail: {
      ...state.dtsCategorySettingDetail,
      isPending: true,
    },
  };
};

export const updateDtsCategorySettingDetailFailure = (state, { error }) => {
  return {
    ...state,
    dtsCategorySettingDetail: {
      ...state.dtsCategorySettingDetail,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DTS_CATEGORY_SETTING_DETAIL_REQUEST]: getDtsCategorySettingDetailRequest,
  [Types.GET_DTS_CATEGORY_SETTING_DETAIL_SUCCESS]: getDtsCategorySettingDetailSuccess,
  [Types.GET_DTS_CATEGORY_SETTING_DETAIL_FAILURE]: getDtsCategorySettingDetailFailure,
  [Types.UPDATE_DTS_CATEGORY_SETTING_DETAIL_REQUEST]: updateDtsCategorySettingDetailRequest,
  [Types.UPDATE_DTS_CATEGORY_SETTING_DETAIL_FAILURE]: updateDtsCategorySettingDetailFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
