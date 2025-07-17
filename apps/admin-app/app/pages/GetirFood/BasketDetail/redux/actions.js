import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getOrderDetailRequest: { basketOrderId: null },
    getOrderDetailSuccess: { data: {} },
    getOrderDetailFailure: { error: null },
    getUserByIdRequest: { id: null },
    getUserByIdSuccess: { data: {} },
    getUserByIdFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.BASKET_ORDER.DETAIL}_` },
);
