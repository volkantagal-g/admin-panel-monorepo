import { createReducer } from 'reduxsauce';
import { Reducer } from 'redux';

import { Types } from './actions';
import { State } from './types';

export const INITIAL_STATE: State = {
  getRankingScenarioNamesRequest: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const getRankingScenarioNamesRequest: Reducer<State> = state => ({
  ...state,
  getRankingScenarioNamesRequest: {
    ...INITIAL_STATE.getRankingScenarioNamesRequest,
    isPending: true,
  },
});

export const getRankingScenarioNamesSuccess: Reducer<State> = (state, { data }): State => ({
  ...state,
  getRankingScenarioNamesRequest: {
    ...INITIAL_STATE.getRankingScenarioNamesRequest,
    isPending: false,
    data,
  },
});

export const getRankingScenarioNamesFailure: Reducer<State> = (state, { error }) => ({
  ...state,
  getRankingScenarioNamesRequest: {
    ...INITIAL_STATE.getRankingScenarioNamesRequest,
    isPending: false,
    error,
  },
});

export const destroyPage: Reducer<State> = state => {
  return {
    ...INITIAL_STATE,
    getRankingScenarioNamesRequest: {
      ...state?.getRankingScenarioNamesRequest,
      isPending: false,
    },
  };
};

export const HANDLERS = {
  [Types.GET_RANKING_SCENARIO_NAMES_REQUEST]: getRankingScenarioNamesRequest,
  [Types.GET_RANKING_SCENARIO_NAMES_SUCCESS]: getRankingScenarioNamesSuccess,
  [Types.GET_RANKING_SCENARIO_NAMES_FAILURE]: getRankingScenarioNamesFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
