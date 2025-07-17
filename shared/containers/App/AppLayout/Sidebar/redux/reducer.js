import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  favoritePages: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getFavoritePagesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    favoritePages: {
      ...state.favoritePages,
      isPending: true,
      error: null,
    },
  };
};

export const getFavoritePagesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    favoritePages: {
      ...state.favoritePages,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getFavoritePagesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    favoritePages: {
      ...state.favoritePages,
      isPending: false,
      error,
    },
  };
};

export const updateFavoritePagesRequest = (state = INITIAL_STATE, { favoritePages }) => {
  return {
    ...state,
    favoritePages: {
      ...state.favoritePages,
      /*
       * immediately update the value, in case the update failed this will be corrected the next time the favorite pages are fetched
       * this leads to a more responsive user experience, since we know what the outcome of this request will (likely) be
       */
      data: favoritePages,
      isPending: true,
      error: null,
    },
  };
};

export const updateFavoritePagesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    favoritePages: {
      ...state.favoritePages,
      isPending: false,
      error,
    },
  };
};

const destroy = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_FAVORITE_PAGES_REQUEST]: getFavoritePagesRequest,
  [Types.GET_FAVORITE_PAGES_SUCCESS]: getFavoritePagesSuccess,
  [Types.GET_FAVORITE_PAGES_FAILURE]: getFavoritePagesFailure,
  [Types.UPDATE_FAVORITE_PAGES_REQUEST]: updateFavoritePagesRequest,
  [Types.UPDATE_FAVORITE_PAGES_FAILURE]: updateFavoritePagesFailure,

  [Types.DESTROY_SIDEBAR]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
