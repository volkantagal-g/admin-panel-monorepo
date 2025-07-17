import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = { createConfig: { isPending: false } };

export const createConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createConfig: {
      ...state.createConfig,
      isPending: true,
    },
  };
};

export const createConfigFailure = (state = INITIAL_STATE ) => {
  return {
    ...state,
    createConfig: {
      ...state.createConfig,
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_CONFIG_REQUEST]: createConfigRequest,
  [Types.CREATE_CONFIG_FAILURE]: createConfigFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
