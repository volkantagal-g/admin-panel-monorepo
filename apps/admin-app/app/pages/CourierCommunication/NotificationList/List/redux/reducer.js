import { createReducer } from 'reduxsauce';

import { Types } from './action';

export const INITIAL_STATE = {
  notificationList: {
    data: [],
    isPending: false,
    error: null,
  },
};

export const getNotificationListRequest = state => {
  return {
    ...state,
    notificationList: {
      ...state.notificationList,
      isPending: true,
    },
  };
};

export const getNotificationListSuccess = (state, { data }) => {
  return {
    ...state,
    notificationList: {
      ...state.notificationList,
      data,
      isPending: false,
    },
  };
};

export const getNotificationListFailure = (state, { error }) => {
  return {
    ...state,
    notificationList: {
      ...state.notificationList,
      isPending: true,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.NOTIFICATION_LIST]: getNotificationListRequest,
  [Types.NOTIFICATION_LIST_SUCCESS]: getNotificationListSuccess,
  [Types.NOTIFICATION_LIST_FAILURE]: getNotificationListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
