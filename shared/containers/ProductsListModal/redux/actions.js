import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getActiveOrdersProductsRequest: { data: null },
    getActiveOrdersProductsSuccess: { data: null },
    getActiveOrdersProductsFailure: { error: null },

    toggleIsProductsModalVisible: null,

    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.PRODUCTS_LIST}_` },
);
