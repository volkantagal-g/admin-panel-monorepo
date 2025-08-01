import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.EMPLOYEE_ASSET.LIST;

export const employeeAssetListSelector = {
  getIsPending: state => state[reduxKey].employeeAssetList?.isPending,
  getExcelDownloadIsPending: state => state[reduxKey].downloadEmployeeAsset?.isPending,
  getData: state => state[reduxKey].employeeAssetList?.data,
  getFilters: state => state[reduxKey].employeeAssetList?.filters,
  getPreviousPageCursor: state => state[reduxKey].employeeAssetList?.previousPageCursor,
  getNextPageCursor: state => state[reduxKey].employeeAssetList?.nextPageCursor,
};

export const bulkInsertAssetsSelector = { isPending: state => state[reduxKey].bulkInsertAssets?.isPending };
export const bulkUpdateAssetsSelector = { isPending: state => state[reduxKey].bulkUpdateAssets?.isPending };
