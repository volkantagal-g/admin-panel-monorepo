import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getTest: {
    data: {},
    error: null,
    isPending: false,
  },
  updateABTest: {
    data: {},
    error: null,
    isPending: false,
  },
  getClientListTemplates: {
    data: [],
    error: null,
    isPending: false,
  },
  startTest: {
    data: [],
    error: null,
    isPending: false,
  },
  stopTest: {
    data: [],
    error: null,
    isPending: false,
  },
  completeTest: {
    data: [],
    error: null,
    isPending: false,
  },
  excludeDates: [],
  testStatus: null,
};

const setExcludeDates = (state, { excludeDates }) => {
  return {
    ...state,
    excludeDates,
  };
};

const getTestRequest = state => {
  return {
    ...state,
    getTest: {
      ...state.getTest,
      isPending: true,
    },
    excludeDates: [],
    testStatus: null,
  };
};

const getTestSuccess = (state, { data }) => {
  return {
    ...state,
    getTest: {
      data,
      isPending: false,
      error: null,
    },
    excludeDates: data?.excludeDate || [],
    testStatus: data?.testStatus,
  };
};

const getTestFailure = (state, { error }) => {
  return {
    ...state,
    getTest: {
      ...state.getTest,
      data: null,
      error,
      isPending: false,
    },
    excludeDates: [],
    testStatus: null,
  };
};

const getTestStatusSuccess = (state, { testStatus }) => {
  return {
    ...state,
    testStatus,
  };
};

const getTestStatusFailure = (state, { error }) => {
  return {
    ...state,
    testStatus: null,
    error,
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

const updateABTestRequest = state => {
  return {
    ...state,
    updateABTest: {
      ...state.updateABTest,
      isPending: true,
    },
  };
};

const updateABTestSuccess = (state, { data }) => {
  return {
    ...state,
    updateABTest: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const updateABTestFailure = (state, { error }) => {
  return {
    ...state,
    updateABTest: {
      ...state.updateABTest,
      error,
      isPending: false,
    },
  };
};

const startABTestRequest = state => {
  return {
    ...state,
    startTest: {
      ...state.startTest,
      isPending: true,
    },
  };
};

const startABTestSuccess = (state, { data }) => {
  return {
    ...state,
    startTest: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const startABTestFailure = (state, { error }) => {
  return {
    ...state,
    startTest: {
      ...state.startTest,
      error,
      isPending: false,
    },
  };
};

const stopABTestRequest = state => {
  return {
    ...state,
    stopTest: {
      ...state.stopTest,
      isPending: true,
    },
  };
};

const stopABTestSuccess = (state, { data }) => {
  return {
    ...state,
    stopTest: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const stopABTestFailure = (state, { error }) => {
  return {
    ...state,
    stopTest: {
      ...state.stopTest,
      error,
      isPending: false,
    },
  };
};

const completeABTestRequest = state => {
  return {
    ...state,
    completeTest: {
      ...state.completeTest,
      isPending: true,
    },
  };
};

const completeABTestSuccess = (state, { data }) => {
  return {
    ...state,
    completeTest: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const completeABTestFailure = (state, { error }) => {
  return {
    ...state,
    completeTest: {
      ...state.completeTest,
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
  [Types.SET_EXCLUDE_DATES]: setExcludeDates,
  [Types.GET_TEST_REQUEST]: getTestRequest,
  [Types.GET_TEST_SUCCESS]: getTestSuccess,
  [Types.GET_TEST_FAILURE]: getTestFailure,
  [Types.GET_TEST_STATUS_SUCCESS]: getTestStatusSuccess,
  [Types.GET_TEST_STATUS_FAILURE]: getTestStatusFailure,
  [Types.UPDATE_AB_TEST_REQUEST]: updateABTestRequest,
  [Types.UPDATE_AB_TEST_SUCCESS]: updateABTestSuccess,
  [Types.UPDATE_AB_TEST_FAILURE]: updateABTestFailure,
  [Types.GET_CLIENT_LIST_TEMPLATES_REQUEST]: getClientListTemplatesRequest,
  [Types.GET_CLIENT_LIST_TEMPLATES_SUCCESS]: getClientListTemplatesSuccess,
  [Types.GET_CLIENT_LIST_TEMPLATES_FAILURE]: getClientListTemplatesFailure,
  [Types.START_AB_TEST_REQUEST]: startABTestRequest,
  [Types.START_AB_TEST_SUCCESS]: startABTestSuccess,
  [Types.START_AB_TEST_FAILURE]: startABTestFailure,
  [Types.STOP_AB_TEST_REQUEST]: stopABTestRequest,
  [Types.STOP_AB_TEST_SUCCESS]: stopABTestSuccess,
  [Types.STOP_AB_TEST_FAILURE]: stopABTestFailure,
  [Types.COMPLETE_AB_TEST_REQUEST]: completeABTestRequest,
  [Types.COMPLETE_AB_TEST_SUCCESS]: completeABTestSuccess,
  [Types.COMPLETE_AB_TEST_FAILURE]: completeABTestFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
