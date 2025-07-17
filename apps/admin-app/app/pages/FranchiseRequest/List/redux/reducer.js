import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  franchiseRequestList: {
    data: [],
    total: 0,
    isPending: false,
  },
  franchiseRequestEnums: {
    data: {},
    isPending: false,
  },
  franchiseRequestListColumns: {
    data: [],
    isPending: false,
  },
};

export const franchiseRequestListColumnsRequest = state => {
  return {
    ...state,
    franchiseRequestListColumns: {
      ...state.franchiseRequestListColumns,
      isPending: true,
    },
  };
};

export const franchiseRequestListColumnsSuccess = (state, { data = [] }) => {
  return {
    ...state,
    franchiseRequestListColumns: {
      ...state.franchiseRequestListColumns,
      data,
      isPending: false,
    },
  };
};

export const franchiseRequestListColumnsFailure = state => {
  return {
    ...state,
    franchiseRequestListColumns: {
      ...state.franchiseRequestListColumns,
      data: [],
      isPending: false,
    },
  };
};
export const franchiseRequestListRequest = state => {
  return {
    ...state,
    franchiseRequestList: {
      ...state.franchiseRequestList,
      isPending: true,
    },
  };
};

export const franchiseRequestListSuccess = (state, { data = [], total = 0 }) => {
  return {
    ...state,
    franchiseRequestList: {
      ...state.franchiseRequestList,
      data,
      total,
      isPending: false,
    },
  };
};

export const franchiseRequestListFailure = state => {
  return {
    ...state,
    franchiseRequestList: {
      ...state.franchiseRequestList,
      data: [],
      total: 0,
      isPending: false,
    },
  };
};

export const franchiseRequestListReportRequest = state => {
  return {
    ...state,
    franchiseRequestList: {
      ...state.franchiseRequestList,
      isPending: true,
    },
  };
};

export const franchiseRequestListReportSuccess = state => {
  return {
    ...state,
    franchiseRequestList: {
      ...state.franchiseRequestList,
      isPending: false,
    },
  };
};

export const franchiseRequestListReportFailure = state => {
  return {
    ...state,
    franchiseRequestList: {
      ...state.franchiseRequestList,
      isPending: false,
    },
  };
};

export const franchiseRequestEnumsRequest = state => {
  return {
    ...state,
    franchiseRequestEnums: {
      ...state.franchiseRequestEnums,
      isPending: true,
    },
  };
};

export const franchiseRequestEnumsSuccess = (state, { data = {} }) => {
  return {
    ...state,
    franchiseRequestEnums: {
      ...state.franchiseRequestEnums,
      data,
      isPending: false,
    },
  };
};

export const franchiseRequestEnumsFailure = state => {
  return {
    ...state,
    franchiseRequestEnums: {
      ...state.franchiseRequestEnums,
      data: {},
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FRANCHISE_REQUEST_LIST_COLUMNS_REQUEST]: franchiseRequestListColumnsRequest,
  [Types.GET_FRANCHISE_REQUEST_LIST_COLUMNS_SUCCESS]: franchiseRequestListColumnsSuccess,
  [Types.GET_FRANCHISE_REQUEST_LIST_COLUMNS_FAILURE]: franchiseRequestListColumnsFailure,
  [Types.GET_FRANCHISE_REQUEST_LIST_REQUEST]: franchiseRequestListRequest,
  [Types.GET_FRANCHISE_REQUEST_LIST_SUCCESS]: franchiseRequestListSuccess,
  [Types.GET_FRANCHISE_REQUEST_LIST_FAILURE]: franchiseRequestListFailure,
  [Types.GET_FRANCHISE_REQUEST_ENUMS_REQUEST]: franchiseRequestEnumsRequest,
  [Types.GET_FRANCHISE_REQUEST_ENUMS_SUCCESS]: franchiseRequestEnumsSuccess,
  [Types.GET_FRANCHISE_REQUEST_ENUMS_FAILURE]: franchiseRequestEnumsFailure,
  [Types.GET_FRANCHISE_REQUEST_LIST_REPORT_REQUEST]: franchiseRequestListReportRequest,
  [Types.GET_FRANCHISE_REQUEST_LIST_REPORT_SUCCESS]: franchiseRequestListReportSuccess,
  [Types.GET_FRANCHISE_REQUEST_LIST_REPORT_FAILURE]: franchiseRequestListReportFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
