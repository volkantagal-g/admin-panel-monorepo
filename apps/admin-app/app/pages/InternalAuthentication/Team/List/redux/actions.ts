import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.INTERNAL_AUTHENTICATION.TEAM.LIST}_`;

export const { Types, Creators } = createActions({
  getTeamsRequest: null,
  getTeamsSuccess: { data: null },
  getTeamsFailure: { error: null },
  createTeamRequest: { team: null, onSuccess: null },
  createTeamSuccess: { data: null },
  createTeamFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
