import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ASSET_MANAGEMENT.LIST;

export const assetFilterComponents = {
  getData: (state: any) => state?.[reducerKey]?.assetFilterComponents?.data?.schema?.filterMetaData,
  isPending: (state: any) => state?.[reducerKey]?.assetFilterComponents?.isPending,
};

export const filtersSelector = {
  getData: (state: any) => state?.[reducerKey]?.filters,
  getPagination: (state: any) => state?.[reducerKey]?.filters?.pagination,
};

export const filteredAssetsDataSelector = {
  getData: (state: any) => state?.[reducerKey]?.filteredAssets?.data,
  getTotalCount: (state: any) => state?.[reducerKey]?.filteredAssets?.totalCount,
  isPending: (state: any) => state?.[reducerKey]?.filteredAssets?.isPending,
};
