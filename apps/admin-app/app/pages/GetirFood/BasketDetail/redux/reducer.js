import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  orderDetail: {
    data: {},
    isPending: false,
    error: null,
  },
  getUserById: {
    isPending: false,
    data: {},
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

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ORDER_DETAIL_REQUEST]: getOrderDetailRequest,
  [Types.GET_ORDER_DETAIL_SUCCESS]: getOrderDetailSuccess,
  [Types.GET_ORDER_DETAIL_FAILURE]: getOrderDetailFailure,
  [Types.GET_USER_BY_ID_REQUEST]: getUserByIdRequest,
  [Types.GET_USER_BY_ID_SUCCESS]: getUserByIdSuccess,
  [Types.GET_USER_BY_ID_FAILURE]: getUserByIdFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
