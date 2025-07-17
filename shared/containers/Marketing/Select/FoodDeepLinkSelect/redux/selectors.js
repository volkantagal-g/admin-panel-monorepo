import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKETING.SELECT.FOOD_DEEP_LINK;

export const foodDeepLinkSelector = {
  getData: state => state?.[reducerKey]?.data,
  getIsPending: state => state?.[reducerKey]?.isPending,
  getError: state => state?.[reducerKey]?.error,
};
