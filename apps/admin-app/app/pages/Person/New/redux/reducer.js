import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = { form: { isPending: false } };

export const createPersonRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    form: {
      ...state.form,
      isPending: true,
    },
  };
};

export const createPersonSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    form: {
      ...state.form,
      isPending: false,
    },
  };
};

export const createPersonFailure = (state = INITIAL_STATE) => createPersonSuccess(state);

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_PERSON_REQUEST]: createPersonRequest,
  [Types.CREATE_PERSON_SUCCESS]: createPersonSuccess,
  [Types.CREATE_PERSON_FAILURE]: createPersonFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
