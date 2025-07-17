import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  ddsObjectionDetail: {
    data: {},
    isPending: false,
  },
};

export const ddsObjectionDetailRequest = state => ({
  ...state,
  ddsObjectionDetail: {
    data: {},
    isPending: true,
  },
});

export const ddsObjectionDetailSuccess = (state, { data }) => ({
  ...state,
  ddsObjectionDetail: {
    ...state.ddsObjectionDetail,
    data,
    isPending: false,
  },
});

export const ddsObjectionDetailFailure = state => ({
  ...state,
  ddsObjectionDetail: {
    ...state.ddsObjectionDetail,
    data: {},
    isPending: false,
  },
});

export const acceptDdsObjectionRequest = state => ({
  ...state,
  ddsObjectionDetail: {
    ...state.ddsObjectionDetail,
    isPending: true,
  },
});

export const acceptDdsObjectionFailure = state => ({
  ...state,
  ddsObjectionDetail: {
    ...state.ddsObjectionDetail,
    isPending: false,
  },
});

export const rejectDdsObjectionRequest = state => ({
  ...state,
  ddsObjectionDetail: {
    ...state.ddsObjectionDetail,
    isPending: true,
  },
});

export const rejectDdsObjectionFailure = state => ({
  ...state,
  ddsObjectionDetail: {
    ...state.ddsObjectionDetail,
    isPending: false,
  },
});

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_DDS_OBJECTION_DETAIL_REQUEST]: ddsObjectionDetailRequest,
  [Types.GET_DDS_OBJECTION_DETAIL_SUCCESS]: ddsObjectionDetailSuccess,
  [Types.GET_DDS_OBJECTION_DETAIL_FAILURE]: ddsObjectionDetailFailure,
  [Types.ACCEPT_DDS_OBJECTION_REQUEST]: acceptDdsObjectionRequest,
  [Types.ACCEPT_DDS_OBJECTION_FAILURE]: acceptDdsObjectionFailure,
  [Types.REJECT_DDS_OBJECTION_REQUEST]: rejectDdsObjectionRequest,
  [Types.REJECT_DDS_OBJECTION_FAILURE]: rejectDdsObjectionFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
