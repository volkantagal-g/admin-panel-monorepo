import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SEGMENT.FRAUD_MANAGEMENT;

export const segmentOptionSelector = {
  getData: state => state?.[reducerKey]?.data,
  getIsPending: state => state?.[reducerKey]?.isPending,
  getError: state => state?.[reducerKey]?.error,
};

export const segmentSelector = {
  getData: state => state?.[reducerKey]?.segment?.data,
  getIsPending: state => state?.[reducerKey]?.segment?.isPending,
  getError: state => state?.[reducerKey]?.segment?.error,
};
