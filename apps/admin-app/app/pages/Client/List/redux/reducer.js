import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  clients: {
    data: [],
    isPending: false,
    error: null,
  },
};

const searchClients = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    clients: {
      ...state.clients,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { clients = [] }) => ({
    ...state,
    clients: {
      ...state.clients,
      data: clients,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    clients: {
      ...state.clients,
      isPending: false,
      error,
    },
  }),
  clear: (state = INITIAL_STATE) => ({
    ...state,
    clients: INITIAL_STATE.clients,
  }),
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SEARCH_CLIENTS_REQUEST]: searchClients.request,
  [Types.SEARCH_CLIENTS_SUCCESS]: searchClients.success,
  [Types.SEARCH_CLIENTS_FAILURE]: searchClients.failure,
  [Types.SEARCH_CLIENTS_CLEAR]: searchClients.clear,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
