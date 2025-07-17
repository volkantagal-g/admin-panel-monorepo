import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  financeOrderDetail: {
    isPending: false,
    data: {},
    isNotePending: false,
    notes: [],
    isCancelReasonsPending: false,
    cancelReasons: [],
    isCancelPending: false,
  },
};

const financeOrderDetailRequest = (state = INITIAL_STATE) => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    isPending: true,
    data: {},
    notes: [],
  },
});

const financeOrderDetailSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    isPending: false,
    data,
    notes: data.orderNotes,
  },
});

const financeOrderDetailFailure = (state = INITIAL_STATE) => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    isPending: false,
  },
});

const financeOrderDetailIntervalRequest = (state = INITIAL_STATE) => ({
  ...state,
  financeOrderDetail: { ...state.financeOrderDetail },
});

const financeOrderDetailIntervalSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    data,
  },
});

const financeOrderDetailIntervalFailure = (state = INITIAL_STATE) => ({
  ...state,
  financeOrderDetail: { ...state.financeOrderDetail },
});

const createFinanceOrderNoteRequest = (state = INITIAL_STATE) => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    isNotePending: true,
  },
});

const createFinanceOrderNoteSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    notes: data,
    isNotePending: false,
  },
});

const createFinanceOrderNoteFailure = (state = INITIAL_STATE) => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    isNotePending: false,
  },
});

const getFinanceOrderCancelReasonsRequest = state => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    isCancelReasonsPending: true,
  },
});

const getFinanceOrderCancelReasonsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    isCancelReasonsPending: false,
    cancelReasons: data,
  },
});

const getFinanceOrderCancelReasonsFailure = (state = INITIAL_STATE) => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    isCancelReasonsPending: false,
  },
});

const cancelFinanceOrderRequest = state => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    isCancelPending: true,
  },
});

const cancelFinanceOrderSuccess = state => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    isPending: true,
    isCancelPending: false,
  },
});

const cancelFinanceOrderFailure = state => ({
  ...state,
  financeOrderDetail: {
    ...state.financeOrderDetail,
    isPending: false,
    isCancelPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_FINANCE_ORDER_DETAIL_REQUEST]: financeOrderDetailRequest,
  [Types.GET_FINANCE_ORDER_DETAIL_SUCCESS]: financeOrderDetailSuccess,
  [Types.GET_FINANCE_ORDER_DETAIL_FAILURE]: financeOrderDetailFailure,
  [Types.GET_FINANCE_ORDER_DETAIL_INTERVAL_REQUEST]: financeOrderDetailIntervalRequest,
  [Types.GET_FINANCE_ORDER_DETAIL_INTERVAL_SUCCESS]: financeOrderDetailIntervalSuccess,
  [Types.GET_FINANCE_ORDER_DETAIL_INTERVAL_FAILURE]: financeOrderDetailIntervalFailure,
  [Types.CREATE_FINANCE_ORDER_NOTE_REQUEST]: createFinanceOrderNoteRequest,
  [Types.CREATE_FINANCE_ORDER_NOTE_SUCCESS]: createFinanceOrderNoteSuccess,
  [Types.CREATE_FINANCE_ORDER_NOTE_FAILURE]: createFinanceOrderNoteFailure,
  [Types.GET_FINANCE_ORDER_CANCEL_REASONS_REQUEST]: getFinanceOrderCancelReasonsRequest,
  [Types.GET_FINANCE_ORDER_CANCEL_REASONS_SUCCESS]: getFinanceOrderCancelReasonsSuccess,
  [Types.GET_FINANCE_ORDER_CANCEL_REASONS_FAILURE]: getFinanceOrderCancelReasonsFailure,
  [Types.CANCEL_FINANCE_ORDER_REQUEST]: cancelFinanceOrderRequest,
  [Types.CANCEL_FINANCE_ORDER_SUCCESS]: cancelFinanceOrderSuccess,
  [Types.CANCEL_FINANCE_ORDER_FAILURE]: cancelFinanceOrderFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
