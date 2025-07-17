import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const INITIAL_STATE = { isLoading: false };

const initPage = state => ({
  ...state,
  isLoading: true,
});

const destroyPage = state => ({
  ...state,
  isLoading: false,
});

const HANDLERS = {
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export const productMatchingReducer = createReducer(INITIAL_STATE, HANDLERS);
