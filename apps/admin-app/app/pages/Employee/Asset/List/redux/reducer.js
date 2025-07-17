import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  employeeAssetList: {
    isPending: false,
    data: null,
    error: false,
  },
  returnEmployeeAsset: {
    isPending: false,
    error: false,
  },
  availableAssets: {
    isPending: false,
    data: null,
    error: false,
  },
  assignEmployeeAsset: {
    isPending: false,
    error: false,
  },
  employeeNonPrivateInformation: {
    isPending: false,
    error: false,
  },
  partialAssetsReturn: {
    isPending: false,
    error: false,
  },
};

const employeeAssetListRequest = state => ({
  ...state,
  employeeAssetList: {
    ...state.employeeAssetList,
    isPending: true,
    data: [],
  },
});

const employeeAssetListSuccess = (state, { data }) => ({
  ...state,
  employeeAssetList: {
    ...state.employeeAssetList,
    isPending: false,
    data,
  },
});

const employeeAssetListFailure = state => ({
  ...state,
  employeeAssetList: {
    ...state.employeeAssetList,
    isPending: false,
  },
});

const returnEmployeeAssetRequest = state => ({
  ...state,
  returnEmployeeAsset: {
    ...state.returnEmployeeAsset,
    isPending: true,
    error: false,
  },
});

const returnEmployeeAssetSuccess = state => ({
  ...state,
  returnEmployeeAsset: {
    ...state.returnEmployeeAsset,
    isPending: false,
    error: false,
  },
});

const returnEmployeeAssetFailure = state => ({
  ...state,
  returnEmployeeAsset: {
    ...state.returnEmployeeAsset,
    isPending: false,
    error: true,
  },
});

const getAvailableAssetsRequest = state => ({
  ...state,
  availableAssets: {
    ...state.availableAssets,
    isPending: true,
    error: false,
  },
});

const getAvailableAssetsSuccess = (state, { data = [] }) => ({
  ...state,
  availableAssets: {
    ...state.availableAssets,
    data,
    isPending: false,
    error: false,
  },
});

const getAvailableAssetsFailure = state => ({
  ...state,
  availableAssets: {
    ...state.availableAssets,
    isPending: false,
    error: true,
  },
});

const assignEmployeeAssetRequest = state => ({
  ...state,
  assignEmployeeAsset: {
    ...state.assignEmployeeAsset,
    isPending: true,
    error: false,
  },
});

const assignEmployeeAssetSuccess = state => ({
  ...state,
  assignEmployeeAsset: {
    ...state.assignEmployeeAsset,
    isPending: false,
    error: false,
  },
});

const assignEmployeeAssetFailure = state => ({
  ...state,
  assignEmployeeAsset: {
    ...state.assignEmployeeAsset,
    isPending: false,
    error: true,
  },
});

const employeeNonPrivateInformationRequest = state => ({
  ...state,
  employeeNonPrivateInformation: {
    ...state.employeeNonPrivateInformation,
    isPending: true,
    data: {},
  },
});

const employeeNonPrivateInformationSuccess = (state, { data }) => ({
  ...state,
  employeeNonPrivateInformation: {
    ...state.employeeNonPrivateInformation,
    isPending: false,
    data,
  },
});

const employeeNonPrivateInformationFailure = state => ({
  ...state,
  employeeNonPrivateInformation: {
    ...state.employeeNonPrivateInformation,
    isPending: false,
    data: {},
  },
});

const partialAssetsReturnRequest = state => ({
  ...state,
  partialAssetsReturn: {
    ...state.partialAssetsReturn,
    isPending: true,
    data: {},
  },
});

const partialAssetsReturnSuccess = (state, { data }) => ({
  ...state,
  partialAssetsReturn: {
    ...state.partialAssetsReturn,
    isPending: false,
    data,
  },
});

const partialAssetsReturnFailure = state => ({
  ...state,
  partialAssetsReturn: {
    ...state.partialAssetsReturn,
    isPending: false,
    data: {},
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_EMPLOYEE_ASSET_LIST_REQUEST]: employeeAssetListRequest,
  [Types.GET_EMPLOYEE_ASSET_LIST_SUCCESS]: employeeAssetListSuccess,
  [Types.GET_EMPLOYEE_ASSET_LIST_FAILURE]: employeeAssetListFailure,

  [Types.RETURN_EMPLOYEE_ASSET_REQUEST]: returnEmployeeAssetRequest,
  [Types.RETURN_EMPLOYEE_ASSET_SUCCESS]: returnEmployeeAssetSuccess,
  [Types.RETURN_EMPLOYEE_ASSET_FAILURE]: returnEmployeeAssetFailure,

  [Types.GET_AVAILABLE_ASSETS_REQUEST]: getAvailableAssetsRequest,
  [Types.GET_AVAILABLE_ASSETS_SUCCESS]: getAvailableAssetsSuccess,
  [Types.GET_AVAILABLE_ASSETS_FAILURE]: getAvailableAssetsFailure,

  [Types.ASSIGN_EMPLOYEE_ASSET_REQUEST]: assignEmployeeAssetRequest,
  [Types.ASSIGN_EMPLOYEE_ASSET_SUCCESS]: assignEmployeeAssetSuccess,
  [Types.ASSIGN_EMPLOYEE_ASSET_FAILURE]: assignEmployeeAssetFailure,

  [Types.GET_EMPLOYEE_NON_PRIVATE_INFORMATION_REQUEST]: employeeNonPrivateInformationRequest,
  [Types.GET_EMPLOYEE_NON_PRIVATE_INFORMATION_SUCCESS]: employeeNonPrivateInformationSuccess,
  [Types.GET_EMPLOYEE_NON_PRIVATE_INFORMATION_FAILURE]: employeeNonPrivateInformationFailure,

  [Types.PARTIAL_ASSETS_RETURN_REQUEST]: partialAssetsReturnRequest,
  [Types.PARTIAL_ASSETS_RETURN_SUCCESS]: partialAssetsReturnSuccess,
  [Types.PARTIAL_ASSETS_RETURN_FAILURE]: partialAssetsReturnFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
