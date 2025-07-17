import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE_ASSET.LIST}_`;

export const { Types, Creators } = createActions({
  getEmployeeAssetListRequest: { filters: {} },
  getEmployeeAssetListSuccess: { data: [], nextPageCursor: undefined, previousPageCursor: undefined },
  getEmployeeAssetListFailure: { error: null },

  getEmployeeAssetListExcelDownloadRequest: { filters: {}, isForBulkUpdate: false },
  getEmployeeAssetListExcelDownloadSuccess: { data: [] },
  getEmployeeAssetListExcelDownloadFailure: { error: null },

  getCurrentEmployeeAssetReportDownloadRequest: { country: null },
  getFormerEmployeeAssetReportDownloadRequest: { country: null },

  bulkInsertAssetsRequest: { assets: null },
  bulkInsertAssetsSuccess: { data: [] },
  bulkInsertAssetsFailure: { error: null },

  bulkUpdateAssetsRequest: { assets: null },
  bulkUpdateAssetsSuccess: { data: [] },
  bulkUpdateAssetsFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
