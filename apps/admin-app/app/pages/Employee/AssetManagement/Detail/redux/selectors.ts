import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ASSET_MANAGEMENT.DETAIL;

export const assetSelector = {
  getData: (state: any) => state?.[reducerKey]?.asset.data,
  getIsPending: (state: any) => state?.[reducerKey]?.asset.isPending,
  getIsFirstLoadDone: (state: any) => state?.[reducerKey]?.isFirstAssetLoadDone,
};
