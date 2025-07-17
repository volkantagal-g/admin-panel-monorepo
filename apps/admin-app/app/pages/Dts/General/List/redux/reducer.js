import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  dtsList: {
    data: [],
    total: 0,
    isPending: false,
  },
};

export const getDtsListRequest = state => {
  return {
    ...state,
    dtsList: {
      ...state.dtsList,
      isPending: true,
    },
  };
};

export const getDtsListSuccess = (state, { data = [], total = 0 }) => {
  return {
    ...state,
    dtsList: {
      ...state.dtsList,
      data,
      total,
      isPending: false,
    },
  };
};

export const getDtsListFailure = state => {
  return {
    ...state,
    dtsList: {
      ...state.dtsList,
      data: [],
      total: 0,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DTS_LIST_REQUEST]: getDtsListRequest,
  [Types.GET_DTS_LIST_SUCCESS]: getDtsListSuccess,
  [Types.GET_DTS_LIST_FAILURE]: getDtsListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
