import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ASSET_MANAGEMENT.NEW;

export const assetTypeSelector = {
  getData: (state: any) => state?.[reducerKey]?.assetType.data,
  getIsPending: (state: any) => state?.[reducerKey]?.assetType.isPending,
};

export const createAssetSelector = { getIsPending: (state: any) => state?.[reducerKey]?.createAsset.isPending };
