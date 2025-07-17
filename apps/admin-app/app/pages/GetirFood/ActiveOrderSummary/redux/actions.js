import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getOrderSummaryRequest: { cityId: null },
    getOrderSummarySuccess: { data: {} },
    getOrderSummaryFailure: { error: null },
    getRestaurantSummaryRequest: { cityId: null },
    getRestaurantSummarySuccess: { data: {} },
    getRestaurantSummaryFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.FOOD.ACTIVE_ORDER_SUMMARY}_` },
);
