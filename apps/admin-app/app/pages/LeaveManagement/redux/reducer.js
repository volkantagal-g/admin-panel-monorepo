import { createReducer } from 'reduxsauce';

import { EMPLOYEE_LEAVE_STATUSES } from '@shared/shared/constants';

import { Types } from './actions';

export const INITIAL_STATE = {
  leaveRequests: {
    isPending: false,
    data: [],
    total: 0,
  },
  batchLeaveRequests: {
    isPending: false,
    isSuccess: true,
    data: [],
  },
  leaveDetail: {
    isPending: false,
    data: {},
  },
  approveLeaveRequest: {
    isPending: false,
    isSuccess: true,
    data: {},
  },
  rejectLeaveRequest: {
    isPending: false,
    isSuccess: true,
    data: {},
  },
  cancelLeaveRequest: {
    isPending: false,
    isSuccess: true,
    data: {},
  },
  signedUrl: { isPending: false },
  leaveTypes: {
    data: [],
    isPending: false,
  },
  leaveExcel: { isPending: false },
};

export const leaveRequestsRequest = st => {
  const stepKey = `leaveRequests_${st}`;
  return state => ({
    ...state,
    [stepKey]: {
      ...(state[stepKey] || INITIAL_STATE.leaveRequests),
      isPending: true,
    },
  });
};

export const leaveRequestsSuccess = st => {
  const stepKey = `leaveRequests_${st}`;
  return (state, { data = [], total }) => ({
    ...state,
    [stepKey]: {
      ...(state[stepKey] || INITIAL_STATE.leaveRequests),
      isPending: false,
      data,
      total,
    },
  });
};

export const leaveRequestsFailure = st => {
  const stepKey = `leaveRequests_${st}`;
  return state => ({
    ...state,
    [stepKey]: {
      ...(state[stepKey] || INITIAL_STATE.leaveRequests),
      isPending: false,
      data: [],
    },
  });
};

const batchLeaveRequestsRequest = state => ({
  ...state,
  batchLeaveRequests: {
    ...state.batchLeaveRequests,
    isSuccess: false,
    isPending: true,
    data: [],
  },
});

const batchLeaveRequestsSuccess = (state, { data }) => ({
  ...state,
  batchLeaveRequests: {
    ...state.batchLeaveRequests,
    isSuccess: true,
    isPending: false,
    data,
  },
});

const batchLeaveRequestsFailure = state => ({
  ...state,
  batchLeaveRequests: {
    ...state.batchLeaveRequests,
    isSuccess: false,
    isPending: false,
  },
});

const leaveDetailRequest = state => ({
  ...state,
  leaveDetail: {
    ...state.leaveDetail,
    isPending: true,
    data: {},
  },
});

const leaveDetailSuccess = (state, { data }) => ({
  ...state,
  leaveDetail: {
    ...state.leaveDetail,
    isPending: false,
    data,
  },
});

const leaveDetailFailure = state => ({
  ...state,
  leaveDetail: {
    ...state.leaveDetail,
    isPending: false,
  },
});

const approveLeaveRequestRequest = state => ({
  ...state,
  approveLeaveRequest: {
    ...state.approveLeaveRequest,
    isSuccess: false,
    isPending: true,
    data: {},
  },
});

const approveLeaveRequestSuccess = (state, { data }) => ({
  ...state,
  approveLeaveRequest: {
    ...state.approveLeaveRequest,
    isSuccess: true,
    isPending: false,
    data,
  },
});

const approveLeaveRequestFailure = state => ({
  ...state,
  approveLeaveRequest: {
    ...state.approveLeaveRequest,
    isSuccess: false,
    isPending: false,
  },
});

const rejectLeaveRequestRequest = state => ({
  ...state,
  rejectLeaveRequest: {
    ...state.rejectLeaveRequest,
    isSuccess: false,
    isPending: true,
    data: {},
  },
});

const rejectLeaveRequestSuccess = (state, { data }) => ({
  ...state,
  rejectLeaveRequest: {
    ...state.rejectLeaveRequest,
    isSuccess: true,
    isPending: false,
    data,
  },
});

const rejectLeaveRequestFailure = state => ({
  ...state,
  rejectLeaveRequest: {
    ...state.rejectLeaveRequest,
    isSuccess: false,
    isPending: false,
  },
});

const cancelLeaveRequestRequest = state => ({
  ...state,
  cancelLeaveRequest: {
    ...state.cancelLeaveRequest,
    isSuccess: false,
    isPending: true,
    data: {},
  },
});

const cancelLeaveRequestSuccess = (state, { data }) => ({
  ...state,
  cancelLeaveRequest: {
    ...state.cancelLeaveRequest,
    isSuccess: true,
    isPending: false,
    data,
  },
});

const cancelLeaveRequestFailure = state => ({
  ...state,
  cancelLeaveRequest: {
    ...state.cancelLeaveRequest,
    isSuccess: false,
    isPending: false,
  },
});

export const signedUrlRequest = state => ({
  ...state,
  signedUrl: { isPending: true },
});

export const signedUrlSuccess = state => ({
  ...state,
  signedUrl: { isPending: false },
});

export const signedUrlFailure = state => ({
  ...state,
  signedUrl: { isPending: false },
});

const getLeaveTypesRequest = state => ({
  ...state,
  leaveTypes: {
    ...state.leaveTypes,
    isPending: true,
    data: [],
  },
});

const getLeaveTypesSuccess = (state, { data }) => ({
  ...state,
  leaveTypes: {
    ...state.leaveTypes,
    isPending: false,
    data,
  },
});

const getLeaveTypesFailure = state => ({
  ...state,
  leaveTypes: {
    ...state.leaveTypes,
    isPending: false,
  },
});

const getLeaveExcelRequest = state => ({
  ...state,
  leaveExcel: { isPending: true },
});

const getLeaveExcelSuccess = state => ({
  ...state,
  leaveExcel: { isPending: false },
});

const getLeaveExcelFailure = state => ({
  ...state,
  leaveExcel: { isPending: false },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  ...Object.values(EMPLOYEE_LEAVE_STATUSES).reduce(
    (acc, key) => ({
      ...acc,
      [Types[`GET_LEAVE_REQUESTS_REQUEST${key}`]]:
        leaveRequestsRequest(key),
      [Types[`GET_LEAVE_REQUESTS_SUCCESS${key}`]]:
        leaveRequestsSuccess(key),
      [Types[`GET_LEAVE_REQUESTS_FAILURE${key}`]]:
        leaveRequestsFailure(key),
    }),
    {},
  ),
  [Types.BATCH_LEAVE_REQUESTS_REQUEST]: batchLeaveRequestsRequest,
  [Types.BATCH_LEAVE_REQUESTS_SUCCESS]: batchLeaveRequestsSuccess,
  [Types.BATCH_LEAVE_REQUESTS_FAILURE]: batchLeaveRequestsFailure,
  [Types.GET_LEAVE_DETAIL_REQUEST]: leaveDetailRequest,
  [Types.GET_LEAVE_DETAIL_SUCCESS]: leaveDetailSuccess,
  [Types.GET_LEAVE_DETAIL_FAILURE]: leaveDetailFailure,
  [Types.APPROVE_LEAVE_REQUEST_REQUEST]: approveLeaveRequestRequest,
  [Types.APPROVE_LEAVE_REQUEST_SUCCESS]: approveLeaveRequestSuccess,
  [Types.APPROVE_LEAVE_REQUEST_FAILURE]: approveLeaveRequestFailure,
  [Types.REJECT_LEAVE_REQUEST_REQUEST]: rejectLeaveRequestRequest,
  [Types.REJECT_LEAVE_REQUEST_SUCCESS]: rejectLeaveRequestSuccess,
  [Types.REJECT_LEAVE_REQUEST_FAILURE]: rejectLeaveRequestFailure,
  [Types.CANCEL_LEAVE_REQUEST_REQUEST]: cancelLeaveRequestRequest,
  [Types.CANCEL_LEAVE_REQUEST_SUCCESS]: cancelLeaveRequestSuccess,
  [Types.CANCEL_LEAVE_REQUEST_FAILURE]: cancelLeaveRequestFailure,
  [Types.GET_SIGNED_URL_REQUEST]: signedUrlRequest,
  [Types.GET_SIGNED_URL_SUCCESS]: signedUrlSuccess,
  [Types.GET_SIGNED_URL_FAILURE]: signedUrlFailure,
  [Types.GET_LEAVE_TYPES_REQUEST]: getLeaveTypesRequest,
  [Types.GET_LEAVE_TYPES_SUCCESS]: getLeaveTypesSuccess,
  [Types.GET_LEAVE_TYPES_FAILURE]: getLeaveTypesFailure,
  [Types.GET_LEAVE_EXCEL_REQUEST]: getLeaveExcelRequest,
  [Types.GET_LEAVE_EXCEL_SUCCESS]: getLeaveExcelSuccess,
  [Types.GET_LEAVE_EXCEL_FAILURE]: getLeaveExcelFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
