import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const defaultFilters = {
  startDate: null,
  endDate: null,
  uniqueIdentifier: null,
  userId: null,
  pagination: {
    currentPage: 1,
    rowsPerPage: 10,
    total: 0,
  },
};

export const INITIAL_STATE = {
  assetLogComponents: {
    data: [],
    isPending: false,
  },
  filteredLogs: {
    data: [],
    totalCount: 0,
    isPending: false,
  },
  filters: defaultFilters,
};

export type State = {
  assetLogComponents: {
    data: any;
    isPending: boolean;
  }
  filteredLogs: {
    data: Asset[];
    totalCount: number;
    isPending: boolean;
  };
  filters: LogFilterData;
};

const getAssetLogComponentsRequest = (state: State) => {
  return {
    ...state,
    assetLogComponents: {
      ...state.assetLogComponents,
      isPending: true,
    },
  };
};

const getAssetLogComponentsSuccess = (state: State, { assetLogComponents }: { assetLogComponents: Asset[] }) => {
  return {
    ...state,
    assetLogComponents: {
      data: assetLogComponents,
      isPending: false,
    },
  };
};

const getAssetLogComponentsFailure = (state: State) => {
  return {
    ...state,
    assetLogComponents: {
      ...state.assetLogComponents,
      isPending: false,
    },
  };
};

const getFilteredLogsRequest = (state: State) => {
  return {
    ...state,
    filteredLogs: {
      ...state.filteredLogs,
      isPending: true,
    },
  };
};

const getFilteredLogsSuccess = (state: State, { data, totalCount }: { data: Asset[], totalCount: number }) => {
  return {
    ...state,
    filteredLogs: {
      data,
      totalCount,
      isPending: false,
    },
  };
};

const getFilteredLogsFailure = (state: State) => {
  return {
    ...state,
    filteredLogs: {
      ...state.filteredLogs,
      isPending: false,
    },
  };
};

const updateFilters = (state: State, { filters, resetSelectedFilters }: { filters: FilterData, resetSelectedFilters: boolean }) => {
  return {
    ...state,
    filters: {
      ...state?.filters,
      ...(filters || {}),
      ...(resetSelectedFilters && defaultFilters),
    },
  };
};

const initPage = () => ({ ...INITIAL_STATE });

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_ASSET_LOG_COMPONENTS_REQUEST]: getAssetLogComponentsRequest,
  [Types.GET_ASSET_LOG_COMPONENTS_SUCCESS]: getAssetLogComponentsSuccess,
  [Types.GET_ASSET_LOG_COMPONENTS_FAILURE]: getAssetLogComponentsFailure,

  [Types.UPDATE_FILTERS]: updateFilters,

  [Types.GET_FILTERED_LOGS_REQUEST]: getFilteredLogsRequest,
  [Types.GET_FILTERED_LOGS_SUCCESS]: getFilteredLogsSuccess,
  [Types.GET_FILTERED_LOGS_FAILURE]: getFilteredLogsFailure,

  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
