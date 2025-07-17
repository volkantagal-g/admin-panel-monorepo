import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export type State = {
  assignees: {
    isPending: boolean;
    data: any;
    error: Error | Object | undefined;
  },
  updateAssetHistory: {
    isPending: boolean;
    error: Error | Object | undefined;
  }
}

export const INITIAL_STATE: State = {
  assignees: {
    isPending: false,
    data: [],
    error: undefined,
  },
  updateAssetHistory: {
    isPending: false,
    error: undefined,
  },
};

export const getAssigneesRequest = (state: State) => {
  return {
    ...state,
    assignees: {
      ...state.assignees,
      data: [],
      isPending: true,
    },
  };
};

export const getAssigneesSuccess = (state: State, { data }: {data: []}) => {
  return {
    ...state,
    assignees: {
      ...state.assignees,
      isPending: false,
      data,
    },
  };
};

export const getAssigneesFailure = (state: State, { error }: {error: Error }) => {
  return {
    ...state,
    assignees: {
      ...state.assignees,
      isPending: false,
      error,
    },
  };
};

export const updateAssetHistoryRequest = (state: State) => {
  return {
    ...state,
    updateAssetHistory: {
      ...state.updateAssetHistory,
      isPending: true,
    },
  };
};

export const updateAssetHistorySuccess = (state: State, { data }: {data: []}) => {
  return {
    ...state,
    updateAssetHistory: {
      ...state.updateAssetHistory,
      isPending: false,
    },
  };
};

export const updateAssetHistoryFailure = (state: State, { error }: {error: Error }) => {
  return {
    ...state,
    updateAssetHistory: {
      ...state.updateAssetHistory,
      isPending: false,
      error,
    },
  };
};

export const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_ASSIGNEES_REQUEST]: getAssigneesRequest,
  [Types.GET_ASSIGNEES_SUCCESS]: getAssigneesSuccess,
  [Types.GET_ASSIGNEES_FAILURE]: getAssigneesFailure,
  [Types.UPDATE_ASSET_HISTORY_REQUEST]: updateAssetHistoryRequest,
  [Types.UPDATE_ASSET_HISTORY_SUCCESS]: updateAssetHistorySuccess,
  [Types.UPDATE_ASSET_HISTORY_FAILURE]: updateAssetHistoryFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
