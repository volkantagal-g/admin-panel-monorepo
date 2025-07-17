import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  tmsDrivers: {
    isPending: false,
    data: [],
    totalCount: 0,
    error: null,
  },
};

const filterTmsDriversRequest = state => ({
  ...state,
  tmsDrivers: {
    ...state.tmsDrivers,
    isPending: true,
    data: [],
  },
});

const filterTmsDriversSuccess = (state, { data, totalCount }) => ({
  ...state,
  tmsDrivers: {
    ...state.tmsDrivers,
    isPending: false,
    data,
    totalCount,
  },
});

const filterTmsDriversFailure = (state, { error }) => ({
  ...state,
  tmsDrivers: {
    ...state.tmsDrivers,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.FILTER_TMS_DRIVERS_REQUEST]: filterTmsDriversRequest,
  [Types.FILTER_TMS_DRIVERS_SUCCESS]: filterTmsDriversSuccess,
  [Types.FILTER_TMS_DRIVERS_FAILURE]: filterTmsDriversFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
