import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { DbInternalServiceWithTeam } from '../../../types';

export type State = {
  services: {
    isPending: boolean;
    data: DbInternalServiceWithTeam[];
  };
}

export const INITIAL_STATE: State = {
  services: {
    isPending: false,
    data: [],
  },
};

const servicesRequest = (state: State) => ({
  ...state,
  services: {
    ...state.services,
    isPending: true,
    data: [],
  },
});

const servicesSuccess = (state: State, { data }) => ({
  ...state,
  services: {
    ...state.services,
    isPending: false,
    data,
  },
});

const servicesFailure = (state: State) => ({
  ...state,
  services: {
    ...state.services,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_SERVICES_REQUEST]: servicesRequest,
  [Types.GET_SERVICES_SUCCESS]: servicesSuccess,
  [Types.GET_SERVICES_FAILURE]: servicesFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
