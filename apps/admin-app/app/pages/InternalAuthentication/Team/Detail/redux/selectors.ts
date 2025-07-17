import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.INTERNAL_AUTHENTICATION.TEAM.DETAIL;

export const teamByIdSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.teamById?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.teamById?.data,
};

export const updateTeamSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.updateTeam?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.updateTeam?.data,
};

export const deleteTeamSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.deleteTeam?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.deleteTeam?.data,
};

export const teamServicesSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.teamServices?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.teamServices?.data,
};

export const createTeamServiceSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.createTeamService?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.createTeamService?.data,
};
