import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  orderDetail: {
    data: null,
    isPending: false,
    orderCancelOption: {
      data: [],
      isPending: false,
      error: null,
    },
    orderCancel: {
      data: [],
      isPending: false,
      error: null,
    },
    returnOrder: {
      data: [],
      isPending: false,
      error: null,
    },
    productReturn: {
      data: [],
      isPending: false,
      error: null,
    },
    payAmount: {
      data: [],
      isPending: false,
      error: null,
    },
    takeAmount: {
      data: [],
      isPending: false,
      error: null,
    },
    isCancelOrderModalVisible: false,
    isPartialRefundModalVisible: false,
    isOrderRefundModalVisible: false,
  },
};

// get order detail

export const getOrderDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderDetail: {
      ...state.orderDetail,
      isPending: true,
    },
  };
};

export const getOrderDetailSuccess = (
  state = INITIAL_STATE,
  { orderDetail = {} },
) => {
  return {
    ...state,
    orderDetail: {
      ...state.orderDetail,
      data: orderDetail,
      isPending: false,
    },
  };
};

export const getOrderDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderDetail: {
      ...state.orderDetail,
      isPending: false,
      error,
    },
  };
};

// Order Cancel

export const orderCancelRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderCancel: {
      ...state.orderCancel,
      isPending: true,
    },
  };
};

export const orderCancelSuccess = (state = INITIAL_STATE, payload) => {
  return {
    ...state,
    orderCancel: {
      ...state.orderDetail,
      data: payload,
      isPending: false,
    },
  };
};

export const orderCancelFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderCancel: {
      ...state.orderDetail,
      isPending: false,
      error,
    },
  };
};

// Return Order

export const returnOrderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    returnOrder: {
      ...state.returnOrder,
      isPending: true,
    },
  };
};

export const returnOrderSuccess = (state = INITIAL_STATE, payload) => {
  return {
    ...state,
    returnOrder: {
      ...state.returnOrder,
      data: payload,
      isPending: false,
    },
  };
};

export const returnOrderFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    returnOrder: {
      ...state.returnOrder,
      isPending: false,
      error,
    },
  };
};

// product Return

export const productReturnRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    productReturn: {
      ...state.productReturn,
      isPending: true,
    },
  };
};

export const productReturnSuccess = (state = INITIAL_STATE, payload) => {
  return {
    ...state,
    productReturn: {
      ...state.productReturn,
      data: payload,
      isPending: false,
    },
  };
};

export const productReturnFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    productReturn: {
      ...state.productReturn,
      isPending: false,
      error,
    },
  };
};

// pay Amount Request

export const payAmountRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    payAmount: {
      ...state.payAmount,
      isPending: true,
    },
  };
};

export const payAmountSuccess = (state = INITIAL_STATE, payload) => {
  return {
    ...state,
    payAmount: {
      ...state.payAmount,
      data: payload,
      isPending: false,
    },
  };
};

export const payAmountFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    payAmount: {
      ...state.payAmount,
      isPending: false,
      error,
    },
  };
};

// take Amount Request

export const takeAmountRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    takeAmount: {
      ...state.takeAmount,
      isPending: true,
    },
  };
};

export const takeAmountSuccess = (state = INITIAL_STATE, payload) => {
  return {
    ...state,
    takeAmount: {
      ...state.takeAmount,
      data: payload,
      isPending: false,
    },
  };
};

export const takeAmountFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    takeAmount: {
      ...state.takeAmount,
      isPending: false,
      error,
    },
  };
};

// Order Note

export const orderNoteRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderNote: {
      ...state.orderCancel,
      isPending: true,
    },
  };
};

export const orderNoteSuccess = (state = INITIAL_STATE, payload) => {
  return {
    ...state,
    orderNote: {
      ...state.orderDetail,
      data: payload,
      isPending: false,
    },
  };
};

export const orderNoteFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderNote: {
      ...state.orderDetail,
      isPending: false,
      error,
    },
  };
};

export const setIsCancelOrderModalVisible = (
  state = INITIAL_STATE,
  { isCancelOrderModalVisible },
) => {
  return {
    ...state,
    orderDetail: {
      ...state.orderDetail,
      isCancelOrderModalVisible,
    },
  };
};

export const setIsPartialRefundModalVisible = (
  state = INITIAL_STATE,
  { isPartialRefundModalVisible },
) => {
  return {
    ...state,
    orderDetail: {
      ...state.orderDetail,
      isPartialRefundModalVisible,
    },
  };
};

export const setIsOrderRefundModalVisible = (
  state = INITIAL_STATE,
  { isOrderRefundModalVisible },
) => {
  return {
    ...state,
    orderDetail: {
      ...state.orderDetail,
      isOrderRefundModalVisible,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ORDER_DETAIL_REQUEST]: getOrderDetailRequest,
  [Types.GET_ORDER_DETAIL_SUCCESS]: getOrderDetailSuccess,
  [Types.GET_ORDER_DETAIL_FAILURE]: getOrderDetailFailure,

  [Types.SET_IS_CANCEL_ORDER_MODAL_VISIBLE]: setIsCancelOrderModalVisible,
  [Types.SET_IS_PARTIAL_REFUND_MODAL_VISIBLE]: setIsPartialRefundModalVisible,
  [Types.SET_IS_ORDER_REFUND_MODAL_VISIBLE]: setIsOrderRefundModalVisible,

  [Types.ORDER_CANCEL_REQUEST]: orderCancelRequest,
  [Types.ORDER_CANCEL_SUCCESS]: orderCancelSuccess,
  [Types.ORDER_CANCEL_FAILURE]: orderCancelFailure,

  [Types.RETURN_ORDER_REQUEST]: returnOrderRequest,
  [Types.RETURN_ORDER_SUCCESS]: returnOrderSuccess,
  [Types.RETURN_ORDER_FAILURE]: returnOrderFailure,

  [Types.PRODUCT_RETURN_REQUEST]: productReturnRequest,
  [Types.PRODUCT_RETURN_SUCCESS]: productReturnSuccess,
  [Types.PRODUCT_RETURN_FAILURE]: productReturnFailure,

  [Types.PAY_AMOUNT_REQUEST]: payAmountRequest,
  [Types.PAY_AMOUNT_SUCCESS]: payAmountSuccess,
  [Types.PAY_AMOUNT_FAILURE]: payAmountFailure,

  [Types.TAKE_AMOUNT_REQUEST]: takeAmountRequest,
  [Types.TAKE_AMOUNT_SUCCESS]: takeAmountSuccess,
  [Types.TAKE_AMOUNT_FAILURE]: takeAmountFailure,

  [Types.ORDER_NOTE_REQUEST]: orderNoteRequest,
  [Types.ORDER_NOTE_SUCCESS]: orderNoteSuccess,
  [Types.ORDER_NOTE_FAILURE]: orderNoteFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
