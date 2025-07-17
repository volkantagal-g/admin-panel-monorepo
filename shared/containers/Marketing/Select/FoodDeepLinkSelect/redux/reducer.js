import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  data: [],
  error: null,
};

export const getFoodDeepLinksRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getFoodDeepLinksSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,
  };
};

export const getFoodDeepLinksFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

export const getFoodDeepLinkDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getFoodDeepLinkDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data: [
      ...state.data,
      data,
    ],
    isPending: false,
  };
};

export const getFoodDeepLinkDetailFailure = (state = INITIAL_STATE, { error }) => {
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
  [Types.GET_FOOD_DEEP_LINKS_REQUEST]: getFoodDeepLinksRequest,
  [Types.GET_FOOD_DEEP_LINKS_SUCCESS]: getFoodDeepLinksSuccess,
  [Types.GET_FOOD_DEEP_LINKS_FAILURE]: getFoodDeepLinksFailure,

  [Types.GET_FOOD_DEEP_LINK_DETAIL_REQUEST]: getFoodDeepLinkDetailRequest,
  [Types.GET_FOOD_DEEP_LINK_DETAIL_SUCCESS]: getFoodDeepLinkDetailSuccess,
  [Types.GET_FOOD_DEEP_LINK_DETAIL_FAILURE]: getFoodDeepLinkDetailFailure,

  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
