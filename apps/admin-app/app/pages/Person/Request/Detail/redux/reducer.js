import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  informationEditRequestDetail: {
    data: {},
    isPending: false,
  },
};

export const informationEditRequestDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    informationEditRequestDetail: {
      ...state.informationEditRequestDetail,
      isPending: true,
    },
  };
};

export const informationEditRequestDetailSuccess = (state = INITIAL_STATE, { data = {} }) => {
  return {
    ...state,
    informationEditRequestDetail: {
      ...state.informationEditRequestDetail,
      data,
      isPending: false,
    },
  };
};

export const informationEditRequestDetailFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    informationEditRequestDetail: {
      ...state.informationEditRequestDetail,
      data: {},
      isPending: false,
    },
  };
};

export const acceptInformationEditRequestDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    informationEditRequestDetail: {
      ...state.informationEditRequestDetail,
      isPending: true,
    },
  };
};

export const acceptInformationEditRequestDetailSuccess = (state = INITIAL_STATE, { data = {} }) => {
  return {
    ...state,
    informationEditRequestDetail: {
      ...state.informationEditRequestDetail,
      data,
      isPending: false,
    },
  };
};

export const acceptInformationEditRequestDetailFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    informationEditRequestDetail: {
      ...state.informationEditRequestDetail,
      data: {},
      isPending: false,
    },
  };
};

export const rejectInformationEditRequestDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    informationEditRequestDetail: {
      ...state.informationEditRequestDetail,
      isPending: true,
    },
  };
};

export const rejectInformationEditRequestDetailSuccess = (state = INITIAL_STATE, { data = {} }) => {
  return {
    ...state,
    informationEditRequestDetail: {
      ...state.informationEditRequestDetail,
      data,
      isPending: false,
    },
  };
};

export const rejectInformationEditRequestDetailFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    informationEditRequestDetail: {
      ...state.informationEditRequestDetail,
      data: {},
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_INFORMATION_EDIT_REQUEST_DETAIL_REQUEST]: informationEditRequestDetailRequest,
  [Types.GET_INFORMATION_EDIT_REQUEST_DETAIL_SUCCESS]: informationEditRequestDetailSuccess,
  [Types.GET_INFORMATION_EDIT_REQUEST_DETAIL_FAILURE]: informationEditRequestDetailFailure,
  [Types.ACCEPT_INFORMATION_EDIT_REQUEST_DETAIL_REQUEST]: acceptInformationEditRequestDetailRequest,
  [Types.ACCEPT_INFORMATION_EDIT_REQUEST_DETAIL_SUCCESS]: acceptInformationEditRequestDetailSuccess,
  [Types.ACCEPT_INFORMATION_EDIT_REQUEST_DETAIL_FAILURE]: acceptInformationEditRequestDetailFailure,
  [Types.REJECT_INFORMATION_EDIT_REQUEST_DETAIL_REQUEST]: rejectInformationEditRequestDetailRequest,
  [Types.REJECT_INFORMATION_EDIT_REQUEST_DETAIL_SUCCESS]: rejectInformationEditRequestDetailSuccess,
  [Types.REJECT_INFORMATION_EDIT_REQUEST_DETAIL_FAILURE]: rejectInformationEditRequestDetailFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
