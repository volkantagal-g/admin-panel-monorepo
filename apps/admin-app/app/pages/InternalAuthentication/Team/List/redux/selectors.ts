import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.INTERNAL_AUTHENTICATION.TEAM.LIST;

export const teamsSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.teams?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.teams?.data,
};

export const createTeamSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.createTeam?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.createTeam?.data,
};
