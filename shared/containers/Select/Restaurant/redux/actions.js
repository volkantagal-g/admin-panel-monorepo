import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getRestaurantsByNameRequest: { searchString: '', includeDeletedRestaurants: undefined },
  getRestaurantsByNameSuccess: { data: [] },
  getRestaurantsByNameFailure: { error: null },
  getRestaurantByIdRequest: { restaurantId: null },
  getRestaurantByIdSuccess: { data: {} },
  getRestaurantByIdFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SELECT.RESTAURANT}_` });
