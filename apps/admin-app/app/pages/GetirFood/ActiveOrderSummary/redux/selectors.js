import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FOOD.ACTIVE_ORDER_SUMMARY;

export const orderSummarySelector = {
  getData: state => state?.[reducerKey]?.orderSummary?.data,
  getIsPending: state => state?.[reducerKey]?.orderSummary?.isPending,
};

export const restaurantSummarySelector = {
  getData: state => state?.[reducerKey]?.restaurantSummary?.data,
  getIsPending: state => state?.[reducerKey]?.restaurantSummary?.isPending,
};
