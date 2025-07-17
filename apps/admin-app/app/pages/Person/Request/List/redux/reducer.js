import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  informationEditRequestList: {
    data: [],
    total: 0,
    isPending: false,
  },
};

export const informationEditRequestListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    informationEditRequestList: {
      ...state.informationEditRequestList,
      isPending: true,
    },
  };
};

export const informationEditRequestListSuccess = (state = INITIAL_STATE, { data = [], total = 0 }) => {
  return {
    ...state,
    informationEditRequestList: {
      ...state.informationEditRequestList,
      data,
      total,
      isPending: false,
    },
  };
};

export const informationEditRequestListFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    informationEditRequestList: {
      ...state.informationEditRequestList,
      data: [],
      total: 0,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_INFORMATION_EDIT_REQUEST_LIST_REQUEST]: informationEditRequestListRequest,
  [Types.GET_INFORMATION_EDIT_REQUEST_LIST_SUCCESS]: informationEditRequestListSuccess,
  [Types.GET_INFORMATION_EDIT_REQUEST_LIST_FAILURE]: informationEditRequestListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
