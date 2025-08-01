import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  employeeAssetList: {
    isPending: false,
    data: [],
    nextPageCursor: undefined,
    previousPageCursor: undefined,
  },
  downloadEmployeeAsset: { isPending: false },
  bulkInsertAssets: { isPending: false },
  bulkUpdateAssets: { isPending: false },
};

const employeeAssetListRequest = state => ({
  ...state,
  employeeAssetList: {
    ...state.employeeAssetList,
    isPending: true,
    data: [],
    nextPageCursor: undefined,
    previousPageCursor: undefined,
  },
});

const employeeAssetListSuccess = (state, { data, nextPageCursor, previousPageCursor }) => ({
  ...state,
  employeeAssetList: {
    ...state.employeeAssetList,
    isPending: false,
    data,
    nextPageCursor,
    previousPageCursor,
  },
});

const employeeAssetListFailure = state => ({
  ...state,
  employeeAssetList: {
    ...state.employeeAssetList,
    isPending: false,
  },
});

export const getEmployeeAssetListExcelDownloadRequest = state => ({
  ...state,
  downloadEmployeeAsset: { isPending: true },
});

export const getEmployeeAssetListExcelDownloadSuccess = state => ({
  ...state,
  downloadEmployeeAsset: { isPending: false },
});

export const getEmployeeAssetListExcelDownloadFailure = state => ({
  ...state,
  downloadEmployeeAsset: { isPending: false },
});

export const getCurrentEmployeeAssetReportDownloadRequest = state => ({
  ...state,
  downloadEmployeeAsset: { isPending: true },
});

export const getFormerEmployeeAssetReportDownloadRequest = state => ({
  ...state,
  downloadEmployeeAsset: { isPending: true },
});

export const bulkInsertAssetsRequest = state => ({
  ...state,
  bulkInsertAssets: { isPending: true },
});

export const bulkInsertAssetsSuccess = state => ({
  ...state,
  bulkInsertAssets: { isPending: false },
});

export const bulkInsertAssetsFailure = state => ({
  ...state,
  bulkInsertAssets: { isPending: false },
});

export const bulkUpdateAssetsRequest = state => ({
  ...state,
  bulkUpdateAssets: { isPending: true },
});

export const bulkUpdateAssetsSuccess = state => ({
  ...state,
  bulkUpdateAssets: { isPending: false },
});

export const bulkUpdateAssetsFailure = state => ({
  ...state,
  bulkUpdateAssets: { isPending: false },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_EMPLOYEE_ASSET_LIST_REQUEST]: employeeAssetListRequest,
  [Types.GET_EMPLOYEE_ASSET_LIST_SUCCESS]: employeeAssetListSuccess,
  [Types.GET_EMPLOYEE_ASSET_LIST_FAILURE]: employeeAssetListFailure,

  [Types.GET_EMPLOYEE_ASSET_LIST_EXCEL_DOWNLOAD_REQUEST]: getEmployeeAssetListExcelDownloadRequest,
  [Types.GET_EMPLOYEE_ASSET_LIST_EXCEL_DOWNLOAD_SUCCESS]: getEmployeeAssetListExcelDownloadSuccess,
  [Types.GET_EMPLOYEE_ASSET_LIST_EXCEL_DOWNLOAD_FAILURE]: getEmployeeAssetListExcelDownloadFailure,

  [Types.GET_CURRENT_EMPLOYEE_ASSET_REPORT_DOWNLOAD_REQUEST]: getCurrentEmployeeAssetReportDownloadRequest,
  [Types.GET_FORMER_EMPLOYEE_ASSET_REPORT_DOWNLOAD_REQUEST]: getFormerEmployeeAssetReportDownloadRequest,

  [Types.BULK_INSERT_ASSETS_REQUEST]: bulkInsertAssetsRequest,
  [Types.BULK_INSERT_ASSETS_SUCCESS]: bulkInsertAssetsSuccess,
  [Types.BULK_INSERT_ASSETS_FAILURE]: bulkInsertAssetsFailure,

  [Types.BULK_UPDATE_ASSETS_REQUEST]: bulkUpdateAssetsRequest,
  [Types.BULK_UPDATE_ASSETS_SUCCESS]: bulkUpdateAssetsSuccess,
  [Types.BULK_UPDATE_ASSETS_FAILURE]: bulkUpdateAssetsFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
