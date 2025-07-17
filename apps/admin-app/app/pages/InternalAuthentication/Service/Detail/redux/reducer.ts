import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { DbInternalService, SlackConfigurations } from '../../../types';

export type State = {
  serviceById: {
    isPending: boolean;
    data: DbInternalService;
  };
  updateService: {
    isPending: boolean;
    data: DbInternalService;
  };
  deleteService: {
    isPending: boolean;
    data: {};
  };
  slackConfigurations: {
    isPending: boolean;
    data: SlackConfigurations;
  };
  updateSlackConfigurations: {
    isPending: boolean;
    data: SlackConfigurations;
  };
  slackToken: {
    isPending: boolean;
    data: {};
  };
}

export const INITIAL_STATE: State = {
  serviceById: {
    isPending: false,
    data: {} as DbInternalService,
  },
  updateService: {
    isPending: false,
    data: {} as DbInternalService,
  },
  deleteService: {
    isPending: false,
    data: {},
  },
  slackConfigurations: {
    isPending: false,
    data: {} as SlackConfigurations,
  },
  updateSlackConfigurations: {
    isPending: false,
    data: {} as SlackConfigurations,
  },
  slackToken: {
    isPending: false,
    data: {},
  },
};

const serviceByIdRequest = (state: State) => ({
  ...state,
  serviceById: {
    ...state.serviceById,
    isPending: true,
    data: [],
  },
});

const serviceByIdSuccess = (state: State, { data }) => ({
  ...state,
  serviceById: {
    ...state.serviceById,
    isPending: false,
    data,
  },
});

const serviceByIdFailure = (state: State) => ({
  ...state,
  serviceById: {
    ...state.serviceById,
    isPending: false,
  },
});

const updateServiceRequest = (state: State) => ({
  ...state,
  updateService: {
    ...state.updateService,
    isPending: true,
    data: [],
  },
});

const updateServiceSuccess = (state: State, { data }) => ({
  ...state,
  updateService: {
    ...state.updateService,
    isPending: false,
    data,
  },
});

const updateServiceFailure = (state: State) => ({
  ...state,
  updateService: {
    ...state.updateService,
    isPending: false,
  },
});

const deleteServiceRequest = (state: State) => ({
  ...state,
  deleteService: {
    ...state.deleteService,
    isPending: true,
    data: [],
  },
});

const deleteServiceSuccess = (state: State, { data }) => ({
  ...state,
  deleteService: {
    ...state.deleteService,
    isPending: false,
    data,
  },
});

const deleteServiceFailure = (state: State) => ({
  ...state,
  deleteService: {
    ...state.deleteService,
    isPending: false,
  },
});

const slackConfigurationsRequest = (state: State) => ({
  ...state,
  slackConfigurations: {
    ...state.slackConfigurations,
    isPending: true,
    data: [],
  },
});

const slackConfigurationsSuccess = (state: State, { data }) => ({
  ...state,
  slackConfigurations: {
    ...state.slackConfigurations,
    isPending: false,
    data,
  },
});

const slackConfigurationsFailure = (state: State) => ({
  ...state,
  slackConfigurations: {
    ...state.slackConfigurations,
    isPending: false,
  },
});

const updateSlackConfigurationsRequest = (state: State) => ({
  ...state,
  updateSlackConfigurations: {
    ...state.updateSlackConfigurations,
    isPending: true,
    data: [],
  },
});

const updateSlackConfigurationsSuccess = (state: State, { data }) => ({
  ...state,
  updateSlackConfigurations: {
    ...state.updateSlackConfigurations,
    isPending: false,
    data,
  },
});

const updateSlackConfigurationsFailure = (state: State) => ({
  ...state,
  updateSlackConfigurations: {
    ...state.updateSlackConfigurations,
    isPending: false,
  },
});

const generateSlackTokenRequest = (state: State) => ({
  ...state,
  slackToken: {
    ...state.slackToken,
    isPending: true,
    data: [],
  },
});

const generateSlackTokenSuccess = (state: State, { data }) => ({
  ...state,
  slackToken: {
    ...state.slackToken,
    isPending: false,
    data,
  },
});

const generateSlackTokenFailure = (state: State) => ({
  ...state,
  slackToken: {
    ...state.slackToken,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_SERVICE_BY_ID_REQUEST]: serviceByIdRequest,
  [Types.GET_SERVICE_BY_ID_SUCCESS]: serviceByIdSuccess,
  [Types.GET_SERVICE_BY_ID_FAILURE]: serviceByIdFailure,
  [Types.UPDATE_SERVICE_REQUEST]: updateServiceRequest,
  [Types.UPDATE_SERVICE_SUCCESS]: updateServiceSuccess,
  [Types.UPDATE_SERVICE_FAILURE]: updateServiceFailure,
  [Types.DELETE_SERVICE_REQUEST]: deleteServiceRequest,
  [Types.DELETE_SERVICE_SUCCESS]: deleteServiceSuccess,
  [Types.DELETE_SERVICE_FAILURE]: deleteServiceFailure,
  [Types.GET_SLACK_CONFIGURATIONS_REQUEST]: slackConfigurationsRequest,
  [Types.GET_SLACK_CONFIGURATIONS_SUCCESS]: slackConfigurationsSuccess,
  [Types.GET_SLACK_CONFIGURATIONS_FAILURE]: slackConfigurationsFailure,
  [Types.UPDATE_SLACK_CONFIGURATIONS_REQUEST]: updateSlackConfigurationsRequest,
  [Types.UPDATE_SLACK_CONFIGURATIONS_SUCCESS]: updateSlackConfigurationsSuccess,
  [Types.UPDATE_SLACK_CONFIGURATIONS_FAILURE]: updateSlackConfigurationsFailure,
  [Types.GENERATE_SLACK_TOKEN_REQUEST]: generateSlackTokenRequest,
  [Types.GENERATE_SLACK_TOKEN_SUCCESS]: generateSlackTokenSuccess,
  [Types.GENERATE_SLACK_TOKEN_FAILURE]: generateSlackTokenFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
