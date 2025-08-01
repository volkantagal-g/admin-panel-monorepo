import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isFirstAssetLoadDone: false,
  asset: {
    data: null,
    isPending: null,
  },
  assignAssetRequest: { isPending: false },
  unassignAssetRequest: { isPending: false },
};

const getAssetByIdRequest = (state: any) => {
  return {
    ...state,
    asset: { isPending: true },
  };
};
const getAssetByIdSuccess = (state: any, { asset }:{ asset: Asset }) => {
  return {
    ...state,
    isFirstAssetLoadDone: true,
    asset: {
      data: asset,
      isPending: false,
    },
  };
};
const getAssetByIdFailure = (state: any) => {
  return {
    ...state,
    asset: { isPending: false },
  };
};

const updateAssetRequest = (state: any) => {
  return {
    ...state,
    asset: { isPending: true },
  };
};
const updateAssetSuccess = (state: any, { asset }:{ asset: Asset }) => ({
  ...state,
  asset: {
    data: asset,
    isPending: false,
  },
});
const updateAssetFailure = (state: any) => ({
  ...state,
  asset: { isPending: false },
});

const assignAssetRequest = (state: any) => {
  return {
    ...state,
    assignAssetRequest: {
      ...state.assignAssetRequest,
      isPending: true,
    },
  };
};
const assignAssetSuccess = (state: any) => ({
  ...state,
  assignAssetRequest: {
    ...state.assignAssetRequest,
    isPending: false,
  },
});
const assignAssetFailure = (state: any) => ({
  ...state,
  assignAssetRequest: {
    ...state.assignAssetRequest,
    isPending: false,
  },
});

const unassignAssetRequest = (state: any) => {
  return {
    ...state,
    unassignAssetRequest: {
      ...state.unassignAssetRequest,
      isPending: true,
    },
  };
};
const unassignAssetSuccess = (state: any) => ({
  ...state,
  unassignAssetRequest: {
    ...state.unassignAssetRequest,
    isPending: false,
  },
});
const unassignAssetFailure = (state: any) => ({
  ...state,
  unassignAssetRequest: {
    ...state.unassignAssetRequest,
    isPending: false,
  },
});

const initPage = () => ({ ...INITIAL_STATE });
const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_ASSET_BY_ID_REQUEST]: getAssetByIdRequest,
  [Types.GET_ASSET_BY_ID_SUCCESS]: getAssetByIdSuccess,
  [Types.GET_ASSET_BY_ID_FAILURE]: getAssetByIdFailure,

  [Types.UPDATE_ASSET_REQUEST]: updateAssetRequest,
  [Types.UPDATE_ASSET_SUCCESS]: updateAssetSuccess,
  [Types.UPDATE_ASSET_FAILURE]: updateAssetFailure,

  [Types.ASSIGN_ASSET_REQUEST]: assignAssetRequest,
  [Types.ASSIGN_ASSET_SUCCESS]: assignAssetSuccess,
  [Types.ASSIGN_ASSET_FAILURE]: assignAssetFailure,

  [Types.UNASSIGN_ASSET_REQUEST]: unassignAssetRequest,
  [Types.UNASSIGN_ASSET_SUCCESS]: unassignAssetSuccess,
  [Types.UNASSIGN_ASSET_FAILURE]: unassignAssetFailure,

  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
