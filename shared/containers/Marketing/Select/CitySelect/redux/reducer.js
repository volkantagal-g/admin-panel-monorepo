import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  data: [],
  error: null,
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = { [Types.DESTROY_CONTAINER]: destroy };

export default createReducer(INITIAL_STATE, HANDLERS);
