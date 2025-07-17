import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = { notification: undefined, notificationStats: undefined };

const notificationByIdRequest = state => ({
  ...state,
  notification: {
    ...state.notification,
    isPending: true,
    data: undefined,
  },
  categories: [],
  isPendingCategories: false,
});

const notificationByIdSuccess = (state, { data }) => ({
  ...state,
  notification: {
    ...state.notification,
    isPending: false,
    data,
  },
});

const notificationByIdFailure = state => ({
  ...state,
  notification: {
    ...state.notification,
    isPending: false,
    data: undefined,
  },
});

const notificationUpdateRequest = state => ({
  ...state,
  notification: {
    ...state.notification,
    isPending: true,
  },
});

const notificationUpdateSuccess = (state, { data }) => ({
  ...state,
  notification: {
    ...state.notification,
    isPending: false,
    data,
  },
});

const notificationUpdateFailure = state => ({
  ...state,
  notification: {
    ...state.notification,
    isPending: false,
  },
});

const notificationStatsRequest = state => ({
  ...state,
  notificationStats: {
    ...state.notificationStats,
    isPending: true,
  },
});

const notificationStatsSuccess = (state, { data }) => ({
  ...state,
  notificationStats: {
    ...state.notificationStats,
    isPending: false,
    data,
  },
});

const notificationStatsFailure = state => ({
  ...state,
  notificationStats: {
    ...state.notificationStats,
    isPending: false,
  },
});

export const getCategoriesRequest = state => ({
  ...state,
  isPendingCategories: true,
});

export const getCategoriesSuccess = (state, { data }) => ({
  ...state,
  categories: data.categories,
  isPendingCategories: false,
});

export const getCategoriesFailure = (state, { error }) => ({
  ...state,
  categories: [],
  isPendingCategories: false,
  error,
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_NOTIFICATION_BY_ID_REQUEST]: notificationByIdRequest,
  [Types.GET_NOTIFICATION_BY_ID_SUCCESS]: notificationByIdSuccess,
  [Types.GET_NOTIFICATION_BY_ID_FAILURE]: notificationByIdFailure,
  [Types.NOTIFICATION_UPDATE_REQUEST]: notificationUpdateRequest,
  [Types.NOTIFICATION_UPDATE_SUCCESS]: notificationUpdateSuccess,
  [Types.NOTIFICATION_UPDATE_FAILURE]: notificationUpdateFailure,
  [Types.GET_NOTIFICATION_STATS]: notificationStatsRequest,
  [Types.GET_NOTIFICATION_STATS_SUCCESS]: notificationStatsSuccess,
  [Types.GET_NOTIFICATION_STATS_FAILURE]: notificationStatsFailure,
  [Types.GET_CATEGORIES_REQUEST]: getCategoriesRequest,
  [Types.GET_CATEGORIES_SUCCESS]: getCategoriesSuccess,
  [Types.GET_CATEGORIES_FAILURE]: getCategoriesFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
