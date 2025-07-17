import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getComponentById: {
    isPending: false,
    data: {},
    error: null,
  },
  updateComponent: {
    isPending: false,
    data: {},
    error: null,
  },
  componentRoles: {
    isPending: false,
    isRequested: false,
    data: [],
  },
};

export const getComponentByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getComponentById: {
      ...INITIAL_STATE.getComponentById,
      isPending: true,
    },
  };
};

export const getComponentByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getComponentById: {
      ...INITIAL_STATE.getComponentById,
      data,
      isPending: false,
    },
  };
};

export const getComponentByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getComponentById: {
      ...INITIAL_STATE.getComponentById,
      isPending: false,
      error,
    },
  };
};

export const updateComponentRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateComponent: {
      ...INITIAL_STATE.updateComponent,
      isPending: true,
    },
  };
};

export const updateComponentSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateComponent: {
      ...INITIAL_STATE.updateComponent,
      data,
      isPending: false,
    },
  };
};

export const updateComponentFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateComponent: {
      ...INITIAL_STATE.updateComponent,
      isPending: false,
      error,
    },
  };
};

export const getComponentRolesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    componentRoles: {
      ...state.componentRoles,
      isPending: true,
    },
  };
};

export const getComponentRolesSuccess = (state = INITIAL_STATE, { data = [] }) => {
  return {
    ...state,
    componentRoles: {
      ...state.componentRoles,
      data,
      isPending: false,
      isRequested: true,
    },
  };
};

export const getComponentRolesFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    componentRoles: {
      ...state.componentRoles,
      isPending: false,
      isRequested: false,
    },
  };
};

export const getComponentRolesReset = state => ({
  ...state,
  componentRoles: { ...INITIAL_STATE.componentRoles },
});

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_COMPONENT_BY_ID_REQUEST]: getComponentByIdRequest,
  [Types.GET_COMPONENT_BY_ID_SUCCESS]: getComponentByIdSuccess,
  [Types.GET_COMPONENT_BY_ID_FAILURE]: getComponentByIdFailure,
  [Types.GET_COMPONENT_ROLES_REQUEST]: getComponentRolesRequest,
  [Types.GET_COMPONENT_ROLES_SUCCESS]: getComponentRolesSuccess,
  [Types.GET_COMPONENT_ROLES_FAILURE]: getComponentRolesFailure,
  [Types.UPDATE_COMPONENT_REQUEST]: updateComponentRequest,
  [Types.UPDATE_COMPONENT_SUCCESS]: updateComponentSuccess,
  [Types.UPDATE_COMPONENT_FAILURE]: updateComponentFailure,
  [Types.GET_COMPONENT_ROLES_RESET]: getComponentRolesReset,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
