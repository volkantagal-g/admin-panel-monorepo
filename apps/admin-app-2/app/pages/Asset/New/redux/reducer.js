import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createAsset: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createAssetRequest = state => {
  return {
    ...state,
    createAsset: {
      ...INITIAL_STATE.createAsset,
      isPending: true,
    },
  };
};

export const createAssetSuccess = (state, { data }) => {
  return {
    ...state,
    createAsset: {
      ...INITIAL_STATE.createAsset,
      data,
      isPending: false,
    },
  };
};

export const createAssetFailure = (state, { error }) => {
  return {
    ...state,
    createAsset: {
      ...INITIAL_STATE.createAsset,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_ASSET_REQUEST]: createAssetRequest,
  [Types.CREATE_ASSET_SUCCESS]: createAssetSuccess,
  [Types.CREATE_ASSET_FAILURE]: createAssetFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
