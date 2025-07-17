import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getABTests: {
    data: null,
    error: null,
    isPending: false,
  },
  filters: {},
};

const getABTestsRequest = state => {
  return {
    ...state,
    getABTests: {
      ...state.getABTests,
      isPending: true,
    },
  };
};

const getABTestsSuccess = (state, { data, count }) => {
  return {
    ...state,
    getABTests: {
      data,
      count,
      isPending: false,
      error: null,
    },
  };
};

const getABTestsFailure = (state, { error }) => {
  return {
    ...state,
    getABTests: {
      ...state.getABTests,
      error,
      isPending: false,
    },
  };
};

const setFilters = (state, { requestData }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...requestData,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_AB_TESTS_REQUEST]: getABTestsRequest,
  [Types.GET_AB_TESTS_SUCCESS]: getABTestsSuccess,
  [Types.GET_AB_TESTS_FAILURE]: getABTestsFailure,
  [Types.SET_FILTERS]: setFilters,
};

export default createReducer(INITIAL_STATE, HANDLERS);
