import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  contract: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
};

export const getContractRequest = state => {
  return {
    ...state,
    contract: {
      ...state.contract,
      isPending: true,
    },
  };
};

export const getContractSuccess = (state, { data, total }) => {
  return {
    ...state,
    contract: {
      ...state.contract,
      data,
      total,
      isPending: false,
    },
  };
};

export const getContractFailure = (state, { error }) => {
  return {
    ...state,
    contract: {
      ...state.contract,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CONTRACT_REQUEST]: getContractRequest,
  [Types.GET_CONTRACT_SUCCESS]: getContractSuccess,
  [Types.GET_CONTRACT_FAILURE]: getContractFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
