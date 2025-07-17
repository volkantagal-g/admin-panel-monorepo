import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  content: '',
};

export const createConnectedContentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const createConnectedContentSuccess = (state = INITIAL_STATE, { content }) => {
  return {
    ...state,
    content,
    isPending: false,
  };
};

export const createConnectedContentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

export const resetConnectedContent = (state = INITIAL_STATE) => {
  return {
    ...state,
    content: '',
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_CONNECTED_CONTENT_REQUEST]: createConnectedContentRequest,
  [Types.CREATE_CONNECTED_CONTENT_SUCCESS]: createConnectedContentSuccess,
  [Types.CREATE_CONNECTED_CONTENT_FAILURE]: createConnectedContentFailure,

  [Types.RESET_CONNECTED_CONTENT]: resetConnectedContent,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
