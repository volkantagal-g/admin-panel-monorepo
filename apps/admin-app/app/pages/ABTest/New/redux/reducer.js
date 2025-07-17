import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
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

const createABTestRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createABTest: {
      ...state.createABTest,
      isPending: true,
    },
  };
};

const createABTestSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createABTest: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const createABTestFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createABTest: {
      ...state.createABTest,
      error,
      isPending: false,
    },
  };
};

const importVariationsCSVFileRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    importVariationsCSVFile: {
      ...state.importVariationsCSVFile,
      isPending: true,
    },
  };
};

const importVariationsCSVFileSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    importVariationsCSVFile: {
      data: {
        ...state.importVariationsCSVFile.data,
        ...data,
      },
      isPending: false,
      error: null,
    },
  };
};

const importVariationsCSVFileFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    importVariationsCSVFile: {
      ...state.importVariationsCSVFile,
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
  [Types.CREATE_AB_TEST_REQUEST]: createABTestRequest,
  [Types.CREATE_AB_TEST_SUCCESS]: createABTestSuccess,
  [Types.CREATE_AB_TEST_FAILURE]: createABTestFailure,
  [Types.GET_CLIENT_LIST_TEMPLATES_REQUEST]: getClientListTemplatesRequest,
  [Types.GET_CLIENT_LIST_TEMPLATES_SUCCESS]: getClientListTemplatesSuccess,
  [Types.GET_CLIENT_LIST_TEMPLATES_FAILURE]: getClientListTemplatesFailure,
  [Types.IMPORT_VARIATIONS_CSV_FILE_REQUEST]: importVariationsCSVFileRequest,
  [Types.IMPORT_VARIATIONS_CSV_FILE_SUCCESS]: importVariationsCSVFileSuccess,
  [Types.IMPORT_VARIATIONS_CSV_FILE_FAILURE]: importVariationsCSVFileFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
