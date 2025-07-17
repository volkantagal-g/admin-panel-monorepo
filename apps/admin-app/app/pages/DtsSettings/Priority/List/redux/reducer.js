import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dtsPrioritySettingList: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
};

export const getDtsPrioritySettingListRequest = state => {
  return {
    ...state,
    dtsPrioritySettingList: {
      ...state.dtsPrioritySettingList,
      isPending: true,
    },
  };
};

export const getDtsPrioritySettingListSuccess = (state, { data, total }) => {
  return {
    ...state,
    dtsPrioritySettingList: {
      ...state.dtsPrioritySettingList,
      data,
      total,
      isPending: false,
    },
  };
};

export const getDtsPrioritySettingListFailure = (state, { error }) => {
  return {
    ...state,
    dtsPrioritySettingList: {
      ...state.dtsPrioritySettingList,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DTS_PRIORITY_SETTING_LIST_REQUEST]: getDtsPrioritySettingListRequest,
  [Types.GET_DTS_PRIORITY_SETTING_LIST_SUCCESS]: getDtsPrioritySettingListSuccess,
  [Types.GET_DTS_PRIORITY_SETTING_LIST_FAILURE]: getDtsPrioritySettingListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
