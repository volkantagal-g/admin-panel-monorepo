import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getChainRestaurantsByNameRequest: { searchString: '' },
  getChainRestaurantsByNameSuccess: { data: [] },
  getChainRestaurantsByNameFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SELECT.CHAIN_RESTAURANT}_` });
