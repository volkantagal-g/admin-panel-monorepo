import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  codeBulkEdit: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const codeBulkEditRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    codeBulkEdit: {
      ...INITIAL_STATE.codeBulkEdit,
      isPending: true,
    },
  };
};

export const codeBulkEditSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    codeBulkEdit: {
      ...INITIAL_STATE.codeBulkEdit,
      data,
      isPending: false,
    },
  };
};

export const codeBulkEditFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    codeBulkEdit: {
      ...INITIAL_STATE.codeBulkEdit,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CODE_BULK_EDIT_REQUEST]: codeBulkEditRequest,
  [Types.CODE_BULK_EDIT_SUCCESS]: codeBulkEditSuccess,
  [Types.CODE_BULK_EDIT_FAILURE]: codeBulkEditFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
