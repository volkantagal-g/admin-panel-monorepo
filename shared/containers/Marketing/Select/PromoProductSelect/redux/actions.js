import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getMarketProductsRequest: { filters: {} },
    getMarketProductsSuccess: { data: [] },
    getMarketProductsFailure: { error: null },

    setMarketProductsMap: { data: [] },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.PROMO.PRODUCT_SELECT}_` },
);
