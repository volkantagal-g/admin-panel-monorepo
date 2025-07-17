import { createReducer } from 'reduxsauce';

import { GROUP_STATUS_LIST, SORT_OPTIONS } from '../constants';
import { Types } from './actions';

export const INITIAL_STATE = {
  returns: {
    data: [],
    isPending: false,
    totalCount: 0,
    error: null,
  },
  returnDetail: {
    data: {},
    isPending: false,
    error: null,
  },
  filters: {
    startDate: undefined,
    endDate: undefined,
    groupStatus: GROUP_STATUS_LIST[0].value,
    statuses: [],
    sort: SORT_OPTIONS.selectedSlotDate_descend,
    deliveryType: '',
    confirmationId: '',
    returnCode: '',
    userType: '1',
    page: 1,
  },
  returnRespondApprove: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getReturnRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    returns: {
      ...INITIAL_STATE.returns,
      isPending: true,
    },
  };
};

export const getReturnRequestSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    returns: {
      ...INITIAL_STATE.returns,
      data: data.returns,
      totalCount: data.totalCount,
      isPending: false,
    },
  };
};

export const getReturnRequestFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    returns: {
      ...INITIAL_STATE.returns,
      isPending: false,
      error,
    },
  };
};

export const postReturnRespondRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    returnRespondApprove: {
      ...INITIAL_STATE.returnRespondApprove,
      isPending: true,
    },
  };
};

export const postReturnRespondRequestSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    returnRespondApprove: {
      ...INITIAL_STATE.returnRespondApprove,
      data,
      isPending: false,
    },
  };
};

export const postReturnRespondRequestFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    returnRespondApprove: {
      ...INITIAL_STATE.returnRespondApprove,
      isPending: false,
      error,
    },
  };
};

export const getReturnDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    returnDetail: {
      ...INITIAL_STATE.returnDetail,
      isPending: true,
    },
  };
};

export const getReturnDetailRequestSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state,
    returnDetail: {
      ...INITIAL_STATE.returnDetail,
      data,
      isPending: false,
    },
  };
};

export const getReturnDetailRequestFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state,
    returnDetail: {
      ...INITIAL_STATE.returnDetail,
      isPending: false,
      error,
    },
  };
};

export const setFilter = (state = INITIAL_STATE, { key, value }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      [key]: value,
    },
  };
};
export const resetFilter = () => {
  return { ...INITIAL_STATE };
};

export const setDates = (state = INITIAL_STATE, { dates }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      startDate: dates[0],
      endDate: dates[1],
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_RETURN_REQUEST]: getReturnRequest,
  [Types.GET_RETURN_REQUEST_SUCCESS]: getReturnRequestSuccess,
  [Types.GET_RETURN_REQUEST_FAILURE]: getReturnRequestFailure,
  [Types.GET_RETURN_DETAIL_REQUEST]: getReturnDetailRequest,
  [Types.GET_RETURN_DETAIL_REQUEST_SUCCESS]: getReturnDetailRequestSuccess,
  [Types.GET_RETURN_DETAIL_REQUEST_FAILURE]: getReturnDetailRequestFailure,
  [Types.GET_RETURN_STATUSES_REQUEST]: getReturnDetailRequestFailure,
  [Types.POST_RETURN_RESPOND_REQUEST]: postReturnRespondRequest,
  [Types.POST_RETURN_RESPOND_REQUEST_SUCCESS]: postReturnRespondRequestSuccess,
  [Types.POST_RETURN_RESPOND_REQUEST_FAILURE]: postReturnRespondRequestFailure,
  [Types.SET_FILTER]: setFilter,
  [Types.RESET_FILTER]: resetFilter,
  [Types.SET_DATES]: setDates,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
