import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { DbInternalTeam } from '../../../types';

export type State = {
  teams: {
    isPending: boolean;
    data: DbInternalTeam[];
  };
  createTeam: {
    isPending: boolean;
    data: DbInternalTeam;
  };
};

export const INITIAL_STATE: State = {
  teams: {
    isPending: false,
    data: [],
  },
  createTeam: {
    isPending: false,
    data: {} as DbInternalTeam,
  },
};

const teamsRequest = (state = INITIAL_STATE) => ({
  ...state,
  teams: {
    ...state.teams,
    isPending: true,
    data: [],
  },
});

const teamsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  teams: {
    ...state.teams,
    isPending: false,
    data,
  },
});

const teamsFailure = (state = INITIAL_STATE) => ({
  ...state,
  teams: {
    ...state.teams,
    isPending: false,
  },
});

const createTeamRequest = (state = INITIAL_STATE) => ({
  ...state,
  createTeam: {
    ...state.createTeam,
    isPending: true,
    data: [],
  },
});

const createTeamSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  createTeam: {
    ...state.createTeam,
    isPending: false,
    data,
  },
});

const createTeamFailure = (state = INITIAL_STATE) => ({
  ...state,
  createTeam: {
    ...state.createTeam,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_TEAMS_REQUEST]: teamsRequest,
  [Types.GET_TEAMS_SUCCESS]: teamsSuccess,
  [Types.GET_TEAMS_FAILURE]: teamsFailure,
  [Types.CREATE_TEAM_REQUEST]: createTeamRequest,
  [Types.CREATE_TEAM_SUCCESS]: createTeamSuccess,
  [Types.CREATE_TEAM_FAILURE]: createTeamFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
