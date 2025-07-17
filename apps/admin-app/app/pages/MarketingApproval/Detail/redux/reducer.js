import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  generatedContent: {
    data: {},
    isPending: false,
  },
  updateNotifications: { data: {}, isPending: false },
};

export const getGeneratedContentForPromoIdRequest = state => {
  return {
    ...state,
    generatedContent: {
      ...state.generatedContent,
      isPending: true,
    },
  };
};

export const getGeneratedContentForPromoIdSuccess = (state = INITIAL_STATE, { data = [] }) => {
  return {
    ...state,
    generatedContent: {
      ...state.generatedContent,
      data,
      isPending: false,
    },
  };
};

export const getGeneratedContentForPromoIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    generatedContent: {
      ...state.generatedContent,
      isPending: false,
      error,
    },
  };
};

export const updateNotificationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateNotifications: {
      ...state.updateNotifications,
      isPending: true,
    },
  };
};

export const updateNotificationsSuccess = (state = INITIAL_STATE, { data = {} }) => {
  return {
    ...state,
    updateNotifications: {
      ...state.updateNotifications,
      data,
      isPending: false,
    },
  };
};

export const updateNotificationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateNotifications: {
      ...state.updateNotifications,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_GENERATED_CONTENT_FOR_PROMO_ID_REQUEST]: getGeneratedContentForPromoIdRequest,
  [Types.GET_GENERATED_CONTENT_FOR_PROMO_ID_SUCCESS]: getGeneratedContentForPromoIdSuccess,
  [Types.GET_GENERATED_CONTENT_FOR_PROMO_ID_FAILURE]: getGeneratedContentForPromoIdFailure,
  [Types.UPDATE_NOTIFICATIONS_REQUEST]: updateNotificationsRequest,
  [Types.UPDATE_NOTIFICATIONS_SUCCESS]: updateNotificationsSuccess,
  [Types.UPDATE_NOTIFICATIONS_FAILURE]: updateNotificationsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
