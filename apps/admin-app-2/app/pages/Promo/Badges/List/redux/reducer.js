import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getPromoBadgesByFilters: {
    data: [],
    isPending: false,
  },
  managePromoBadge: {
    isPending: false,
    data: {},
    error: null,
  },
  deletePromoBadge: {
    isPending: false,
    id: null,
    error: null,
  },
};

export const getPromoBadgesByFiltersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getPromoBadgesByFilters: {
      ...state.getPromoBadgesByFilters,
      isPending: true,
    },
  };
};

export const getPromoBadgesByFiltersSuccess = (state = INITIAL_STATE, { promoBadges = [] }) => {
  return {
    ...state,
    getPromoBadgesByFilters: {
      ...state.getPromoBadgesByFilters,
      data: promoBadges,
      isPending: false,
    },
  };
};

export const getPromoBadgesByFiltersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getPromoBadgesByFilters: {
      ...state.getPromoBadgesByFilters,
      isPending: false,
      error,
    },
  };
};

export const managePromoBadgeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    managePromoBadge: {
      ...INITIAL_STATE.managePromoBadge,
      isPending: true,
    },
  };
};

export const managePromoBadgeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    managePromoBadge: {
      ...INITIAL_STATE.managePromoBadge,
      data,
      isPending: false,
    },
  };
};

export const managePromoBadgeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    managePromoBadge: {
      ...INITIAL_STATE.managePromoBadge,
      isPending: false,
      error,
    },
  };
};
export const deletePromoBadgeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deletePromoBadge: {
      ...INITIAL_STATE.deletePromoBadge,
      isPending: true,
    },
  };
};

export const deletePromoBadgeSuccess = (state = INITIAL_STATE, { id }) => {
  return {
    ...state,
    deletePromoBadge: {
      ...INITIAL_STATE.deletePromoBadge,
      id,
      isPending: false,
    },
    getPromoBadgesByFilters: {
      ...state.getPromoBadgesByFilters,
      data: state.getPromoBadgesByFilters.data.filter(
        promoBadge => promoBadge._id !== id,
      ),
    },
  };
};

export const deletePromoBadgeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deletePromoBadge: {
      ...INITIAL_STATE.deletePromoBadge,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PROMO_BADGES_BY_FILTERS_REQUEST]:
    getPromoBadgesByFiltersRequest,
  [Types.GET_PROMO_BADGES_BY_FILTERS_SUCCESS]:
    getPromoBadgesByFiltersSuccess,
  [Types.GET_PROMO_BADGES_BY_FILTERS_FAILURE]:
    getPromoBadgesByFiltersFailure,
  [Types.MANAGE_PROMO_BADGE_REQUEST]: managePromoBadgeRequest,
  [Types.MANAGE_PROMO_BADGE_SUCCESS]: managePromoBadgeSuccess,
  [Types.MANAGE_PROMO_BADGE_FAILURE]: managePromoBadgeFailure,
  [Types.DELETE_PROMO_BADGE_REQUEST]: deletePromoBadgeRequest,
  [Types.DELETE_PROMO_BADGE_SUCCESS]: deletePromoBadgeSuccess,
  [Types.DELETE_PROMO_BADGE_FAILURE]: deletePromoBadgeFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
