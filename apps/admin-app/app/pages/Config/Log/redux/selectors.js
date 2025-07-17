import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CONFIG.LOG;

export const getConfigLogSelector = {
  getIsPending: state => state?.[reducerKey]?.configLog?.isPending,
  getData: state => state?.[reducerKey]?.configLog?.data,
};
