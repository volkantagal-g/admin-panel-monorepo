import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ASSET_MANAGEMENT.LOGS;

export const assetLogComponents = {
  getData: (state: any) => state?.[reducerKey]?.assetLogComponents?.data?.schema?.logMetaData,
  isPending: (state: any) => state?.[reducerKey]?.assetLogComponents?.isPending,
};

export const filtersSelector = {
  getData: (state: any) => state?.[reducerKey]?.filters,
  getPagination: (state: any) => state?.[reducerKey]?.filters?.pagination,
};

export const filteredLogs = {
  getData: (state: any) => state?.[reducerKey]?.filteredLogs?.data,
  isPending: (state: any) => state?.[reducerKey]?.filteredLogs?.isPending,
  getTotalCount: (state: any) => state?.[reducerKey]?.filteredLogs?.totalCount,
};
