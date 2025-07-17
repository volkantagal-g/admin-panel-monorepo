import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  tmsDriver: {
    isPending: false,
    data: {},
    error: null,
  },
};

const getTmsDriverRequest = state => ({
  ...state,
  tmsDriver: {
    ...state.tmsDriver,
    isPending: true,
    data: {},
  },
});

const getTmsDriverSuccess = (state, { data }) => ({
  ...state,
  tmsDriver: {
    ...state.tmsDriver,
    isPending: false,
    data,
  },
});

const getTmsDriverFailure = (state, { error }) => ({
  ...state,
  tmsDriver: {
    ...state.tmsDriver,
    isPending: false,
    error,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_TMS_DRIVER_REQUEST]: getTmsDriverRequest,
  [Types.GET_TMS_DRIVER_SUCCESS]: getTmsDriverSuccess,
  [Types.GET_TMS_DRIVER_FAILURE]: getTmsDriverFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
