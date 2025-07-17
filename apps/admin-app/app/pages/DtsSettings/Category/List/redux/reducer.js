import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dtsCategorySettingList: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
};

export const getDtsCategorySettingListRequest = state => {
  return {
    ...state,
    dtsCategorySettingList: {
      ...state.dtsCategorySettingList,
      isPending: true,
    },
  };
};

export const getDtsCategorySettingListSuccess = (state, { data, total }) => {
  return {
    ...state,
    dtsCategorySettingList: {
      ...state.dtsCategorySettingList,
      data,
      total,
      isPending: false,
    },
  };
};

export const getDtsCategorySettingListFailure = (state, { error }) => {
  return {
    ...state,
    dtsCategorySettingList: {
      ...state.dtsCategorySettingList,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DTS_CATEGORY_SETTING_LIST_REQUEST]: getDtsCategorySettingListRequest,
  [Types.GET_DTS_CATEGORY_SETTING_LIST_SUCCESS]: getDtsCategorySettingListSuccess,
  [Types.GET_DTS_CATEGORY_SETTING_LIST_FAILURE]: getDtsCategorySettingListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
