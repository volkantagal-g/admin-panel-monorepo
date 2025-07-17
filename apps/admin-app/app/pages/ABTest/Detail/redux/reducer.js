import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getTest: {
    data: {},
    error: null,
    isPending: false,
  },
  getClientListTemplates: {
    data: [],
    error: null,
    isPending: false,
  },
};

const getTestRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getTest: {
      ...state.getTest,
      isPending: true,
    },
  };
};

const getTestSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getTest: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getTestFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getTest: {
      ...state.getTest,
      error,
      isPending: false,
    },
  };
};

const getClientListTemplatesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getClientListTemplates: {
      ...state.getClientListTemplates,
      isPending: true,
    },
  };
};

const getClientListTemplatesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getClientListTemplates: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getClientListTemplatesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getClientListTemplates: {
      ...state.getClientListTemplates,
      error,
      isPending: false,
    },
  };
};

const updateABTestRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getTest: {
      ...state.getTest,
      isPending: true,
    },
  };
};

const updateABTestSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getTest: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const updateABTestFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getTest: {
      ...state.getTest,
      error,
      isPending: false,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_TEST_REQUEST]: getTestRequest,
  [Types.GET_TEST_SUCCESS]: getTestSuccess,
  [Types.GET_TEST_FAILURE]: getTestFailure,
  [Types.UPDATE_AB_TEST_REQUEST]: updateABTestRequest,
  [Types.UPDATE_AB_TEST_SUCCESS]: updateABTestSuccess,
  [Types.UPDATE_AB_TEST_FAILURE]: updateABTestFailure,
  [Types.GET_CLIENT_LIST_TEMPLATES_REQUEST]: getClientListTemplatesRequest,
  [Types.GET_CLIENT_LIST_TEMPLATES_SUCCESS]: getClientListTemplatesSuccess,
  [Types.GET_CLIENT_LIST_TEMPLATES_FAILURE]: getClientListTemplatesFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
