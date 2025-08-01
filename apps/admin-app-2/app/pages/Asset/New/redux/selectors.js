import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ASSET.NEW;

export const createAssetSelector = {
  getData: state => state[reducerKey]?.createAsset?.data,
  getIsPending: state => state[reducerKey]?.createAsset?.isPending,
};
