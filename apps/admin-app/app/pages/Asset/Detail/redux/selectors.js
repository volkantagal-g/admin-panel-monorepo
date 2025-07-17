import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ASSET.DETAIL;

export const AssetDetailSelector = {
  getAssetDetailData: state => state[reducerKey]?.assetDetail?.data,
  getAssetDetailIsPending: state => state[reducerKey]?.assetDetail?.isPending,
};

export const AssetHistorySelector = {
  getData: state => state[reducerKey]?.assetHistory?.data,
  getIsPending: state => state[reducerKey]?.assetHistory?.isPending,
  getPreviousPageCursor: state => state[reducerKey].assetHistory?.previousPageCursor,
  getNextPageCursor: state => state[reducerKey].assetHistory?.nextPageCursor,
};

export const AssetRepairHistorySelector = {
  getData: state => state[reducerKey]?.assetRepairHistory?.data,
  getIsPending: state => state[reducerKey]?.assetRepairHistory?.isPending,
};

export const AssetChangeEventInfoSelector = {
  getData: state => state[reducerKey]?.assetChangeEventInfo?.data,
  getIsPending: state => state[reducerKey]?.assetChangeEventInfo?.isPending,
};
