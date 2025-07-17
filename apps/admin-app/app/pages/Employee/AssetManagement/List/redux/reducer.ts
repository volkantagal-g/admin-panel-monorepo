import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { VEHICLE_TABLE_TABS } from '@app/pages/Employee/AssetManagement/constants';

export const defaultFilters = {
  assignmentStatus: null,
  uniqueIdentifier: null,
  vehicleBrand: null,
  vehicleModel: null,
  vehicleModelYear: null,
  vehicleIsCommonCar: null,
  activeTabKey: VEHICLE_TABLE_TABS.VEHICLE_LIST,
  pagination: {
    currentPage: 1,
    rowsPerPage: 10,
    total: 0,
  },
};

export const INITIAL_STATE = {
  assetFilterComponents: {
    data: [],
    isPending: false,
  },
  filteredAssets: {
    data: [],
    totalCount: 0,
    isPending: false,
  },
  filters: defaultFilters,
};

export type State = {
  assetFilterComponents: {
    data: AssetFilterMetaData;
    isPending: boolean;
  }
  filteredAssets: {
    data: Asset[];
    totalCount: number;
    isPending: boolean;
  };
  filters: FilterData;
};

const getAssetFilterComponentsRequest = (state: State) => {
  return {
    ...state,
    assetFilterComponents: {
      ...state.assetFilterComponents,
      isPending: true,
    },
  };
};

const getAssetFilterComponentsSuccess = (state: State, { assetFilterComponents }: { assetFilterComponents: AssetFilterMetaData }) => {
  return {
    ...state,
    assetFilterComponents: {
      data: assetFilterComponents,
      isPending: false,
    },
  };
};

const getAssetFilterComponentsFailure = (state: State) => {
  return {
    ...state,
    assetFilterComponents: {
      ...state.assetFilterComponents,
      isPending: false,
    },
  };
};

const getFilteredAssetsRequest = (state: State) => {
  return {
    ...state,
    filteredAssets: {
      ...state.filteredAssets,
      isPending: true,
    },
  };
};

const getFilteredAssetsSuccess = (state: State, { data, totalCount }: { data: Asset[]; totalCount: number }) => {
  return {
    ...state,
    filteredAssets: {
      data,
      totalCount,
      isPending: false,
    },
  };
};

const getFilteredAssetsFailure = (state: State) => {
  return {
    ...state,
    filteredAssets: {
      ...state.filteredAssets,
      isPending: false,
    },
  };
};

const getControlNeededVehiclesRequest = (state: State) => {
  return {
    ...state,
    filteredAssets: {
      ...state.filteredAssets,
      isPending: true,
    },
  };
};

const getControlNeededVehiclesSuccess = (state: State, { data, totalCount }: { data: Asset[], totalCount: number }) => {
  return {
    ...state,
    filteredAssets: {
      data,
      totalCount,
      isPending: false,
    },
  };
};

const getControlNeededVehiclesFailure = (state: State) => {
  return {
    ...state,
    filteredAssets: {
      ...state.filteredAssets,
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
      ...(resetSelectedFilters && { ...defaultFilters, activeTabKey: filters?.activeTabKey }),
    },
  };
};

const initPage = () => ({ ...INITIAL_STATE });

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_ASSET_FILTER_COMPONENTS_REQUEST]: getAssetFilterComponentsRequest,
  [Types.GET_ASSET_FILTER_COMPONENTS_SUCCESS]: getAssetFilterComponentsSuccess,
  [Types.GET_ASSET_FILTER_COMPONENTS_FAILURE]: getAssetFilterComponentsFailure,

  [Types.GET_FILTERED_ASSETS_REQUEST]: getFilteredAssetsRequest,
  [Types.GET_FILTERED_ASSETS_SUCCESS]: getFilteredAssetsSuccess,
  [Types.GET_FILTERED_ASSETS_FAILURE]: getFilteredAssetsFailure,

  [Types.GET_CONTROL_NEEDED_VEHICLES_REQUEST]: getControlNeededVehiclesRequest,
  [Types.GET_CONTROL_NEEDED_VEHICLES_SUCCESS]: getControlNeededVehiclesSuccess,
  [Types.GET_CONTROL_NEEDED_VEHICLES_FAILURE]: getControlNeededVehiclesFailure,

  [Types.UPDATE_FILTERS]: updateFilters,

  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
