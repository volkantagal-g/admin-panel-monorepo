import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createTransferGroup: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createTransferGroupRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createTransferGroup: {
      ...INITIAL_STATE.createTransferGroup,
      isPending: true,
    },
  };
};

export const createTransferGroupSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createTransferGroup: {
      ...INITIAL_STATE.createTransferGroup,
      data,
      isPending: false,
    },
  };
};

export const createTransferGroupFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createTransferGroup: {
      ...INITIAL_STATE.createTransferGroup,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_TRANSFER_GROUP_REQUEST]: createTransferGroupRequest,
  [Types.CREATE_TRANSFER_GROUP_SUCCESS]: createTransferGroupSuccess,
  [Types.CREATE_TRANSFER_GROUP_FAILURE]: createTransferGroupFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
