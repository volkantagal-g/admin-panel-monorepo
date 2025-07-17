import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  data: [],
  error: null,
};

export const getArtisanCuisineTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getArtisanCuisineTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,
  };
};

export const getArtisanCuisineTypesFailure = (state = INITIAL_STATE, { error }) => {
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
  [Types.GET_ARTISAN_CUISINE_TYPES_REQUEST]: getArtisanCuisineTypesRequest,
  [Types.GET_ARTISAN_CUISINE_TYPES_SUCCESS]: getArtisanCuisineTypesSuccess,
  [Types.GET_ARTISAN_CUISINE_TYPES_FAILURE]: getArtisanCuisineTypesFailure,

  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
