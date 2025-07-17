import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  transferGroups: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
};

export const getTransferGroupsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    transferGroups: {
      ...INITIAL_STATE.transferGroups,
      isPending: true,
    },
  };
};

export const getTransferGroupsSuccess = (state = INITIAL_STATE, { data, total }) => {
  return {
    ...state,
    transferGroups: {
      ...INITIAL_STATE.transferGroups,
      total,
      data,
      isPending: false,
    },
  };
};

export const getTransferGroupsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    transferGroups: {
      ...INITIAL_STATE.transferGroups,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_TRANSFER_GROUPS_REQUEST]: getTransferGroupsRequest,
  [Types.GET_TRANSFER_GROUPS_SUCCESS]: getTransferGroupsSuccess,
  [Types.GET_TRANSFER_GROUPS_FAILURE]: getTransferGroupsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
