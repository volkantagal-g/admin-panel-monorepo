import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.FINANCE.ORDER}_`;

export const { Types, Creators } = createActions(
  {
    getFinanceOrderDetailRequest: { orderId: null },
    getFinanceOrderDetailSuccess: { data: {} },
    getFinanceOrderDetailFailure: { error: null },
    getFinanceOrderDetailIntervalRequest: { orderId: null },
    getFinanceOrderDetailIntervalSuccess: { data: {} },
    getFinanceOrderDetailIntervalFailure: { error: null },
    initPage: null,
    destroyPage: null,
    createFinanceOrderNoteRequest: { orderId: null, orderNote: '', agentId: '', agentName: '' },
    createFinanceOrderNoteSuccess: { data: [] },
    createFinanceOrderNoteFailure: { error: null },
    getFinanceOrderCancelReasonsRequest: null,
    getFinanceOrderCancelReasonsSuccess: { data: [] },
    getFinanceOrderCancelReasonsFailure: { error: null },
    cancelFinanceOrderRequest: { data: {}, orderId: null },
    cancelFinanceOrderSuccess: null,
    cancelFinanceOrderFailure: { error: null },

  },
  { prefix },
);
