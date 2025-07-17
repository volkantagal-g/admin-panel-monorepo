import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPending: false,
  data: [],
  error: null,
};
export const getNotificationTagsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isPending: true,
  };
};

export const getNotificationTagsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    data,
    isPending: false,
  };
};

export const getNotificationTagsFailure = (state = INITIAL_STATE, { error }) => {
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
  [Types.GET_NOTIFICATION_TAGS_REQUEST]: getNotificationTagsRequest,
  [Types.GET_NOTIFICATION_TAGS_SUCCESS]: getNotificationTagsSuccess,
  [Types.GET_NOTIFICATION_TAGS_FAILURE]: getNotificationTagsFailure,

  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
