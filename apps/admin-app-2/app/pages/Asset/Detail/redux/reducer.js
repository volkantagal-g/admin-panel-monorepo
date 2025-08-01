import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  assetDetail: {
    isPending: false,
    data: {},
    error: null,
  },
  updateAsset: {
    isPending: false,
    data: {},
    error: null,
  },
  assetHistory: {
    isPending: false,
    data: [],
    nextPageCursor: undefined,
    previousPageCursor: undefined,
    error: null,
  },
  assetRepairHistory: {
    isPending: false,
    data: [],
    error: null,
  },
  assetChangeEventInfo: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const assetDetailRequest = state => {
  return {
    ...state,
    assetDetail: {
      ...INITIAL_STATE.assetDetail,
      isPending: true,
    },
  };
};

export const assetDetailSuccess = (state, { data }) => {
  return {
    ...state,
    assetDetail: {
      ...INITIAL_STATE.assetDetail,
      data,
      isPending: false,
    },
  };
};

export const assetDetailFailure = (state, { error }) => {
  return {
    ...state,
    assetDetail: {
      ...INITIAL_STATE.assetDetail,
      isPending: false,
      error,
    },
  };
};

export const updateAssetRequest = state => {
  return {
    ...state,
    updateAsset: {
      ...INITIAL_STATE.updateAsset,
      isPending: true,
    },
  };
};

export const updateAssetSuccess = (state, { data }) => {
  return {
    ...state,
    updateAsset: {
      ...INITIAL_STATE.updateAsset,
      data,
      isPending: false,
    },
  };
};

export const updateAssetFailure = (state, { error }) => {
  return {
    ...state,
    updateAsset: {
      ...INITIAL_STATE.updateAsset,
      isPending: false,
      error,
    },
  };
};

export const assetHistoryRequest = state => {
  return {
    ...state,
    assetHistory: {
      ...INITIAL_STATE.assetHistory,
      isPending: true,
    },
  };
};

export const assetHistorySuccess = (state, { data, nextPageCursor, previousPageCursor }) => {
  return {
    ...state,
    assetHistory: {
      ...INITIAL_STATE.assetHistory,
      data,
      nextPageCursor,
      previousPageCursor,
      isPending: false,
    },
  };
};

export const assetHistoryFailure = (state, { error }) => {
  return {
    ...state,
    assetHistory: {
      ...INITIAL_STATE.assetHistory,
      isPending: false,
      error,
    },
  };
};

export const getAssetRepairHistoryRequest = state => {
  return {
    ...state,
    assetRepairHistory: {
      ...INITIAL_STATE.assetRepairHistory,
      isPending: true,
    },
  };
};

export const getAssetRepairHistorySuccess = (state, { data }) => {
  return {
    ...state,
    assetRepairHistory: {
      ...INITIAL_STATE.assetRepairHistory,
      data,
      isPending: false,
    },
  };
};

export const getAssetRepairHistoryFailure = (state, { error }) => {
  return {
    ...state,
    assetRepairHistory: {
      ...INITIAL_STATE.assetRepairHistory,
      isPending: false,
      error,
    },
  };
};

export const getAssetChangeEventInfoRequest = state => {
  return {
    ...state,
    assetChangeEventInfo: {
      ...INITIAL_STATE.assetChangeEventInfo,
      isPending: true,
    },
  };
};

export const getAssetChangeEventInfoSuccess = (state, { data }) => {
  return {
    ...state,
    assetChangeEventInfo: {
      ...INITIAL_STATE.assetChangeEventInfo,
      data,
      isPending: false,
    },
  };
};

export const getAssetChangeEventInfoFailure = (state, { error }) => {
  return {
    ...state,
    assetChangeEventInfo: {
      ...INITIAL_STATE.assetChangeEventInfo,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {

  [Types.UPDATE_ASSET_REQUEST]: updateAssetRequest,
  [Types.UPDATE_ASSET_SUCCESS]: updateAssetSuccess,
  [Types.UPDATE_ASSET_FAILURE]: updateAssetFailure,

  [Types.ASSET_DETAIL_REQUEST]: assetDetailRequest,
  [Types.ASSET_DETAIL_SUCCESS]: assetDetailSuccess,
  [Types.ASSET_DETAIL_FAILURE]: assetDetailFailure,

  [Types.ASSET_HISTORY_REQUEST]: assetHistoryRequest,
  [Types.ASSET_HISTORY_SUCCESS]: assetHistorySuccess,
  [Types.ASSET_HISTORY_FAILURE]: assetHistoryFailure,

  [Types.GET_ASSET_REPAIR_HISTORY_REQUEST]: getAssetRepairHistoryRequest,
  [Types.GET_ASSET_REPAIR_HISTORY_SUCCESS]: getAssetRepairHistorySuccess,
  [Types.GET_ASSET_REPAIR_HISTORY_FAILURE]: getAssetRepairHistoryFailure,

  [Types.GET_ASSET_CHANGE_EVENT_INFO_REQUEST]: getAssetChangeEventInfoRequest,
  [Types.GET_ASSET_CHANGE_EVENT_INFO_SUCCESS]: getAssetChangeEventInfoSuccess,
  [Types.GET_ASSET_CHANGE_EVENT_INFO_FAILURE]: getAssetChangeEventInfoFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
