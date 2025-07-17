import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  pageOwners: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getPageOwnersRequest = state => {
  return {
    ...state,
    pageOwners: {
      ...INITIAL_STATE.pageOwners,
      isPending: true,
    },
  };
};

export const getPageOwnersSuccess = (state, { data }) => {
  return {
    ...state,
    pageOwners: {
      ...INITIAL_STATE.pageOwners,
      data,
      isPending: false,
    },
  };
};

export const getPageOwnersFailure = (state, { error }) => {
  return {
    ...state,
    pageOwners: {
      ...INITIAL_STATE.pageOwners,
      isPending: false,
      error,
    },
  };
};

const destroy = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_PAGE_OWNERS_REQUEST]: getPageOwnersRequest,
  [Types.GET_PAGE_OWNERS_SUCCESS]: getPageOwnersSuccess,
  [Types.GET_PAGE_OWNERS_FAILURE]: getPageOwnersFailure,

  [Types.DESTROY_APP_LAYOUT]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
