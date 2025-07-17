import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  ddsObjectionList: {
    data: [],
    total: 0,
    isPending: false,
  },
};

export const ddsObjectionListRequest = state => {
  return {
    ...state,
    ddsObjectionList: {
      ...state.ddsObjectionList,
      isPending: true,
    },
  };
};

export const ddsObjectionListSuccess = (state, { data = [], total = 0 }) => {
  return {
    ...state,
    ddsObjectionList: {
      ...state.ddsObjectionList,
      data,
      total,
      isPending: false,
    },
  };
};

export const ddsObjectionListFailure = state => {
  return {
    ...state,
    ddsObjectionList: {
      ...state.ddsObjectionList,
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
  [Types.GET_DDS_OBJECTION_LIST_REQUEST]: ddsObjectionListRequest,
  [Types.GET_DDS_OBJECTION_LIST_SUCCESS]: ddsObjectionListSuccess,
  [Types.GET_DDS_OBJECTION_LIST_FAILURE]: ddsObjectionListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
