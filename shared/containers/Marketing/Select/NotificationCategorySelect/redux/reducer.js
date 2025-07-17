import { createReducer } from 'reduxsauce';
import { uniqBy } from 'lodash';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  data: [],
  error: null,
};

export const getNotificationCategoriesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getNotificationCategoriesSuccess = (state = INITIAL_STATE, { content }) => {
  return {
    ...state,
    data: content,
    isPending: false,
  };
};

export const getNotificationCategoriesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    isPending: false,
    error,
  };
};

export const getNotificationCategoryDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getNotificationCategoryDetailSuccess = (state = INITIAL_STATE, { data }) => {
  const uniqCategoryList = uniqBy([...state.data, data], 'id');
  return {
    ...state,
    data: uniqCategoryList,
    isPending: false,
  };
};

export const getNotificationCategoryDetailFailure = (state = INITIAL_STATE, { error }) => {
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
  [Types.GET_NOTIFICATION_CATEGORIES_REQUEST]: getNotificationCategoriesRequest,
  [Types.GET_NOTIFICATION_CATEGORIES_SUCCESS]: getNotificationCategoriesSuccess,
  [Types.GET_NOTIFICATION_CATEGORIES_FAILURE]: getNotificationCategoriesFailure,

  [Types.GET_NOTIFICATION_CATEGORY_DETAIL_REQUEST]: getNotificationCategoryDetailRequest,
  [Types.GET_NOTIFICATION_CATEGORY_DETAIL_SUCCESS]: getNotificationCategoryDetailSuccess,
  [Types.GET_NOTIFICATION_CATEGORY_DETAIL_FAILURE]: getNotificationCategoryDetailFailure,

  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
