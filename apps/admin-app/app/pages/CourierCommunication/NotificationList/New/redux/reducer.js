import { createReducer } from 'reduxsauce';

import { Types } from './action';

export const INITIAL_STATE = {
  createNotification: {
    data: [],
    isPending: false,
    error: null,
    categories: [],
    isPendingCategories: false,
    courierIdsList: [],
  },
};

export const getCreateNotificationRequest = state => {
  return {
    ...state,
    createNotification: {
      ...state.createNotification,
      isPending: true,
    },
  };
};

export const getCreateNotificationRequestSuccess = (state, { data }) => {
  return {
    ...state,
    createNotification: {
      ...state.createNotification,
      data,
      isPending: false,
    },
  };
};

export const getCreateNotificationRequestFailure = (state, { error }) => {
  return {
    ...state,
    createNotification: {
      ...state.createNotification,
      isPending: false,
      error,
    },
  };
};

export const getCategoriesRequest = state => {
  return {
    ...state,
    createNotification: {
      ...state.createNotification,
      isPendingCategories: true,
    },
  };
};

export const getCategoriesSuccess = (state, { data }) => {
  return {
    ...state,
    createNotification: {
      ...state.createNotification,
      categories: data.categories,
      isPendingCategories: false,
    },
  };
};

export const getCategoriesFailure = (state, { error }) => {
  return {
    ...state,
    createNotification: {
      ...state.createNotification,
      categories: [],
      isPendingCategories: false,
      error,
    },
  };
};

const cleanCourierIds = state => ({
  ...state,
  createNotification: {
    ...state.createNotification,
    isPending: false,
    courierIdsList: [],
  },
});

const courierIdsListRequest = (state, { warehouseIds }) => ({
  ...state,
  createNotification: {
    ...state.createNotification,
    isPending: true,
    warehouseIds,
  },
});

const courierIdsListSuccess = (state, { data }) => ({
  ...state,
  createNotification: {
    ...state.createNotification,
    isPending: false,
    courierIdsList: data,
  },
});

const courierIdsListFailure = (state, { error }) => ({
  ...state,
  createNotification: {
    ...state.createNotification,
    isPending: false,
    courierIdsList: [],
    error,
  },
});

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_NOTIFICATION]: getCreateNotificationRequest,
  [Types.CREATE_NOTIFICATION_SUCCESS]: getCreateNotificationRequestSuccess,
  [Types.CREATE_NOTIFICATION_FAILURE]: getCreateNotificationRequestFailure,
  [Types.GET_CATEGORIES_REQUEST]: getCategoriesRequest,
  [Types.GET_CATEGORIES_SUCCESS]: getCategoriesSuccess,
  [Types.GET_CATEGORIES_FAILURE]: getCategoriesFailure,
  [Types.GET_COURIER_IDS_LIST_REQUEST]: courierIdsListRequest,
  [Types.GET_COURIER_IDS_LIST_SUCCESS]: courierIdsListSuccess,
  [Types.GET_COURIER_IDS_LIST_FAILURE]: courierIdsListFailure,
  [Types.CLEAN_COURIER_IDS]: cleanCourierIds,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
