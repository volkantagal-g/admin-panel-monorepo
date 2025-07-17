import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.RULE.SELECT_CATEGORY;

export const categorySelector = {
  getData: state => state?.[reducerKey]?.categories?.data,
  getIsPending: state => state?.[reducerKey]?.categories?.isPending,
};
