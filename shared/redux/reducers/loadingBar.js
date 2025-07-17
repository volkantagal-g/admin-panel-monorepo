import { createReducer } from 'reduxsauce';

import { Types } from '@shared/redux/actions/loadingBar';

export const INITIAL_STATE = { status: null };

export const show = (state = INITIAL_STATE) => {
  return {
    ...state,
    status: 'show',
  };
};

export const hide = (state = INITIAL_STATE) => {
  return {
    ...state,
    status: 'hide',
  };
};

export const reset = (state = INITIAL_STATE) => {
  return {
    ...state,
    status: 'reset',
  };
};

export const HANDLERS = {
  [Types.SHOW]: show,
  [Types.HIDE]: hide,
  [Types.RESET]: reset,
};

export default createReducer(INITIAL_STATE, HANDLERS);
