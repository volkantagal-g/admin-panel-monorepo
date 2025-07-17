import { createReducer } from 'reduxsauce';

import { getDateFieldByStatus } from '../utils';

import { Types } from './actions';

export const INITIAL_STATE = {
  orderDetail: {
    data: null,
    isPending: false,
    error: null,
  },
  fraudOrderDetail: {
    data: null,
    isPending: false,
    error: null,
  },
  cancelOrder: {
    data: null,
    isPending: false,
    error: null,
  },
  updateFraudOrder: {
    data: null,
    isPending: false,
    error: null,
  },
  feedbacks: {
    data: null,
    isPending: false,
    error: null,
    count: 0,
    orderFeedbacks: [],
  },
  notes: {
    data: [],
    error: null,
  },
  createNote: {
    data: {},
    error: null,
    isPending: false,
  },
  forbiddenMatch: {
    data: [],
    isPending: false,
    error: null,
  },
  getInvoiceUrl: {
    data: [],
    isPending: false,
    error: null,
  },
  cancelOptions: {
    data: [],
    isPending: false,
    error: null,
  },
  cancelOrderCustomer: {
    data: null,
    isPending: false,
    error: null,
  },
  partialRefundOrder: {
    data: null,
    isPending: false,
    error: null,
  },
  wholeRefundReasons: {
    data: [],
    isPending: false,
    error: null,
  },
  wholeRefundOrder: {
    data: null,
    isPending: false,
    error: null,
  },
  marketOrderFeedbacks: {
    data: null,
    isPending: false,
    error: null,
    count: 0,
    orderFeedbacks: [],
  },
  promo: {
    data: null,
    isPending: false,
    error: null,
  },
  discountWarnAmounts: {
    data: null,
    isPending: false,
    error: null,
  },
  createStockRefundOrder: {
    data: null,
    isPending: false,
    error: null,
  },
  slottedDeliveryOptions: {
    data: null,
    isPending: false,
    error: null,
  },
  slotModal: { isVisible: false },
  changeDeliveryTimeSlot: { slotId: null, isPending: false },
  cancelOrderModal: { isVisible: false },
  configs: {
    data: null,
    isPending: false,
    error: null,
  },
  refundReasons: {
    data: {},
    isPending: false,
    error: null,
  },
  newOrderDetail: {
    data: null,
    isPending: false,
    error: null,
  },
};

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

export const getFraudOrderDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    fraudOrderDetail: {
      ...state.fraudOrderDetail,
      isPending: true,
    },
  };
};

export const getFraudOrderDetailSuccess = (
  state = INITIAL_STATE,
  { fraudOrderDetail = {} },
) => {
  return {
    ...state,
    fraudOrderDetail: {
      ...state.fraudOrderDetail,
      data: fraudOrderDetail,
      isPending: false,
    },
  };
};

export const getFraudOrderDetailFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    fraudOrderDetail: {
      ...state.fraudOrderDetail,
      isPending: false,
      error,
    },
  };
};

export const createOrderNoteRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createNote: {
      ...state.createNote,
      isPending: true,
    },
  };
};

export const createOrderNoteSuccess = (state = INITIAL_STATE, { note }) => {
  return {
    ...state,
    createNote: {
      ...state.createNote,
      isPending: false,
    },
    notes: {
      ...state.notes,
      data: [...(state.notes.data || []), note],
    },
  };
};

export const createOrderNoteFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createNote: {
      ...state.createNote,
      isPending: false,
      error,
    },
  };
};
export const getOrderNotesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    notes: {
      ...state.notes,
      isPending: true,
    },
  };
};

export const getOrderNotesSuccess = (state = INITIAL_STATE, { notes }) => {
  return {
    ...state,
    notes: {
      ...state.notes,
      data: notes,
      isPending: false,
    },
  };
};

export const getOrderNotesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    notes: {
      ...state.notes,
      isPending: false,
      error,
    },
  };
};
export const getClientFeedbacksRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
      isPending: true,
    },
  };
};

export const getClientFeedbacksSuccess = (
  state = INITIAL_STATE,
  { data = [] },
) => {
  const orderFeedbacks =
    data?.filter(
      feedback => feedback.order === state?.orderDetail.data?._id,
    ) || [];
  const clientFeedbacks =
    data?.filter(
      feedback => feedback.order !== state?.orderDetail.data?._id,
    ) || [];
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
      data: clientFeedbacks,
      orderFeedbacks,
      count: clientFeedbacks?.length,
      isPending: false,
    },
  };
};

export const getClientFeedbacksFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
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

export const createForbiddenMatchSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    forbiddenMatch: {
      ...INITIAL_STATE.forbiddenMatch,
      data,
      isPending: false,
    },
  };
};

export const createForbiddenMatchFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    forbiddenMatch: {
      ...INITIAL_STATE.forbiddenMatch,
      isPending: false,
      error,
    },
  };
};
export const updateFraudOrderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateFraudOrder: {
      ...INITIAL_STATE.updateFraudOrder,
      isPending: true,
    },
  };
};

export const updateFraudOrderSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateFraudOrder: {
      ...INITIAL_STATE.updateFraudOrder,
      data,
      isPending: false,
    },
  };
};

export const updateFraudOrderFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateFraudOrder: {
      ...INITIAL_STATE.updateFraudOrder,
      isPending: false,
      error,
    },
  };
};
export const cancelOrderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    cancelOrder: {
      ...state.cancelOrder,
      isPending: true,
    },
  };
};

export const cancelOrderSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    cancelOrder: {
      ...state.cancelOrder,
      data,
      isPending: false,
    },
  };
};

export const cancelOrderFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    cancelOrder: {
      ...state.cancelOrder,
      isPending: false,
      error,
    },
  };
};

export const getInvoiceUrlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getInvoiceUrl: {
      ...INITIAL_STATE.getInvoiceUrl,
      isPending: true,
    },
  };
};

export const getInvoiceUrlSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getInvoiceUrl: {
      ...INITIAL_STATE.getInvoiceUrl,
      data,
      isPending: false,
    },
  };
};

export const getInvoiceUrlFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getInvoiceUrl: {
      ...INITIAL_STATE.getInvoiceUrl,
      isPending: false,
      error,
    },
  };
};

export const cancelOrderCustomerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    cancelOrderCustomer: {
      ...INITIAL_STATE.cancelOrderCustomer,
      isPending: true,
    },
  };
};

export const cancelOrderCustomerSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    cancelOrderCustomer: {
      ...INITIAL_STATE.cancelOrderCustomer,
      data,
      isPending: false,
    },
  };
};

export const cancelOrderCustomerFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    cancelOrderCustomer: {
      ...INITIAL_STATE.cancelOrderCustomer,
      isPending: false,
      error,
    },
  };
};

export const getOrderCancelOptionsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    cancelOptions: {
      ...INITIAL_STATE.cancelOptions,
      isPending: true,
    },
  };
};

export const getOrderCancelOptionsSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    cancelOptions: {
      ...INITIAL_STATE.cancelOptions,
      data,
      isPending: false,
    },
  };
};

export const getOrderCancelOptionsFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    cancelOptions: {
      ...INITIAL_STATE.cancelOptions,
      isPending: false,
      error,
    },
  };
};

export const getDiscountWarnConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    discountWarnAmounts: {
      ...INITIAL_STATE.discountWarnAmounts,
      isPending: true,
    },
  };
};

export const getDiscountWarnConfigFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    discountWarnAmounts: {
      ...INITIAL_STATE.discountWarnAmounts,
      isPending: false,
      error,
    },
  };
};

export const getDiscountWarnConfigSuccess = (
  state = INITIAL_STATE,
  { data = {} },
) => {
  return {
    ...state,
    discountWarnAmounts: {
      ...INITIAL_STATE.discountWarnAmounts,
      isPending: false,
      data,
    },
  };
};

export const partialRefundOrderCustomerRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    partialRefundOrder: {
      ...INITIAL_STATE.partialRefundOrder,
      isPending: true,
    },
  };
};

export const partialRefundOrderCustomerSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    partialRefundOrder: {
      ...INITIAL_STATE.partialRefundOrder,
      data,
      isPending: false,
    },
  };
};

export const partialRefundOrderCustomerFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    partialRefundOrder: {
      ...INITIAL_STATE.partialRefundOrder,
      isPending: false,
      error,
    },
  };
};

export const getWholeRefundReasonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    wholeRefundReasons: {
      ...INITIAL_STATE.wholeRefundReasons,
      isPending: true,
    },
  };
};

export const getWholeRefundReasonsSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    wholeRefundReasons: {
      ...INITIAL_STATE.wholeRefundReasons,
      data,
      isPending: false,
    },
  };
};

export const getWholeRefundReasonsFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    wholeRefundReasons: {
      ...INITIAL_STATE.wholeRefundReasons,
      isPending: false,
      error,
    },
  };
};

export const wholeRefundOrderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    wholeRefundOrder: {
      ...INITIAL_STATE.wholeRefundOrder,
      isPending: true,
    },
  };
};

export const wholeRefundOrderSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    wholeRefundOrder: {
      ...INITIAL_STATE.wholeRefundOrder,
      data,
      isPending: false,
    },
  };
};

export const wholeRefundOrderFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    wholeRefundOrder: {
      ...INITIAL_STATE.wholeRefundOrder,
      isPending: false,
      error,
    },
  };
};

export const createPromoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    promo: {
      ...INITIAL_STATE.promo,
      isPending: true,
    },
  };
};

export const createPromoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    promo: {
      ...INITIAL_STATE.promo,
      data,
      isPending: false,
    },
  };
};

export const createPromoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    promo: {
      ...INITIAL_STATE.promo,
      isPending: false,
      error,
    },
  };
};

export const createMarketOrderFeedbackRequest = (state = INITIAL_STATE) => {
  return {
    ...state,

    marketOrderFeedbacks: {
      ...state.feedbacks,

      isPending: true,
    },
  };
};

export const createMarketOrderFeedbackSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,

    marketOrderFeedbacks: {
      ...INITIAL_STATE.marketOrderFeedbacks,

      data,

      isPending: false,
    },
  };
};

export const createMarketOrderFeedbackFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,

    marketOrderFeedbacks: {
      ...INITIAL_STATE.marketOrderFeedbacks,

      isPending: false,

      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const updateOrderStatus = (state = INITIAL_STATE, { status }) => {
  const { data } = state.orderDetail;
  const marketOrder = getDateFieldByStatus(data);
  return {
    ...state,
    orderDetail: {
      ...state.orderDetail,
      data: {
        ...marketOrder,
        status,
      },
    },
  };
};
export const updateCourierStatus = (state = INITIAL_STATE, { status }) => {
  const { data } = state.orderDetail;
  return {
    ...state,
    orderDetail: {
      ...state.orderDetail,
      data: {
        ...data,
        courier: {
          ...data?.courier,
          courier: {
            ...data?.courier?.courier,
            status,
          },
        },
      },
    },
  };
};
export const updateCourier = (state = INITIAL_STATE, { courier }) => {
  const { data } = state.orderDetail;
  return {
    ...state,
    orderDetail: {
      ...state.orderDetail,
      data: {
        ...data,
        courier: {
          ...data?.courier,
          courier,
        },
      },
    },
  };
};
export const updateCourierLocation = (
  state = INITIAL_STATE,
  { coordinates },
) => {
  const { data } = state.orderDetail;
  const courierRoutes = data?.courierRoutes || [];
  return {
    ...state,
    orderDetail: {
      ...state.orderDetail,
      data: {
        ...data,
        courierRoutes: [...courierRoutes, { coordinates }],
        courier: {
          ...data?.courier,
          courier: {
            ...data?.courier?.courier,
            location: {
              ...data?.courier?.courier?.location,
              coordinates,
            },
          },
        },
      },
    },
  };
};

export const createStockRefundOrderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createStockRefundOrder: {
      ...INITIAL_STATE.createStockRefundOrder,
      isPending: true,
    },
  };
};

export const createStockRefundOrderSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    createStockRefundOrder: {
      ...INITIAL_STATE.createStockRefundOrder,
      data,
      isPending: false,
    },
  };
};

export const createStockRefundOrderFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    createStockRefundOrder: {
      ...INITIAL_STATE.createStockRefundOrder,
      isPending: false,
      error,
    },
  };
};
export const getSlottedDeliveryOptionsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    slottedDeliveryOptions: {
      ...state.slottedDeliveryOptions,
      isPending: true,
    },
  };
};

export const getSlottedDeliveryOptionsSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    slottedDeliveryOptions: {
      ...state.slottedDeliveryOptions,
      data,
      isPending: false,
    },
  };
};

export const getSlottedDeliveryOptionsFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    slottedDeliveryOptions: {
      ...state.slottedDeliveryOptions,
      isPending: false,
      error,
    },
  };
};

export const toggleSlotModal = (state = INITIAL_STATE, { isVisible }) => {
  return {
    ...state,
    slotModal: {
      ...state.slotModal,
      isVisible,
    },
  };
};
export const changeDeliveryTimeSlotRequest = (
  state = INITIAL_STATE,
) => {
  return {
    ...state,
    changeDeliveryTimeSlot: {
      ...state.changeDeliveryTimeSlot,
      isPending: true,
    },
  };
};
export const changeDeliveryTimeSlotSuccess = (
  state = INITIAL_STATE,
  { slotId },
) => {
  return {
    ...state,
    changeDeliveryTimeSlot: {
      ...state.changeDeliveryTimeSlot,
      slotId,
      isPending: false,
    },
  };
};

export const toggleCancelOrderModal = (state = INITIAL_STATE, { isVisible }) => {
  return {
    ...state,
    cancelOrderModal: {
      ...state.cancelOrderModal,
      isVisible,
    },
  };
};

export const getConfigWithKeyRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    configs: {
      ...state.configs,
      isPending: true,
    },
  };
};

export const getConfigWithKeySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    configs: {
      ...state.configs,
      data: {
        ...state.configs.data,
        [data.key]: data,
      },
      isPending: false,
    },
  };
};

export const getConfigWithKeyFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    configs: {
      ...state.configs,
      isPending: false,
    },
  };
};
export const getOrderPartialRefundReasonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    refundReasons: {
      ...state.refundReasons,
      isPending: true,
    },
  };
};

export const getOrderPartialRefundReasonsSuccess = (state = INITIAL_STATE, { data = [] }) => {
  return {
    ...state,
    refundReasons: {
      ...state.refundReasons,
      data,
      isPending: false,
    },
  };
};

export const getOrderPartialRefundReasonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    refundReasons: {
      ...state.refundReasons,
      error,
      isPending: false,
    },
  };
};

export const getOrderByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    newOrderDetail: {
      ...state.newOrderDetail,
      isPending: true,
    },
  };
};

export const getOrderByIdSuccess = (state = INITIAL_STATE, { data = {} }) => {
  return {
    ...state,
    newOrderDetail: {
      ...state.newOrderDetail,
      data,
      isPending: false,
    },
  };
};

export const getOrderByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    newOrderDetail: {
      ...state.newOrderDetail,
      error,
      isPending: false,
    },
  };
};

export const HANDLERS = {
  [Types.GET_ORDER_DETAIL_REQUEST]: getOrderDetailRequest,
  [Types.GET_ORDER_DETAIL_SUCCESS]: getOrderDetailSuccess,
  [Types.GET_ORDER_DETAIL_FAILURE]: getOrderDetailFailure,
  [Types.GET_FRAUD_ORDER_DETAIL_REQUEST]: getFraudOrderDetailRequest,
  [Types.GET_FRAUD_ORDER_DETAIL_SUCCESS]: getFraudOrderDetailSuccess,
  [Types.GET_FRAUD_ORDER_DETAIL_FAILURE]: getFraudOrderDetailFailure,
  [Types.CREATE_ORDER_NOTE_REQUEST]: createOrderNoteRequest,
  [Types.CREATE_ORDER_NOTE_SUCCESS]: createOrderNoteSuccess,
  [Types.CREATE_ORDER_NOTE_FAILURE]: createOrderNoteFailure,
  [Types.GET_ORDER_NOTES_REQUEST]: getOrderNotesRequest,
  [Types.GET_ORDER_NOTES_SUCCESS]: getOrderNotesSuccess,
  [Types.GET_ORDER_NOTES_FAILURE]: getOrderNotesFailure,
  [Types.GET_CLIENT_FEEDBACKS_REQUEST]: getClientFeedbacksRequest,
  [Types.GET_CLIENT_FEEDBACKS_SUCCESS]: getClientFeedbacksSuccess,
  [Types.GET_CLIENT_FEEDBACKS_FAILURE]: getClientFeedbacksFailure,
  [Types.CREATE_FORBIDDEN_MATCH_REQUEST]: createForbiddenMatchRequest,
  [Types.CREATE_FORBIDDEN_MATCH_SUCCESS]: createForbiddenMatchSuccess,
  [Types.CREATE_FORBIDDEN_MATCH_FAILURE]: createForbiddenMatchFailure,
  [Types.GET_INVOICE_URL_REQUEST]: getInvoiceUrlRequest,
  [Types.GET_INVOICE_URL_SUCCESS]: getInvoiceUrlSuccess,
  [Types.GET_INVOICE_URL_FAILURE]: getInvoiceUrlFailure,
  [Types.UPDATE_FRAUD_ORDER_REQUEST]: updateFraudOrderRequest,
  [Types.UPDATE_FRAUD_ORDER_SUCCESS]: updateFraudOrderSuccess,
  [Types.UPDATE_FRAUD_ORDER_FAILURE]: updateFraudOrderFailure,
  [Types.CANCEL_ORDER_REQUEST]: cancelOrderRequest,
  [Types.CANCEL_ORDER_SUCCESS]: cancelOrderSuccess,
  [Types.CANCEL_ORDER_FAILURE]: cancelOrderFailure,
  [Types.CANCEL_ORDER_CUSTOMER_REQUEST]: cancelOrderCustomerRequest,
  [Types.CANCEL_ORDER_CUSTOMER_SUCCESS]: cancelOrderCustomerSuccess,
  [Types.CANCEL_ORDER_CUSTOMER_FAILURE]: cancelOrderCustomerFailure,
  [Types.GET_ORDER_CANCEL_OPTIONS_REQUEST]: getOrderCancelOptionsRequest,
  [Types.GET_ORDER_CANCEL_OPTIONS_SUCCESS]: getOrderCancelOptionsSuccess,
  [Types.GET_ORDER_CANCEL_OPTIONS_FAILURE]: getOrderCancelOptionsFailure,
  [Types.GET_WHOLE_REFUND_REASONS_REQUEST]: getWholeRefundReasonsRequest,
  [Types.GET_WHOLE_REFUND_REASONS_SUCCESS]: getWholeRefundReasonsSuccess,
  [Types.GET_WHOLE_REFUND_REASONS_FAILURE]: getWholeRefundReasonsFailure,
  [Types.WHOLE_REFUND_ORDER_REQUEST]: wholeRefundOrderRequest,
  [Types.WHOLE_REFUND_ORDER_SUCCESS]: wholeRefundOrderSuccess,
  [Types.WHOLE_REFUND_ORDER_FAILURE]: wholeRefundOrderFailure,
  [Types.CREATE_PROMO_REQUEST]: createPromoRequest,
  [Types.CREATE_PROMO_SUCCESS]: createPromoSuccess,
  [Types.CREATE_PROMO_FAILURE]: createPromoFailure,
  [Types.CREATE_MARKET_ORDER_FEEDBACK_REQUEST]:
    createMarketOrderFeedbackRequest,
  [Types.CREATE_MARKET_ORDER_FEEDBACK_SUCCESS]:
    createMarketOrderFeedbackSuccess,
  [Types.CREATE_MARKET_ORDER_FEEDBACK_FAILURE]:
    createMarketOrderFeedbackFailure,
  [Types.DESTROY_PAGE]: destroy,
  [Types.UPDATE_ORDER_STATUS]: updateOrderStatus,
  [Types.UPDATE_COURIER_STATUS]: updateCourierStatus,
  [Types.UPDATE_COURIER]: updateCourier,
  [Types.UPDATE_COURIER_LOCATION]: updateCourierLocation,
  [Types.GET_DISCOUNT_WARN_CONFIG_REQUEST]: getDiscountWarnConfigRequest,
  [Types.GET_DISCOUNT_WARN_CONFIG_SUCCESS]: getDiscountWarnConfigSuccess,
  [Types.GET_DISCOUNT_WARN_CONFIG_FAILURE]: getDiscountWarnConfigFailure,
  [Types.CREATE_STOCK_REFUND_ORDER_REQUEST]: createStockRefundOrderRequest,
  [Types.CREATE_STOCK_REFUND_ORDER_SUCCESS]: createStockRefundOrderSuccess,
  [Types.CREATE_STOCK_REFUND_ORDER_FAILURE]: createStockRefundOrderFailure,
  [Types.GET_SLOTTED_DELIVERY_OPTIONS_REQUEST]:
    getSlottedDeliveryOptionsRequest,
  [Types.GET_SLOTTED_DELIVERY_OPTIONS_SUCCESS]:
    getSlottedDeliveryOptionsSuccess,
  [Types.GET_SLOTTED_DELIVERY_OPTIONS_FAILURE]:
    getSlottedDeliveryOptionsFailure,
  [Types.TOGGLE_SLOT_MODAL]: toggleSlotModal,
  [Types.CHANGE_DELIVERY_TIME_SLOT_REQUEST]: changeDeliveryTimeSlotRequest,
  [Types.CHANGE_DELIVERY_TIME_SLOT_SUCCESS]: changeDeliveryTimeSlotSuccess,
  [Types.TOGGLE_CANCEL_ORDER_MODAL]: toggleCancelOrderModal,
  [Types.GET_CONFIG_WITH_KEY_REQUEST]: getConfigWithKeyRequest,
  [Types.GET_CONFIG_WITH_KEY_SUCCESS]: getConfigWithKeySuccess,
  [Types.GET_CONFIG_WITH_KEY_FAILURE]: getConfigWithKeyFailure,
  [Types.GET_ORDER_PARTIAL_REFUND_REASONS_REQUEST]: getOrderPartialRefundReasonsRequest,
  [Types.GET_ORDER_PARTIAL_REFUND_REASONS_SUCCESS]: getOrderPartialRefundReasonsSuccess,
  [Types.GET_ORDER_PARTIAL_REFUND_REASONS_FAILURE]: getOrderPartialRefundReasonsFailure,
  [Types.GET_ORDER_BY_ID_REQUEST]: getOrderByIdRequest,
  [Types.GET_ORDER_BY_ID_SUCCESS]: getOrderByIdSuccess,
  [Types.GET_ORDER_BY_ID_FAILURE]: getOrderByIdFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
