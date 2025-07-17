import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  assetType: {
    data: null,
    isPending: false,
  },
  createAsset: {
    isPending: false,
    error: null,
  },
};

const getAssetTypeByIdRequest = (state: any) => {
  return {
    ...INITIAL_STATE,
    assetType: { isPending: true },
  };
};

const getAssetTypeByIdSuccess = (state: any, { assetType }:{ assetType: AssetType }) => {
  return {
    ...INITIAL_STATE,
    assetType: {
      data: assetType,
      isPending: false,
    },
  };
};

const getAssetTypeByIdFailure = (state: any) => {
  return {
    ...INITIAL_STATE,
    assetType: { isPending: false },
  };
};

const createAssetRequest = (state: any) => {
  return {
    ...state,
    createAsset: { isPending: true },
  };
};

const createAssetSuccess = (state: any) => {
  return {
    ...state,
    createAsset: { isPending: false },
  };
};

const createAssetFailure = (state: any) => {
  return {
    ...state,
    createAsset: { isPending: false },
  };
};

const initPage = () => ({ ...INITIAL_STATE });

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_ASSET_TYPE_BY_ID_REQUEST]: getAssetTypeByIdRequest,
  [Types.GET_ASSET_TYPE_BY_ID_SUCCESS]: getAssetTypeByIdSuccess,
  [Types.GET_ASSET_TYPE_BY_ID_FAILURE]: getAssetTypeByIdFailure,

  [Types.CREATE_ASSET_REQUEST]: createAssetRequest,
  [Types.CREATE_ASSET_SUCCESS]: createAssetSuccess,
  [Types.CREATE_ASSET_FAILURE]: createAssetFailure,

  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
