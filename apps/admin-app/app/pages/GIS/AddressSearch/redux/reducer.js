import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  addresses: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const addressSearchRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    addresses: {
      ...state.addresses,
      isPending: true,
    },
  };
};
export const addressSearchSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    addresses: {
      ...state.addresses,
      data,
      isPending: false,
    },
  };
};

export const addressSearchFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    addresses: {
      ...state.addresses,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.DESTROY_PAGE]: destroy,
  [Types.ADDRESS_SEARCH_REQUEST]: addressSearchRequest,
  [Types.ADDRESS_SEARCH_SUCCESS]: addressSearchSuccess,
  [Types.ADDRESS_SEARCH_FAILURE]: addressSearchFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
