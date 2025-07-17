import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = { setVisibility: { data: false } };

export const setVisibility = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    setVisibility: {
      ...INITIAL_STATE.setVisibility,
      data,
    },
  };
};

export const HANDLERS = { [Types.SET_VISIBILITY]: setVisibility };

export default createReducer(INITIAL_STATE, HANDLERS);
