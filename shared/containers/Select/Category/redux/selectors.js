import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.CATEGORY;
export const getCategorySelector = {
  getData: state => state?.[reducerKey]?.getCategory?.data,
  isPending: state => state?.[reducerKey]?.getCategory?.isPending,
};
