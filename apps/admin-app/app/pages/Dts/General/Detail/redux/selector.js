import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.GENERAL.DETAIL;

export const getDtsDetailSelector = {
  getData: state => state?.[reducerKey]?.dtsDetail?.data,
  getIsPending: state => state?.[reducerKey]?.dtsDetail?.isPending,
};
