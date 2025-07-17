import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.INTERNAL_AUTHENTICATION.TEAM.DETAIL}_`;

export const { Types, Creators } = createActions({
  getTeamByIdRequest: { id: null },
  getTeamByIdSuccess: { data: null },
  getTeamByIdFailure: { error: null },
  updateTeamRequest: { team: null },
  updateTeamSuccess: { data: null },
  updateTeamFailure: { error: null },
  deleteTeamRequest: { id: null, onSuccess: null },
  deleteTeamSuccess: { data: null },
  deleteTeamFailure: { error: null },
  getTeamServicesRequest: { id: null },
  getTeamServicesSuccess: { data: null },
  getTeamServicesFailure: { error: null },
  createTeamServiceRequest: { service: null, onSuccess: null },
  createTeamServiceSuccess: { data: null },
  createTeamServiceFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
