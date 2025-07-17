import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getArtisanStoresByName: {
    isPending: false,
    data: [],
    error: null,
  },
};

export const getArtisanStoresByNameRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getArtisanStoresByName: {
      ...INITIAL_STATE.getArtisanStoresByName,
      isPending: true,
    },
  };
};

export const getArtisanStoresByNameSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getArtisanStoresByName: {
      ...INITIAL_STATE.getArtisanStoresByName,
      data,
      isPending: false,
    },
  };
};

export const getArtisanStoresByNameFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getArtisanStoresByName: {
      ...INITIAL_STATE.getArtisanStoresByName,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_ARTISAN_STORES_BY_NAME_REQUEST]: getArtisanStoresByNameRequest,
  [Types.GET_ARTISAN_STORES_BY_NAME_SUCCESS]: getArtisanStoresByNameSuccess,
  [Types.GET_ARTISAN_STORES_BY_NAME_FAILURE]: getArtisanStoresByNameFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
