import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.EMPLOYEE.DETAIL_ASSET_LIST;

const defaultAvailableAssetsData = [];

export const employeeAssetListSelector = {
  getData: state => state?.[reducerKey]?.employeeAssetList?.data,
  getIsPending: state => state?.[reducerKey]?.employeeAssetList?.isPending,
  hasError: state => state?.[reducerKey]?.employeeAssetList?.error,
};

export const getAvailableAssetsSelector = {
  getData: state => state?.[reducerKey]?.availableAssets?.data || defaultAvailableAssetsData,
  getIsPending: state => state?.[reducerKey]?.availableAssets?.isPending,
  hasError: state => state?.[reducerKey]?.availableAssets?.error,
};

export const getReturnEmployeeAssetSelector = {
  getIsPending: state => state?.[reducerKey]?.returnEmployeeAsset?.isPending,
  hasError: state => state?.[reducerKey]?.returnEmployeeAsset?.error,
};

export const employeeNonPrivateInformationSelector = {
  getData: state => state?.[reducerKey]?.employeeNonPrivateInformation?.data,
  getIsPending: state => state?.[reducerKey]?.employeeNonPrivateInformation?.isPending,
};
