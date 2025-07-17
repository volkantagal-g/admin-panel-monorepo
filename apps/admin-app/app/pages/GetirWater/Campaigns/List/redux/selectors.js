import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GETIR_WATER.CAMPAIGNS;

export const campaignsSelector = {
  getData: state => state?.[reducerKey]?.campaigns?.data,
  getIsPending: state => state?.[reducerKey]?.campaigns?.isPending,
};
