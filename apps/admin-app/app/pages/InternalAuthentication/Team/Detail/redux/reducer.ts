import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { DbInternalService, DbInternalTeam } from '../../../types';

export type State = {
  teamById: {
    isPending: boolean;
    data: DbInternalTeam;
  };
  updateTeam: {
    isPending: boolean;
    data: DbInternalTeam;
  };
  deleteTeam: {
    isPending: boolean;
    data: {};
  };
  teamServices: {
    isPending: boolean;
    data: DbInternalService[];
  };
  createTeamService: {
    isPending: boolean;
    data: DbInternalService;
  };
};

export const INITIAL_STATE: State = {
  teamById: {
    isPending: false,
    data: {} as DbInternalTeam,
  },
  updateTeam: {
    isPending: false,
    data: {} as DbInternalTeam,
  },
  deleteTeam: {
    isPending: false,
    data: {},
  },
  teamServices: {
    isPending: false,
    data: [],
  },
  createTeamService: {
    isPending: false,
    data: [],
  },
};

const teamByIdRequest = (state = INITIAL_STATE) => ({
  ...state,
  teamById: {
    ...state.teamById,
    isPending: true,
    data: [],
  },
});

const teamByIdSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  teamById: {
    ...state.teamById,
    isPending: false,
    data,
  },
});

const teamByIdFailure = (state = INITIAL_STATE) => ({
  ...state,
  teamById: {
    ...state.teamById,
    isPending: false,
  },
});

const updateTeamRequest = (state = INITIAL_STATE) => ({
  ...state,
  updateTeam: {
    ...state.updateTeam,
    isPending: true,
    data: [],
  },
});

const updateTeamSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  updateTeam: {
    ...state.updateTeam,
    isPending: false,
    data,
  },
});

const updateTeamFailure = (state = INITIAL_STATE) => ({
  ...state,
  updateTeam: {
    ...state.updateTeam,
    isPending: false,
  },
});

const deleteTeamRequest = (state = INITIAL_STATE) => ({
  ...state,
  deleteTeam: {
    ...state.deleteTeam,
    isPending: true,
    data: [],
  },
});

const deleteTeamSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  deleteTeam: {
    ...state.deleteTeam,
    isPending: false,
    data,
  },
});

const deleteTeamFailure = (state = INITIAL_STATE) => ({
  ...state,
  deleteTeam: {
    ...state.deleteTeam,
    isPending: false,
  },
});

const teamServicesRequest = (state = INITIAL_STATE) => ({
  ...state,
  teamServices: {
    ...state.teamServices,
    isPending: true,
    data: [],
  },
});

const teamServicesSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  teamServices: {
    ...state.teamServices,
    isPending: false,
    data,
  },
});

const teamServicesFailure = (state = INITIAL_STATE) => ({
  ...state,
  teamServices: {
    ...state.teamServices,
    isPending: false,
  },
});

const createTeamServiceRequest = (state = INITIAL_STATE) => ({
  ...state,
  createTeamService: {
    ...state.createTeamService,
    isPending: true,
    data: [],
  },
});

const createTeamServiceSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  createTeamService: {
    ...state.createTeamService,
    isPending: false,
    data,
  },
});

const createTeamServiceFailure = (state = INITIAL_STATE) => ({
  ...state,
  createTeamService: {
    ...state.createTeamService,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_TEAM_BY_ID_REQUEST]: teamByIdRequest,
  [Types.GET_TEAM_BY_ID_SUCCESS]: teamByIdSuccess,
  [Types.GET_TEAM_BY_ID_FAILURE]: teamByIdFailure,
  [Types.UPDATE_TEAM_REQUEST]: updateTeamRequest,
  [Types.UPDATE_TEAM_SUCCESS]: updateTeamSuccess,
  [Types.UPDATE_TEAM_FAILURE]: updateTeamFailure,
  [Types.DELETE_TEAM_REQUEST]: deleteTeamRequest,
  [Types.DELETE_TEAM_SUCCESS]: deleteTeamSuccess,
  [Types.DELETE_TEAM_FAILURE]: deleteTeamFailure,
  [Types.GET_TEAM_SERVICES_REQUEST]: teamServicesRequest,
  [Types.GET_TEAM_SERVICES_SUCCESS]: teamServicesSuccess,
  [Types.GET_TEAM_SERVICES_FAILURE]: teamServicesFailure,
  [Types.CREATE_TEAM_SERVICE_REQUEST]: createTeamServiceRequest,
  [Types.CREATE_TEAM_SERVICE_SUCCESS]: createTeamServiceSuccess,
  [Types.CREATE_TEAM_SERVICE_FAILURE]: createTeamServiceFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
