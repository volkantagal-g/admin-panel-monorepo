import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.GENERAL.LIST;

export const getDtsListSelector = {
  getData: state => state?.[reducerKey]?.dtsList?.data,
  getTotal: state => state?.[reducerKey]?.dtsList?.total,
  getIsPending: state => state?.[reducerKey]?.dtsList?.isPending,
};
