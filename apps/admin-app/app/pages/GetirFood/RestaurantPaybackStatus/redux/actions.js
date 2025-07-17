import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getCurrentStatusRequest: { restaurantId: null },
  getCurrentStatusSuccess: { data: {} },
  getCurrentStatusFailure: { error: null },
  changePaybackStatusRequest: { data: null },
  changePaybackStatusSuccess: null,
  changePaybackStatusFailure: { error: null },
  changeAllRestaurantsPaybackStatusRequest: { data: null },
  changeAllRestaurantsPaybackStatusSuccess: null,
  changeAllRestaurantsPaybackStatusFailure: { error: null },
  changePartialRestaurantsPaybackStatusRequest: { data: null },
  changePartialRestaurantsPaybackStatusSuccess: null,
  changePartialRestaurantsPaybackStatusFailure: { error: null },
  validatePartialRestaurantsPaybackStatusRequest: { file: null, onSuccess: null, onError: null },
  validatePartialRestaurantsPaybackStatusSuccess: null,
  validatePartialRestaurantsPaybackStatusFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FOOD.RESTAURANT_PAYBACK_STATUS}_` });
