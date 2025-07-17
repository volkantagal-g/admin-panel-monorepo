import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getAutoStockOrderRequest: { data: {} },
    getAutoStockOrderSuccess: { data: {} },
    getAutoStockOrderFailure: { error: null },
    setItemParams: { data: [] },
    setSupplierId: { data: {} },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.STOCK.ORDER.AUTO}_` },
);
