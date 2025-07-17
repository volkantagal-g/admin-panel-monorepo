import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.RULE.SELECT_PRIORITY;

export const prioritySelector = {
  getData: state => state?.[reducerKey]?.priorities?.data,
  getIsPending: state => state?.[reducerKey]?.priorities?.isPending,
};
