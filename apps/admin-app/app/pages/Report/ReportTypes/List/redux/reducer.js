import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  reportTypes: {
    data: {
      reportTypes: [],
      totalCount: 0,
    },
    isPending: false,
    error: null,
  },
  allReportTags: {
    data: [],
    isPending: false,
    error: null,
  },
};

const getReportTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reportTypes: {
      ...state.reportTypes,
      isPending: true,
    },
  };
};

const getReportTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    reportTypes: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getReportTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reportTypes: {
      data: [],
      error,
      isPending: false,
    },
  };
};

const getAllReportTagsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    allReportTags: {
      ...state.allReportTags,
      isPending: true,
    },
  };
};

const getAllReportTagsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    allReportTags: {
      ...state.allReportTags,
      isPending: false,
      data,
    },
  };
};

const getAllReportTagsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    allReportTags: {
      ...state.allReportTags,
      isPending: false,
      error,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_REPORT_TYPES_REQUEST]: getReportTypesRequest,
  [Types.GET_REPORT_TYPES_SUCCESS]: getReportTypesSuccess,
  [Types.GET_REPORT_TYPES_FAILURE]: getReportTypesFailure,
  [Types.GET_ALL_REPORT_TAGS_REQUEST]: getAllReportTagsRequest,
  [Types.GET_ALL_REPORT_TAGS_SUCCESS]: getAllReportTagsSuccess,
  [Types.GET_ALL_REPORT_TAGS_FAILURE]: getAllReportTagsFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
