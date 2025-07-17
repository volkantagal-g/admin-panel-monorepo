import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getCurrentStatus: {
    data: {},
    isPending: false,
    error: null,
  },
  changePaybackStatus: {
    isPending: false,
    error: null,
  },
  changeAllRestaurantsPaybackStatus: {
    isPending: false,
    error: null,
  },
  changePartialRestaurantsPaybackStatus: {
    isPending: false,
    error: null,
  },
  validatePartialRestaurantsPaybackStatus: {
    isPending: false,
    error: null,
  },
};

export const getCurrentStatusRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getCurrentStatus: {
      ...state.getCurrentStatus,
      isPending: true,
    },
  };
};

export const getCurrentStatusSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getCurrentStatus: {
      ...state.getCurrentStatus,
      data,
      isPending: false,
    },
  };
};

export const getCurrentStatusFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getCurrentStatus: {
      ...INITIAL_STATE.getCurrentStatus,
      isPending: false,
      error,
    },
  };
};

export const changePaybackStatusRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    changePaybackStatus: {
      ...state.changePaybackStatus,
      isPending: true,
    },
  };
};

export const changePaybackStatusSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    changePaybackStatus: {
      ...state.changePaybackStatus,
      isPending: false,
    },
  };
};

export const changePaybackStatusFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    changePaybackStatus: {
      ...INITIAL_STATE.changePaybackStatus,
      isPending: false,
      error,
    },
  };
};

export const changeAllRestaurantsPaybackStatusRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    changeAllRestaurantsPaybackStatus: {
      ...state.changeAllRestaurantsPaybackStatus,
      isPending: true,
    },
  };
};

export const changeAllRestaurantsPaybackStatusSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    changeAllRestaurantsPaybackStatus: {
      ...state.changeAllRestaurantsPaybackStatus,
      isPending: false,
    },
  };
};

export const changeAllRestaurantsPaybackStatusFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    changeAllRestaurantsPaybackStatus: {
      ...INITIAL_STATE.changeAllRestaurantsPaybackStatus,
      isPending: false,
      error,
    },
  };
};

export const changePartialRestaurantsPaybackStatusRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    changePartialRestaurantsPaybackStatus: {
      ...state.changePartialRestaurantsPaybackStatus,
      isPending: true,
    },
  };
};

export const changePartialRestaurantsPaybackStatusSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    changePartialRestaurantsPaybackStatus: {
      ...state.changePartialRestaurantsPaybackStatus,
      isPending: false,
    },
  };
};

export const changePartialRestaurantsPaybackStatusFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    changePartialRestaurantsPaybackStatus: {
      ...INITIAL_STATE.changePartialRestaurantsPaybackStatus,
      isPending: false,
      error,
    },
  };
};

export const validatePartialRestaurantsPaybackStatusRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    validatePartialRestaurantsPaybackStatus: {
      ...state.validatePartialRestaurantsPaybackStatus,
      isPending: true,
    },
  };
};

export const validatePartialRestaurantsPaybackStatusSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    validatePartialRestaurantsPaybackStatus: {
      ...state.validatePartialRestaurantsPaybackStatus,
      isPending: false,
    },
  };
};

export const validatePartialRestaurantsPaybackStatusFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    validatePartialRestaurantsPaybackStatus: {
      ...INITIAL_STATE.validatePartialRestaurantsPaybackStatus,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CURRENT_STATUS_REQUEST]: getCurrentStatusRequest,
  [Types.GET_CURRENT_STATUS_SUCCESS]: getCurrentStatusSuccess,
  [Types.GET_CURRENT_STATUS_FAILURE]: getCurrentStatusFailure,

  [Types.CHANGE_PAYBACK_STATUS_REQUEST]: changePaybackStatusRequest,
  [Types.CHANGE_PAYBACK_STATUS_SUCCESS]: changePaybackStatusSuccess,
  [Types.CHANGE_PAYBACK_STATUS_FAILURE]: changePaybackStatusFailure,

  [Types.CHANGE_ALL_RESTAURANTS_PAYBACK_STATUS_REQUEST]: changeAllRestaurantsPaybackStatusRequest,
  [Types.CHANGE_ALL_RESTAURANTS_PAYBACK_STATUS_SUCCESS]: changeAllRestaurantsPaybackStatusSuccess,
  [Types.CHANGE_ALL_RESTAURANTS_PAYBACK_STATUS_FAILURE]: changeAllRestaurantsPaybackStatusFailure,

  [Types.CHANGE_PARTIAL_RESTAURANTS_PAYBACK_STATUS_REQUEST]: changePartialRestaurantsPaybackStatusRequest,
  [Types.CHANGE_PARTIAL_RESTAURANTS_PAYBACK_STATUS_SUCCESS]: changePartialRestaurantsPaybackStatusSuccess,
  [Types.CHANGE_PARTIAL_RESTAURANTS_PAYBACK_STATUS_FAILURE]: changePartialRestaurantsPaybackStatusFailure,

  [Types.VALIDATE_PARTIAL_RESTAURANTS_PAYBACK_STATUS_REQUEST]: validatePartialRestaurantsPaybackStatusRequest,
  [Types.VALIDATE_PARTIAL_RESTAURANTS_PAYBACK_STATUS_SUCCESS]: validatePartialRestaurantsPaybackStatusSuccess,
  [Types.VALIDATE_PARTIAL_RESTAURANTS_PAYBACK_STATUS_FAILURE]: validatePartialRestaurantsPaybackStatusFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
