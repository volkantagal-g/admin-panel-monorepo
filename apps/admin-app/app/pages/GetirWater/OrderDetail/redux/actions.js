import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    setIsCancelOrderModalVisible: { isCancelOrderModalVisible: false },
    setIsPartialRefundModalVisible: { isPartialRefundModalVisible: false },
    setIsOrderRefundModalVisible: { isOrderRefundModalVisible: false },
    getOrderDetailRequest: { id: null },
    getOrderDetailSuccess: { orderDetail: {} },
    getOrderDetailFailure: { error: null },
    orderCancelRequest: {
      cancelReason: 0,
      canceledBy: '',
      orderId: 'string',
      cancelNote: '',
      cancelReasonSource: 1,
      canceledByFullName: '',
      totalRefundAmount: 0,
    },
    orderCancelSuccess: {},
    orderCancelFailure: { error: null },
    returnOrderRequest: {
      orderId: 'string',
      returnReason: 0,
      returnedBy: 0,
      totalRefundAmount: 0,
    },
    returnOrderSuccess: {},
    returnOrderFailure: { error: null },
    productReturnRequest: {
      orderId: 'string',
      productReturnItemList: [],
      returnReason: 0,
      returnedBy: 'string',
      totalRefundAmount: 0,
    },
    productReturnSuccess: {},
    productReturnFailure: { error: null },
    payAmountRequest: {
      amount: 0,
      note: 'string',
      orderId: 'string',
    },
    payAmountSuccess: {},
    payAmountFailure: { error: null },
    takeAmountRequest: {
      amount: 0,
      note: 'string',
      orderId: 'string',
    },
    takeAmountSuccess: {},
    takeAmountFailure: { error: null },
    orderNoteRequest: {
      adminNote: {},
      orderId: 'string',
    },
    orderNoteSuccess: {},
    orderNoteFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.GETIR_WATER.ORDER_DETAIL}_` },
);
