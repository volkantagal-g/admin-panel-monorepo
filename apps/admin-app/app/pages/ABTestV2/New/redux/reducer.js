import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getTestTypeList: {
    data: [],
    error: null,
    isPending: false,
  },
  createABTest: {
    data: {},
    error: null,
    isPending: false,
  },
  getClientListTemplates: {
    data: [],
    error: null,
    isPending: false,
  },
  importVariationsCSVFile: {
    data: {},
    error: null,
    isPending: false,
  },
};

const getTestTypeListRequest = state => {
  return {
    ...state,
    getTestTypeList: {
      ...state.getTestTypeList,
      isPending: true,
    },
  };
};

const getTestTypeListSuccess = (state, { data }) => {
  return {
    ...state,
    getTestTypeList: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getTestTypeListFailure = (state, { error }) => {
  return {
    ...state,
    getTestTypeList: {
      ...state.getTestTypeList,
      error,
      isPending: false,
    },
  };
};

const getClientListTemplatesRequest = state => {
  return {
    ...state,
    getClientListTemplates: {
      ...state.getClientListTemplates,
      isPending: true,
    },
  };
};

const getClientListTemplatesSuccess = (state, { data }) => {
  return {
    ...state,
    getClientListTemplates: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getClientListTemplatesFailure = (state, { error }) => {
  return {
    ...state,
    getClientListTemplates: {
      ...state.getClientListTemplates,
      error,
      isPending: false,
    },
  };
};

const createABTestRequest = state => {
  return {
    ...state,
    createABTest: {
      ...state.createABTest,
      isPending: true,
    },
  };
};

const createABTestSuccess = (state, { data }) => {
  return {
    ...state,
    createABTest: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const createABTestFailure = (state, { error }) => {
  return {
    ...state,
    createABTest: {
      ...state.createABTest,
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
  [Types.GET_TEST_TYPE_LIST_REQUEST]: getTestTypeListRequest,
  [Types.GET_TEST_TYPE_LIST_SUCCESS]: getTestTypeListSuccess,
  [Types.GET_TEST_TYPE_LIST_FAILURE]: getTestTypeListFailure,
  [Types.CREATE_AB_TEST_REQUEST]: createABTestRequest,
  [Types.CREATE_AB_TEST_SUCCESS]: createABTestSuccess,
  [Types.CREATE_AB_TEST_FAILURE]: createABTestFailure,
  [Types.GET_CLIENT_LIST_TEMPLATES_REQUEST]: getClientListTemplatesRequest,
  [Types.GET_CLIENT_LIST_TEMPLATES_SUCCESS]: getClientListTemplatesSuccess,
  [Types.GET_CLIENT_LIST_TEMPLATES_FAILURE]: getClientListTemplatesFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
