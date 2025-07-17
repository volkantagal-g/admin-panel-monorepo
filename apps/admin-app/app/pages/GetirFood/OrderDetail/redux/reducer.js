import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  basketDetail: {
    data: {},
    isPending: false,
    error: null,
  },
  orderDetail: {
    data: {},
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
  getUserById: {
    isPending: false,
    data: {},
    error: null,
  },
  orderInsightInquiry: {
    isPending: false,
    data: [],
    error: null,
  },
  orderNotes: {
    data: [],
    isPending: false,
    error: null,
  },
  orderChangeOptions: {
    data: [],
    isPending: false,
    error: null,
  },
  createOrderNote: {
    data: [],
    isPending: false,
    error: null,
  },
  availableChangeTypes: {
    data: {},
    isPending: false,
    error: null,
  },
  forbiddenMatch: {
    data: [],
    isPending: false,
    error: null,
  },
  addChangeReasonAtOrder: {
    data: [],
    isPending: false,
    error: null,
  },
  updateChangeReasonAtOrder: {
    data: [],
    isPending: false,
    error: null,
  },
  getMainReasons: {
    data: [],
    isPending: false,
    error: null,
  },
  getSubReasons: {
    data: [],
    isPending: false,
    error: null,
  },
  getSubReason: {
    data: {},
    isPending: false,
    error: null,
  },
  getRefundSources: {
    data: [],
    isPending: false,
    error: null,
  },
  getClientTrustScore: {
    data: {},
    isPending: false,
    error: null,
  },
  setInquiry: {
    isPending: false,
    error: null,
  },
  orderCourierJson: {
    data: {},
    isPending: false,
    error: null,
  },
  orderFinancials: {
    data: {},
    isPending: false,
    error: null,
  },
  agreementData: {
    data: {},
    isPending: false,
    error: null,
  },
  courierRoute: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getBasketDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    basketDetail: {
      ...INITIAL_STATE.basketDetail,
      isPending: true,
    },
  };
};

export const getBasketDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    basketDetail: {
      ...INITIAL_STATE.basketDetail,
      data,
      isPending: false,
    },
  };
};

export const getBasketDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    basketDetail: {
      ...INITIAL_STATE.basketDetail,
      isPending: false,
      error,
    },
  };
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

export const orderCancelRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderCancel: {
      ...INITIAL_STATE.orderCancel,
      isPending: true,
    },
  };
};

export const orderCancelSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderCancel: {
      ...INITIAL_STATE.orderCancel,
      data,
      isPending: false,
    },
  };
};

export const orderCancelFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderCancel: {
      ...INITIAL_STATE.orderCancel,
      isPending: false,
      error,
    },
  };
};

export const getOrderChangeOptionsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderChangeOptions: {
      ...INITIAL_STATE.orderChangeOptions,
      isPending: true,
    },
  };
};

export const getOrderChangeOptionsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderChangeOptions: {
      ...INITIAL_STATE.orderChangeOptions,
      data,
      isPending: false,
    },
  };
};

export const getOrderChangeOptionsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderChangeOptions: {
      ...INITIAL_STATE.orderChangeOptions,
      isPending: false,
      error,
    },
  };
};

export const getAvailableChangeTypesForOrderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    availableChangeTypes: {
      ...INITIAL_STATE.availableChangeTypes,
      isPending: true,
    },
  };
};

export const getAvailableChangeTypesForOrderSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    availableChangeTypes: {
      ...INITIAL_STATE.availableChangeTypes,
      data,
      isPending: false,
    },
  };
};

export const getAvailableChangeTypesForOrderFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    availableChangeTypes: {
      ...INITIAL_STATE.availableChangeTypes,
      isPending: false,
      error,
    },
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

export const addChangeReasonAtOrderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    addChangeReasonAtOrder: {
      ...INITIAL_STATE.addChangeReasonAtOrder,
      isPending: true,
    },
  };
};

export const addChangeReasonAtOrderSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    addChangeReasonAtOrder: {
      ...INITIAL_STATE.addChangeReasonAtOrder,
      data,
      isPending: false,
    },
  };
};

export const addChangeReasonAtOrderFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    addChangeReasonAtOrder: {
      ...INITIAL_STATE.addChangeReasonAtOrder,
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

export const updateChangeReasonAtOrderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateChangeReasonAtOrder: {
      ...INITIAL_STATE.updateChangeReasonAtOrder,
      isPending: true,
    },
  };
};

export const updateChangeReasonAtOrderSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateChangeReasonAtOrder: {
      ...INITIAL_STATE.updateChangeReasonAtOrder,
      data,
    },
  };
};

export const updateChangeReasonAtOrderFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateChangeReasonAtOrder: {
      ...INITIAL_STATE.updateChangeReasonAtOrder,
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
      data: [
        data,
        ...state.orderNotes.data,
      ],
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

export const getMainReasonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getMainReasons: {
      ...INITIAL_STATE.getMainReasons,
      isPending: true,
    },
  };
};

export const getMainReasonsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getMainReasons: {
      ...INITIAL_STATE.getMainReasons,
      data,
      isPending: false,
    },
  };
};

export const getMainReasonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getMainReasons: {
      ...INITIAL_STATE.getMainReasons,
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

export const getSubReasonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getSubReasons: {
      ...INITIAL_STATE.getSubReasons,
      isPending: true,
    },
  };
};

export const getSubReasonsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getSubReasons: {
      ...INITIAL_STATE.getSubReasons,
      data,
      isPending: false,
    },
  };
};

export const getSubReasonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getSubReasons: {
      ...INITIAL_STATE.getSubReasons,
      isPending: false,
      error,
    },
  };
};

export const getSubReasonRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getSubReason: {
      ...INITIAL_STATE.getSubReason,
      isPending: true,
    },
  };
};

export const getSubReasonSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getSubReason: {
      ...INITIAL_STATE.getSubReason,
      data,
      isPending: false,
    },
  };
};

export const getSubReasonFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getSubReason: {
      ...INITIAL_STATE.getSubReason,
      isPending: false,
      error,
    },
  };
};

export const getOrderInsightInquiryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderInsightInquiry: {
      ...INITIAL_STATE.orderInsightInquiry,
      isPending: true,
    },
  };
};

export const getRefundSourcesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getRefundSources: {
      ...INITIAL_STATE.getRefundSources,
      isPending: true,
    },
  };
};

export const getRefundSourcesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getRefundSources: {
      ...INITIAL_STATE.getRefundSources,
      data,
      isPending: false,
    },
  };
};

export const getRefundSourcesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getRefundSources: {
      ...INITIAL_STATE.getRefundSources,
      isPending: false,
      error,
    },
  };
};

export const getClientTrustScoreRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getClientTrustScore: {
      ...INITIAL_STATE.getTrustScore,
      isPending: true,
    },
  };
};

export const getClientTrustScoreSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getClientTrustScore: {
      ...INITIAL_STATE.getTrustScore,
      data,
      isPending: false,
    },
  };
};

export const getClientTrustScoreFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getClientTrustScore: {
      ...INITIAL_STATE.getTrustScore,
      isPending: false,
      error,
    },
  };
};

export const getOrderInsightInquirySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderInsightInquiry: {
      ...INITIAL_STATE.orderInsightInquiry,
      data,
      isPending: false,
    },
  };
};

export const getOrderInsightInquiryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderInsightInquiry: {
      ...INITIAL_STATE.orderInsightInquiry,
      isPending: false,
      error,
    },
  };
};

export const setInquiryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    setInquiry: {
      ...INITIAL_STATE.setInquiry,
      isPending: true,
    },
  };
};

export const setInquirySuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    setInquiry: {
      ...INITIAL_STATE.setInquiry,
      isPending: false,
    },
  };
};

export const setInquiryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    setInquiry: {
      ...INITIAL_STATE.setInquiry,
      isPending: false,
      error,
    },
  };
};

export const getOrderCourierJsonRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderCourierJson: {
      ...INITIAL_STATE.orderCourierJson,
      isPending: true,
    },
  };
};

export const getOrderCourierJsonSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderCourierJson: {
      ...INITIAL_STATE.orderCourierJson,
      data,
      isPending: false,
    },
  };
};

export const getOrderCourierJsonFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderCourierJson: {
      ...INITIAL_STATE.orderCourierJson,
      isPending: false,
      error,
    },
  };
};

export const getOrderFinancialsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    orderFinancials: {
      ...INITIAL_STATE.orderFinancials,
      isPending: true,
    },
  };
};

export const getOrderFinancialsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    orderFinancials: {
      ...INITIAL_STATE.orderFinancials,
      data,
      isPending: false,
    },
  };
};

export const getOrderFinancialsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    orderFinancials: {
      ...INITIAL_STATE.orderFinancials,
      isPending: false,
      error,
    },
  };
};

export const getAgreementDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    agreementData: {
      ...INITIAL_STATE.agreementData,
      isPending: true,
    },
  };
};

export const getAgreementDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    agreementData: {
      ...INITIAL_STATE.agreementData,
      data,
      isPending: false,
    },
  };
};

export const getAgreementDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    agreementData: {
      ...INITIAL_STATE.agreementData,
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

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_BASKET_DETAIL_REQUEST]: getBasketDetailRequest,
  [Types.GET_BASKET_DETAIL_SUCCESS]: getBasketDetailSuccess,
  [Types.GET_BASKET_DETAIL_FAILURE]: getBasketDetailFailure,
  [Types.GET_ORDER_DETAIL_REQUEST]: getOrderDetailRequest,
  [Types.GET_ORDER_DETAIL_SUCCESS]: getOrderDetailSuccess,
  [Types.GET_ORDER_DETAIL_FAILURE]: getOrderDetailFailure,
  [Types.GET_ORDER_CANCEL_OPTION_REQUEST]: getOrderCancelOptionRequest,
  [Types.GET_ORDER_CANCEL_OPTION_SUCCESS]: getOrderCancelOptionSuccess,
  [Types.GET_ORDER_CANCEL_OPTION_FAILURE]: getOrderCancelOptionFailure,
  [Types.ORDER_CANCEL_REQUEST]: orderCancelRequest,
  [Types.ORDER_CANCEL_SUCCESS]: orderCancelSuccess,
  [Types.ORDER_CANCEL_FAILURE]: orderCancelFailure,
  [Types.GET_ORDER_CHANGE_OPTIONS_REQUEST]: getOrderChangeOptionsRequest,
  [Types.GET_ORDER_CHANGE_OPTIONS_SUCCESS]: getOrderChangeOptionsSuccess,
  [Types.GET_ORDER_CHANGE_OPTIONS_FAILURE]: getOrderChangeOptionsFailure,
  [Types.GET_AVAILABLE_CHANGE_TYPES_FOR_ORDER_REQUEST]: getAvailableChangeTypesForOrderRequest,
  [Types.GET_AVAILABLE_CHANGE_TYPES_FOR_ORDER_SUCCESS]: getAvailableChangeTypesForOrderSuccess,
  [Types.GET_AVAILABLE_CHANGE_TYPES_FOR_ORDER_FAILURE]: getAvailableChangeTypesForOrderFailure,
  [Types.ADD_CHANGE_REASON_AT_ORDER_REQUEST]: addChangeReasonAtOrderRequest,
  [Types.ADD_CHANGE_REASON_AT_ORDER_SUCCESS]: addChangeReasonAtOrderSuccess,
  [Types.ADD_CHANGE_REASON_AT_ORDER_FAILURE]: addChangeReasonAtOrderFailure,
  [Types.UPDATE_CHANGE_REASON_AT_ORDER_REQUEST]: updateChangeReasonAtOrderRequest,
  [Types.UPDATE_CHANGE_REASON_AT_ORDER_SUCCESS]: updateChangeReasonAtOrderSuccess,
  [Types.UPDATE_CHANGE_REASON_AT_ORDER_FAILURE]: updateChangeReasonAtOrderFailure,
  [Types.GET_MAIN_REASONS_REQUEST]: getMainReasonsRequest,
  [Types.GET_MAIN_REASONS_SUCCESS]: getMainReasonsSuccess,
  [Types.GET_MAIN_REASONS_FAILURE]: getMainReasonsFailure,
  [Types.GET_SUB_REASONS_REQUEST]: getSubReasonsRequest,
  [Types.GET_SUB_REASONS_SUCCESS]: getSubReasonsSuccess,
  [Types.GET_SUB_REASONS_FAILURE]: getSubReasonsFailure,
  [Types.GET_SUB_REASON_REQUEST]: getSubReasonRequest,
  [Types.GET_SUB_REASON_SUCCESS]: getSubReasonSuccess,
  [Types.GET_SUB_REASON_FAILURE]: getSubReasonFailure,
  [Types.GET_REFUND_SOURCES_REQUEST]: getRefundSourcesRequest,
  [Types.GET_REFUND_SOURCES_SUCCESS]: getRefundSourcesSuccess,
  [Types.GET_REFUND_SOURCES_FAILURE]: getRefundSourcesFailure,
  [Types.GET_CLIENT_TRUST_SCORE_REQUEST]: getClientTrustScoreRequest,
  [Types.GET_CLIENT_TRUST_SCORE_SUCCESS]: getClientTrustScoreSuccess,
  [Types.GET_CLIENT_TRUST_SCORE_FAILURE]: getClientTrustScoreFailure,
  [Types.SET_INQUIRY_REQUEST]: setInquiryRequest,
  [Types.SET_INQUIRY_SUCCESS]: setInquirySuccess,
  [Types.SET_INQUIRY_FAILURE]: setInquiryFailure,
  [Types.GET_USER_BY_ID_REQUEST]: getUserByIdRequest,
  [Types.GET_USER_BY_ID_SUCCESS]: getUserByIdSuccess,
  [Types.GET_USER_BY_ID_FAILURE]: getUserByIdFailure,
  [Types.GET_ORDER_INSIGHT_INQUIRY_REQUEST]: getOrderInsightInquiryRequest,
  [Types.GET_ORDER_INSIGHT_INQUIRY_SUCCESS]: getOrderInsightInquirySuccess,
  [Types.GET_ORDER_INSIGHT_INQUIRY_FAILURE]: getOrderInsightInquiryFailure,
  [Types.GET_ORDER_NOTE_REQUEST]: getOrderNoteRequest,
  [Types.GET_ORDER_NOTE_SUCCESS]: getOrderNoteSuccess,
  [Types.GET_ORDER_NOTE_FAILURE]: getOrderNoteFailure,
  [Types.CREATE_ORDER_NOTE_REQUEST]: createOrderNoteRequest,
  [Types.CREATE_ORDER_NOTE_SUCCESS]: createOrderNoteSuccess,
  [Types.CREATE_ORDER_NOTE_FAILURE]: createOrderNoteFailure,
  [Types.CREATE_FORBIDDEN_MATCH_REQUEST]: createForbiddenMatchRequest,
  [Types.CREATE_FORBIDDEN_MATCH_SUCCESS]: createForbiddenMatchSuccess,
  [Types.CREATE_FORBIDDEN_MATCH_FAILURE]: createForbiddenMatchFailure,
  [Types.GET_ORDER_COURIER_JSON_REQUEST]: getOrderCourierJsonRequest,
  [Types.GET_ORDER_COURIER_JSON_SUCCESS]: getOrderCourierJsonSuccess,
  [Types.GET_ORDER_COURIER_JSON_FAILURE]: getOrderCourierJsonFailure,
  [Types.GET_ORDER_FINANCIALS_REQUEST]: getOrderFinancialsRequest,
  [Types.GET_ORDER_FINANCIALS_SUCCESS]: getOrderFinancialsSuccess,
  [Types.GET_ORDER_FINANCIALS_FAILURE]: getOrderFinancialsFailure,
  [Types.GET_AGREEMENT_DATA_REQUEST]: getAgreementDataRequest,
  [Types.GET_AGREEMENT_DATA_SUCCESS]: getAgreementDataSuccess,
  [Types.GET_AGREEMENT_DATA_FAILURE]: getAgreementDataFailure,
  [Types.GET_COURIER_ROUTE_REQUEST]: getCourierRouteRequest,
  [Types.GET_COURIER_ROUTE_SUCCESS]: getCourierRouteSuccess,
  [Types.GET_COURIER_ROUTE_FAILURE]: getCourierRouteFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
