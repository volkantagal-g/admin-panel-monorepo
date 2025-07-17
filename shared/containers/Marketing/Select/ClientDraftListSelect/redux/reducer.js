import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  data: [],
  error: null,
};

export const getClientDraftsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getClientDraftsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,
  };
};

export const getClientDraftsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

export const getClientDraftDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getClientDraftDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data: [...state.data, data],
    isPending: false,
  };
};

export const getClientDraftDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CLIENT_DRAFTS_REQUEST]: getClientDraftsRequest,
  [Types.GET_CLIENT_DRAFTS_SUCCESS]: getClientDraftsSuccess,
  [Types.GET_CLIENT_DRAFTS_FAILURE]: getClientDraftsFailure,

  [Types.GET_CLIENT_DRAFT_DETAIL_REQUEST]: getClientDraftDetailRequest,
  [Types.GET_CLIENT_DRAFT_DETAIL_SUCCESS]: getClientDraftDetailSuccess,
  [Types.GET_CLIENT_DRAFT_DETAIL_FAILURE]: getClientDraftDetailFailure,

  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
