import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  data: [],
  error: null,
};
export const getArtisanVerticalsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getArtisanVerticalsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,
  };
};

export const getArtisanVerticalsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ARTISAN_VERTICALS_REQUEST]: getArtisanVerticalsRequest,
  [Types.GET_ARTISAN_VERTICALS_SUCCESS]: getArtisanVerticalsSuccess,
  [Types.GET_ARTISAN_VERTICALS_FAILURE]: getArtisanVerticalsFailure,

  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
