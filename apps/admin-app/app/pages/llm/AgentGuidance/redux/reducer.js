import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  getAgentGuidanceContent: {
    isPending: false,
    data: null,
    error: null,
  },
  updateAgentGuidanceContent: {
    isPending: false,
    data: null,
  },
  filters: {
    type: 'knowledge',
    feature: null,
    domain: null,
    contact: null,
    channel: null,
    level: null,
    mr: null,
    sr: null,
    segment: null,
  },
};

const getAgentGuidanceContentRequest = state => ({
  ...state,
  getAgentGuidanceContent: {
    ...state.getAgentGuidanceContent,
    isPending: true,
  },
});

const getAgentGuidanceContentSuccess = (state, { data }) => ({
  ...state,
  getAgentGuidanceContent: {
    ...state.getAgentGuidanceContent,
    isPending: false,
    data,
    error: null,
  },
});

const getAgentGuidanceContentFailure = (state, { error }) => ({
  ...state,
  getAgentGuidanceContent: {
    ...state.getAgentGuidanceContent,
    isPending: false,
    data: null,
    error,
  },
});

const updateAgentGuidanceContentRequest = state => ({
  ...state,
  updateAgentGuidanceContent: {
    ...state.updateAgentGuidanceContent,
    isPending: true,
  },
});

const updateAgentGuidanceContentSuccess = state => ({
  ...state,
  updateAgentGuidanceContent: {
    ...state.updateAgentGuidanceContent,
    isPending: false,
  },
});

const updateAgentGuidanceContentFailure = (state, { error }) => ({
  ...state,
  updateAgentGuidanceContent: {
    ...state.updateAgentGuidanceContent,
    isPending: false,
    error,
  },
});

const setFilters = (state, { filters = {} }) => ({
  ...state,
  filters: {
    ...state.filters,
    ...filters,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_AGENT_GUIDANCE_CONTENT_REQUEST]: getAgentGuidanceContentRequest,
  [Types.GET_AGENT_GUIDANCE_CONTENT_SUCCESS]: getAgentGuidanceContentSuccess,
  [Types.GET_AGENT_GUIDANCE_CONTENT_FAILURE]: getAgentGuidanceContentFailure,
  [Types.UPDATE_AGENT_GUIDANCE_CONTENT_REQUEST]: updateAgentGuidanceContentRequest,
  [Types.UPDATE_AGENT_GUIDANCE_CONTENT_SUCCESS]: updateAgentGuidanceContentSuccess,
  [Types.UPDATE_AGENT_GUIDANCE_CONTENT_FAILURE]: updateAgentGuidanceContentFailure,
  [Types.SET_FILTERS]: setFilters,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
