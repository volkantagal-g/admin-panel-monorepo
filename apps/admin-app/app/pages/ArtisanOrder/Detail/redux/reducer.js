import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  orderDetail: {
    data: {},
    isPending: false,
    error: null,
  },
  returnRequest: {
    data: null,
    isPending: false,
    error: null,
  },
  returnDelivery: {
    data: null,
    isPending: false,
    error: null,
  },
  createReturnRequest: {
    data: null,
    isPending: false,
    error: null,
  },
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
  createExternalTransaction: {
    isPending: false,
    error: null,
  },
  orderRefundOption: {
    data: [],
    isPending: false,
    error: null,
  },
  orderRefund: {
    data: [],
    isPending: false,
    error: null,
  },
  orderReturns: {
    data: {},
    isPending: false,
    error: null,
  },
  returnsAvailability: {
    data: {},
    isPending: false,
    error: null,
  },
  cancelReturn: {
    data: {},
    isPending: false,
    error: null,
  },
  refundTabActiveKey: '',
  orderNotes: {
    data: [],
    isPending: false,
    error: null,
  },
  createOrderNote: {
    data: [],
    isPending: false,
    error: null,
  },
  paymentMethods: {
    data: [],
    isPending: false,
    error: null,
  },
  warehouse: {
    data: [],
    isPending: false,
    error: null,
  },
  forbiddenMatch: {
    data: [],
    isPending: false,
    error: null,
  },
  getUserById: {
    isPending: false,
    data: {},
    error: null,
  },
  courierRoute: {
    isPending: false,
    data: {},
    error: null,
  },
  courierReturnRoute: {
    isPending: false,
    data: {},
    error: null,
  },
  courierId: {
    isPending: false,
    data: {},
    error: null,
  },
  currentRunner: {
    data: null,
    isPending: false,
    error: null,
  },
  returnRunner: {
    data: null,
    isPending: false,
    error: null,
  },
  returnRunnerHistory: {
    data: [],
    isPending: false,
    error: null,
  },
  activeReturnDetailsModal: { data: null },
  courierTasks: {
    data: [],
    isPending: false,
    error: null,
  },
  artisanCourierId: {
    isPending: false,
    data: {},
    error: null,
  },
  callInfo: {
    data: {},
    isPending: false,
    error: null,
  },
  callInfoMessages: {
    data: {},
    isPending: false,
    error: null,
  },
  returnDetailsWithReturnIdList: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getOrderDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderDetail: {
      ...INITIAL_STATE.orderDetail,
      isPending: true,
    },
  };
};

export const getOrderDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderDetail: {
      ...INITIAL_STATE.orderDetail,
      data,
      isPending: false,
    },
  };
};

export const getOrderDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderDetail: {
      ...INITIAL_STATE.orderDetail,
      isPending: false,
      error,
    },
  };
};

export const getOrderCancelOptionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderCancelOption: {
      ...INITIAL_STATE.orderCancelOption,
      isPending: true,
    },
  };
};

export const getOrderCancelOptionSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderCancelOption: {
      ...INITIAL_STATE.orderCancelOption,
      data,
      isPending: false,
    },
  };
};

export const getOrderCancelOptionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderCancelOption: {
      ...INITIAL_STATE.orderCancelOption,
      isPending: false,
      error,
    },
  };
};

export const getOrderCancelRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderCancel: {
      ...INITIAL_STATE.orderCancel,
      isPending: true,
    },
  };
};

export const getOrderCancelSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderCancel: {
      ...INITIAL_STATE.orderCancel,
      data,
      isPending: false,
    },
  };
};

export const getOrderCancelFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderCancel: {
      ...INITIAL_STATE.orderCancel,
      isPending: false,
      error,
    },
  };
};

export const createExternalTransactionRequest = state => {
  return {
    ...state,
    createExternalTransaction: {
      ...state.createExternalTransaction,
      isPending: true,
    },
  };
};

export const createExternalTransactionSuccess = state => {
  return {
    ...state,
    createExternalTransaction: {
      ...state.createExternalTransaction,
      isPending: false,
    },
  };
};

export const createExternalTransactionFailure = (state, { error }) => {
  return {
    ...state,
    createExternalTransaction: {
      ...INITIAL_STATE.createExternalTransaction,
      isPending: false,
      error,
    },
  };
};

export const getOrderRefundOptionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderRefundOption: {
      ...INITIAL_STATE.orderRefundOption,
      isPending: true,
    },
  };
};

export const getOrderRefundOptionSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderRefundOption: {
      ...INITIAL_STATE.orderRefundOption,
      data,
      isPending: false,
    },
  };
};

export const getOrderRefundOptionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderRefundOption: {
      ...INITIAL_STATE.orderRefundOption,
      isPending: false,
      error,
    },
  };
};

export const getOrderRefundRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderRefund: {
      ...INITIAL_STATE.orderRefund,
      isPending: true,
    },
  };
};

export const getOrderRefundSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderRefund: {
      ...INITIAL_STATE.orderRefund,
      data,
      isPending: false,
    },
  };
};

export const getOrderRefundFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderRefund: {
      ...INITIAL_STATE.orderRefund,
      isPending: false,
      error,
    },
  };
};

export const getOrderReturnsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderReturns: {
      ...state.orderReturns,
      isPending: true,
    },
  };
};

export const getOrderReturnsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderReturns: {
      ...state.orderReturns,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getOrderReturnsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderReturns: {
      ...state.orderReturns,
      isPending: false,
      error,
    },
  };
};

export const getReturnsAvailabilityRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    returnsAvailability: {
      ...state.returnsAvailability,
      isPending: true,
    },
  };
};

export const getReturnsAvailabilitySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    returnsAvailability: {
      ...state.returnsAvailability,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getReturnsAvailabilityFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    returnsAvailability: {
      ...state.returnsAvailability,
      isPending: false,
      error,
    },
  };
};

export const cancelReturnRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    cancelReturn: {
      ...state.cancelReturn,
      isPending: true,
    },
  };
};

export const cancelReturnSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    cancelReturn: {
      ...state.cancelReturn,
      isPending: false,
      error: null,
    },
  };
};

export const cancelReturnFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    cancelReturn: {
      ...state.cancelReturn,
      isPending: false,
      error,
    },
  };
};

export const setRefundTabActiveKey = (state = INITIAL_STATE, { refundTabActiveKey }) => {
  return {
    ...state,
    refundTabActiveKey,
  };
};

export const getOrderNoteRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderNotes: {
      ...state.orderNotes,
      isPending: false,
    },
  };
};

export const getOrderNoteSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderNotes: {
      ...state.orderNotes,
      data,
      isPending: false,
    },
  };
};

export const getOrderNoteFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderNotes: {
      ...state.orderNotes,
      isPending: false,
      error,
    },
  };
};

export const createOrderNoteRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderNotes: {
      ...state.orderNotes,
      isPending: true,
    },
  };
};

export const createOrderNoteSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderNotes: {
      ...state.orderNotes,
      data: [...state.orderNotes.data, data],
      isPending: false,
    },
  };
};

export const createOrderNoteFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderNotes: {
      ...state.orderNotes,
      isPending: false,
      error,
    },
  };
};

export const updateOrderNoteRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderNotes: {
      ...state.orderNotes,
      isPending: true,
    },
  };
};

export const updateOrderNoteSuccess = (state = INITIAL_STATE, { data }) => {
  const orderNotes = state.orderNotes.data.map(note => {
    if (note._id !== data._id) return note;
    return data;
  });
  return {
    ...state,
    orderNotes: {
      ...state.orderNotes,
      data: orderNotes,
      isPending: false,
    },
  };
};

export const updateOrderNoteFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderNotes: {
      ...state.orderNotes,
      isPending: false,
      error,
    },
  };
};

export const getPaymentMethodsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    paymentMethods: {
      ...INITIAL_STATE.paymentMethods,
      isPending: true,
    },
  };
};

export const getPaymentMethodsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    paymentMethods: {
      ...INITIAL_STATE.paymentMethods,
      data,
      isPending: false,
    },
  };
};

export const getPaymentMethodsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    paymentMethods: {
      ...INITIAL_STATE.paymentMethods,
      isPending: false,
      error,
    },
  };
};

export const createForbiddenMatchRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    forbiddenMatch: {
      ...INITIAL_STATE.forbiddenMatch,
      isPending: true,
    },
  };
};

export const createForbiddenMatchSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    forbiddenMatch: {
      ...INITIAL_STATE.forbiddenMatch,
      data,
      isPending: false,
    },
  };
};

export const createForbiddenMatchFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    forbiddenMatch: {
      ...INITIAL_STATE.forbiddenMatch,
      isPending: false,
      error,
    },
  };
};

export const getWarehouseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: true,
    },
  };
};

export const getWarehouseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      data,
      isPending: false,
    },
  };
};

export const getWarehouseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    warehouse: {
      ...state.warehouse,
      isPending: false,
      error,
    },
  };
};

export const getUserByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getUserById: {
      ...INITIAL_STATE.getUserById,
      isPending: true,
    },
  };
};

export const getUserByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getUserById: {
      ...INITIAL_STATE.getUserById,
      data,
      isPending: false,
    },
  };
};

export const getUserByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getUserById: {
      ...INITIAL_STATE.getUserById,
      isPending: false,
      error,
    },
  };
};

export const getCourierRouteRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    courierRoute: {
      ...INITIAL_STATE.courierRoute,
      isPending: true,
    },
  };
};

export const getCourierRouteSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    courierRoute: {
      ...INITIAL_STATE.courierRoute,
      data,
      isPending: false,
    },
  };
};

export const getCourierRouteFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    courierRoute: {
      ...INITIAL_STATE.courierRoute,
      isPending: false,
      error,
    },
  };
};

export const getCourierReturnRouteRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    courierReturnRoute: {
      ...INITIAL_STATE.courierReturnRoute,
      isPending: true,
    },
  };
};

export const getCourierReturnRouteSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    courierReturnRoute: {
      ...INITIAL_STATE.courierReturnRoute,
      data,
      isPending: false,
    },
  };
};

export const getCourierReturnRouteFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    courierReturnRoute: {
      ...INITIAL_STATE.courierReturnRoute,
      isPending: false,
      error,
    },
  };
};

export const getReturnRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    returnRequest: {
      ...INITIAL_STATE.returnRequest,
      isPending: true,
    },
  };
};

export const getReturnRequestSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    returnRequest: {
      ...INITIAL_STATE.returnRequest,
      data,
      isPending: false,
    },
  };
};

export const getReturnRequestFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    returnRequest: {
      ...INITIAL_STATE.returnRequest,
      error,
      isPending: false,
    },
  };
};

export const setReturnDelivery = (state = INITIAL_STATE) => {
  return {
    ...state,
    returnDelivery: {
      ...INITIAL_STATE.returnDelivery,
      isPending: true,
    },
  };
};

export const setReturnDeliverySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    returnDelivery: {
      ...INITIAL_STATE.returnDelivery,
      data,
      isPending: false,
    },
  };
};

export const setReturnDeliveryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    returnDelivery: {
      ...INITIAL_STATE.returnDelivery,
      error,
      isPending: false,
    },
  };
};

export const createReturnRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createReturnRequest: {
      ...INITIAL_STATE.createReturnRequest,
      isPending: true,
    },
  };
};

export const createReturnRequestSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createReturnRequest: {
      ...INITIAL_STATE.createReturnRequest,
      data,
      isPending: false,
    },
  };
};

export const createReturnRequestFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createReturnRequest: {
      ...INITIAL_STATE.createReturnRequest,
      error,
      isPending: false,
    },
  };
};

export const getReturnRunnerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    returnRunner: {
      ...INITIAL_STATE.returnRunner,
      isPending: true,
    },
  };
};

export const getReturnRunnerSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    returnRunner: {
      ...INITIAL_STATE.returnRunner,
      data,
      isPending: false,
    },
  };
};

export const getReturnRunnerFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    returnRunner: {
      ...INITIAL_STATE.returnRunner,
      error,
      isPending: false,
    },
  };
};

export const getCourierByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    courierId: {
      ...INITIAL_STATE.courierId,
      isPending: true,
    },
  };
};

export const getCourierByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    courierId: {
      ...INITIAL_STATE.courierId,
      data,
      isPending: false,
    },
  };
};

export const getCourierByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    courierId: {
      ...INITIAL_STATE.courierId,
      isPending: false,
      error,
    },
  };
};

export const getCurrentRunnerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    currentRunner: {
      ...INITIAL_STATE.currentRunner,
      isPending: true,
    },
  };
};

export const getCurrentRunnerSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    currentRunner: {
      ...INITIAL_STATE.currentRunner,
      data,
      isPending: false,
    },
  };
};

export const getCurrentRunnerFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    currentRunner: {
      ...INITIAL_STATE.currentRunner,
      isPending: false,
      error,
    },
  };
};

export const getReturnRunnerHistoryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    returnRunnerHistory: {
      ...INITIAL_STATE.returnRunnerHistory,
      isPending: true,
    },
  };
};

export const getReturnRunnerHistorySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    returnRunnerHistory: {
      ...INITIAL_STATE.returnRunnerHistory,
      data,
      isPending: false,
    },
  };
};

export const getReturnRunnerHistoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    returnRunnerHistory: {
      ...INITIAL_STATE.returnRunnerHistory,
      error,
      isPending: false,
    },
  };
};

export const openReturnDetailsModalRequest = (state = INITIAL_STATE, { returnId }) => {
  return {
    ...state,
    activeReturnDetailsModal: { data: returnId },
  };
};

export const closeReturnDetailsModalRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    activeReturnDetailsModal: { data: null },
  };
};

export const getCourierTasksRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    courierTasks: {
      ...INITIAL_STATE.courierTasks,
      isPending: true,
    },
  };
};

export const getCourierTasksSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    courierTasks: {
      ...INITIAL_STATE.courierTasks,
      data,
      isPending: false,
    },
  };
};

export const getCourierTasksFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    courierTasks: {
      ...INITIAL_STATE.courierTasks,
      isPending: false,
      error,
    },
  };
};

export const getArtisanCourierByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    artisanCourierId: {
      ...INITIAL_STATE.artisanCourierId,
      isPending: true,
    },
  };
};

export const getArtisanCourierByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    artisanCourierId: {
      ...INITIAL_STATE.artisanCourierId,
      data,
      isPending: false,
    },
  };
};

export const getArtisanCourierByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    artisanCourierId: {
      ...INITIAL_STATE.artisanCourierId,
      isPending: false,
      error,
    },
  };
};

export const getCallInfoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    callInfo: {
      ...state.callInfo,
      isPending: true,
    },
  };
};

export const getCallInfoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    callInfo: {
      ...state.callInfo,
      data,
      isPending: false,
    },
  };
};

export const getCallInfoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    callInfo: {
      ...state.callInfo,
      isPending: false,
      error,
    },
  };
};

export const getCallInfoMessagesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    callInfoMessages: {
      ...state.callInfoMessages,
      isPending: true,
    },
  };
};

export const getCallInfoMessagesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    callInfoMessages: {
      ...state.callInfoMessages,
      data,
      isPending: false,
    },
  };
};

export const getCallInfoMessagesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    callInfoMessages: {
      ...state.callInfoMessages,
      isPending: false,
      error,
    },
  };
};

export const getReturnDetailsWithReturnIdListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    returnDetailsWithReturnIdList: {
      ...INITIAL_STATE.returnDetailsWithReturnIdList,
      isPending: true,
    },
  };
};

export const getReturnDetailsWithReturnIdListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    returnDetailsWithReturnIdList: {
      ...INITIAL_STATE.returnDetailsWithReturnIdList,
      data,
      isPending: false,
    },
  };
};

export const getReturnDetailsWithReturnIdListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    returnDetailsWithReturnIdList: {
      ...INITIAL_STATE.returnDetailsWithReturnIdList,
      isPending: false,
      error,
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
  [Types.GET_ORDER_CANCEL_OPTION_REQUEST]: getOrderCancelOptionRequest,
  [Types.GET_ORDER_CANCEL_OPTION_SUCCESS]: getOrderCancelOptionSuccess,
  [Types.GET_ORDER_CANCEL_OPTION_FAILURE]: getOrderCancelOptionFailure,
  [Types.GET_ORDER_CANCEL_REQUEST]: getOrderCancelRequest,
  [Types.GET_ORDER_CANCEL_SUCCESS]: getOrderCancelSuccess,
  [Types.GET_ORDER_CANCEL_FAILURE]: getOrderCancelFailure,
  [Types.CREATE_EXTERNAL_TRANSACTION_REQUEST]: createExternalTransactionRequest,
  [Types.CREATE_EXTERNAL_TRANSACTION_SUCCESS]: createExternalTransactionSuccess,
  [Types.CREATE_EXTERNAL_TRANSACTION_FAILURE]: createExternalTransactionFailure,
  [Types.GET_ORDER_REFUND_OPTION_REQUEST]: getOrderRefundOptionRequest,
  [Types.GET_ORDER_REFUND_OPTION_SUCCESS]: getOrderRefundOptionSuccess,
  [Types.GET_ORDER_REFUND_OPTION_FAILURE]: getOrderRefundOptionFailure,
  [Types.GET_ORDER_REFUND_REQUEST]: getOrderRefundRequest,
  [Types.GET_ORDER_REFUND_SUCCESS]: getOrderRefundSuccess,
  [Types.GET_ORDER_REFUND_FAILURE]: getOrderRefundFailure,
  [Types.GET_ORDER_RETURNS_REQUEST]: getOrderReturnsRequest,
  [Types.GET_ORDER_RETURNS_SUCCESS]: getOrderReturnsSuccess,
  [Types.GET_ORDER_RETURNS_FAILURE]: getOrderReturnsFailure,
  [Types.GET_RETURNS_AVAILABILITY_REQUEST]: getReturnsAvailabilityRequest,
  [Types.GET_RETURNS_AVAILABILITY_SUCCESS]: getReturnsAvailabilitySuccess,
  [Types.GET_RETURNS_AVAILABILITY_FAILURE]: getReturnsAvailabilityFailure,
  [Types.CANCEL_RETURN_REQUEST]: cancelReturnRequest,
  [Types.CANCEL_RETURN_SUCCESS]: cancelReturnSuccess,
  [Types.CANCEL_RETURN_FAILURE]: cancelReturnFailure,
  [Types.SET_REFUND_TAB_ACTIVE_KEY]: setRefundTabActiveKey,
  [Types.GET_ORDER_NOTE_REQUEST]: getOrderNoteRequest,
  [Types.GET_ORDER_NOTE_SUCCESS]: getOrderNoteSuccess,
  [Types.GET_ORDER_NOTE_FAILURE]: getOrderNoteFailure,
  [Types.CREATE_ORDER_NOTE_REQUEST]: createOrderNoteRequest,
  [Types.CREATE_ORDER_NOTE_SUCCESS]: createOrderNoteSuccess,
  [Types.CREATE_ORDER_NOTE_FAILURE]: createOrderNoteFailure,
  [Types.GET_PAYMENT_METHODS_REQUEST]: getPaymentMethodsRequest,
  [Types.GET_PAYMENT_METHODS_SUCCESS]: getPaymentMethodsSuccess,
  [Types.GET_PAYMENT_METHODS_FAILURE]: getPaymentMethodsFailure,
  [Types.GET_WAREHOUSE_REQUEST]: getWarehouseRequest,
  [Types.GET_WAREHOUSE_SUCCESS]: getWarehouseSuccess,
  [Types.GET_WAREHOUSE_FAILURE]: getWarehouseFailure,
  [Types.CREATE_FORBIDDEN_MATCH_REQUEST]: createForbiddenMatchRequest,
  [Types.CREATE_FORBIDDEN_MATCH_SUCCESS]: createForbiddenMatchSuccess,
  [Types.CREATE_FORBIDDEN_MATCH_FAILURE]: createForbiddenMatchFailure,
  [Types.GET_USER_BY_ID_REQUEST]: getUserByIdRequest,
  [Types.GET_USER_BY_ID_SUCCESS]: getUserByIdSuccess,
  [Types.GET_USER_BY_ID_FAILURE]: getUserByIdFailure,
  [Types.GET_COURIER_ROUTE_REQUEST]: getCourierRouteRequest,
  [Types.GET_COURIER_ROUTE_SUCCESS]: getCourierRouteSuccess,
  [Types.GET_COURIER_ROUTE_FAILURE]: getCourierRouteFailure,
  [Types.GET_COURIER_RETURN_ROUTE_REQUEST]: getCourierReturnRouteRequest,
  [Types.GET_COURIER_RETURN_ROUTE_SUCCESS]: getCourierReturnRouteSuccess,
  [Types.GET_COURIER_RETURN_ROUTE_FAILURE]: getCourierReturnRouteFailure,
  [Types.GET_RETURN_REQUEST]: getReturnRequest,
  [Types.GET_RETURN_REQUEST_SUCCESS]: getReturnRequestSuccess,
  [Types.GET_RETURN_REQUEST_FAILURE]: getReturnRequestFailure,
  [Types.GET_CURRENT_RUNNER_REQUEST]: getCurrentRunnerRequest,
  [Types.GET_CURRENT_RUNNER_SUCCESS]: getCurrentRunnerSuccess,
  [Types.GET_CURRENT_RUNNER_FAILURE]: getCurrentRunnerFailure,
  [Types.GET_RETURN_RUNNER_REQUEST]: getReturnRunnerRequest,
  [Types.GET_RETURN_RUNNER_SUCCESS]: getReturnRunnerSuccess,
  [Types.GET_RETURN_RUNNER_FAILURE]: getReturnRunnerFailure,
  [Types.GET_RETURN_RUNNER_HISTORY_REQUEST]: getReturnRunnerHistoryRequest,
  [Types.GET_RETURN_RUNNER_HISTORY_SUCCESS]: getReturnRunnerHistorySuccess,
  [Types.GET_RETURN_RUNNER_HISTORY_FAILURE]: getReturnRunnerHistoryFailure,
  [Types.SET_RETURN_DELIVERY_REQUEST]: setReturnDelivery,
  [Types.SET_RETURN_DELIVERY_REQUEST_SUCCESS]: setReturnDeliverySuccess,
  [Types.SET_RETURN_DELIVERY_REQUEST_FAILURE]: setReturnDeliveryFailure,
  [Types.CREATE_RETURN_REQUEST]: createReturnRequest,
  [Types.CREATE_RETURN_REQUEST_SUCCESS]: createReturnRequestSuccess,
  [Types.CREATE_RETURN_REQUEST_FAILURE]: createReturnRequestFailure,
  [Types.GET_COURIER_BY_ID_REQUEST]: getCourierByIdRequest,
  [Types.GET_COURIER_BY_ID_SUCCESS]: getCourierByIdSuccess,
  [Types.GET_COURIER_BY_ID_FAILURE]: getCourierByIdFailure,
  [Types.OPEN_RETURN_DETAILS_MODAL]: openReturnDetailsModalRequest,
  [Types.CLOSE_RETURN_DETAILS_MODAL]: closeReturnDetailsModalRequest,
  [Types.GET_COURIER_TASKS_REQUEST]: getCourierTasksRequest,
  [Types.GET_COURIER_TASKS_SUCCESS]: getCourierTasksSuccess,
  [Types.GET_COURIER_TASKS_FAILURE]: getCourierTasksFailure,
  [Types.GET_ARTISAN_COURIER_BY_ID_REQUEST]: getArtisanCourierByIdRequest,
  [Types.GET_ARTISAN_COURIER_BY_ID_SUCCESS]: getArtisanCourierByIdSuccess,
  [Types.GET_ARTISAN_COURIER_BY_ID_FAILURE]: getArtisanCourierByIdFailure,
  [Types.GET_CALL_INFO_REQUEST]: getCallInfoRequest,
  [Types.GET_CALL_INFO_SUCCESS]: getCallInfoSuccess,
  [Types.GET_CALL_INFO_FAILURE]: getCallInfoFailure,
  [Types.GET_CALL_INFO_MESSAGES_REQUEST]: getCallInfoMessagesRequest,
  [Types.GET_CALL_INFO_MESSAGES_SUCCESS]: getCallInfoMessagesSuccess,
  [Types.GET_CALL_INFO_MESSAGES_FAILURE]: getCallInfoMessagesFailure,
  [Types.GET_RETURN_DETAILS_WITH_RETURN_ID_LIST_REQUEST]: getReturnDetailsWithReturnIdListRequest,
  [Types.GET_RETURN_DETAILS_WITH_RETURN_ID_LIST_SUCCESS]: getReturnDetailsWithReturnIdListSuccess,
  [Types.GET_RETURN_DETAILS_WITH_RETURN_ID_LIST_FAILURE]: getReturnDetailsWithReturnIdListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
