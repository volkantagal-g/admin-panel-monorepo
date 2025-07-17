import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = { [Types.DESTROY_PAGE]: destroy };

export default createReducer(INITIAL_STATE, HANDLERS);
