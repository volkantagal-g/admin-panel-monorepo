import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  clients: {
    data: [],
    isPending: false,
  },
  createPersonalPromo: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const getClientsRequest = state => {
  return {
    ...state,
    clients: {
      ...state.clients,
      isPending: true,
    },
  };
};

export const getClientsSuccess = (state, { data }) => {
  return {
    ...state,
    clients: {
      ...state.clients,
      data,
      isPending: false,
    },
  };
};

export const getClientsFailure = state => {
  return {
    ...state,
    clients: {
      ...state.clients,
      data: [],
      isPending: false,
    },
  };
};

export const createPersonalPromoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createPersonalPromo: {
      ...INITIAL_STATE.createPersonalPromo,
      isPending: true,
    },
  };
};

export const createPersonalPromoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createPersonalPromo: {
      ...INITIAL_STATE.createPersonalPromo,
      data,
      isPending: false,
    },
  };
};

export const createPersonalPromoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createPersonalPromo: {
      ...INITIAL_STATE.createPersonalPromo,
      error,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CLIENTS_REQUEST]: getClientsRequest,
  [Types.GET_CLIENTS_SUCCESS]: getClientsSuccess,
  [Types.GET_CLIENTS_FAILURE]: getClientsFailure,
  [Types.CREATE_PERSONAL_PROMO_REQUEST]: createPersonalPromoRequest,
  [Types.CREATE_PERSONAL_PROMO_SUCCESS]: createPersonalPromoSuccess,
  [Types.CREATE_PERSONAL_PROMO_FAILURE]: createPersonalPromoFailure,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
