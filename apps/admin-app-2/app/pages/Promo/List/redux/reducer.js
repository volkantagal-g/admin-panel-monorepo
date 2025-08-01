import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  promos: {
    data: [],
    isPending: false,
    totalCount: 0,
  },
};

export const getPromosRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    promos: {
      ...state.promos,
      isPending: true,
    },
  };
};

export const getPromosSuccess = (state = INITIAL_STATE, { promos = [], totalCount }) => {
  return {
    ...state,
    promos: {
      ...state.promos,
      data: promos,
      isPending: false,
      totalCount,
    },
  };
};

export const getPromosFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    promos: {
      ...state.promos,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PROMOS_REQUEST]: getPromosRequest,
  [Types.GET_PROMOS_SUCCESS]: getPromosSuccess,
  [Types.GET_PROMOS_FAILURE]: getPromosFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
