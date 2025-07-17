import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createComponent: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const createComponentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createComponent: {
      ...INITIAL_STATE.createComponent,
      isPending: true,
    },
  };
};

export const createComponentSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createComponent: {
      ...INITIAL_STATE.createComponent,
      data,
      isPending: false,
    },
  };
};

export const createComponentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createComponent: {
      ...INITIAL_STATE.createComponent,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_COMPONENT_REQUEST]: createComponentRequest,
  [Types.CREATE_COMPONENT_SUCCESS]: createComponentSuccess,
  [Types.CREATE_COMPONENT_FAILURE]: createComponentFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
