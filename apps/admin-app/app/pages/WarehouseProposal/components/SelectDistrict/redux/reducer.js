import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  districts: {
    data: [],
    isPending: false,
  },
};

const getDistrictsRequest = state => ({
  districts: {
    ...state.districts,
    isPending: true,
  },
});

const getDistrictsSuccess = (state, { data }) => ({
  districts: {
    ...state.districts,
    isPending: false,
    data,
  },
});

const getDistrictsFailure = state => ({
  districts: {
    ...state.districts,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_DISTRICTS_REQUEST]: getDistrictsRequest,
  [Types.GET_DISTRICTS_SUCCESS]: getDistrictsSuccess,
  [Types.GET_DISTRICTS_FAILURE]: getDistrictsFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};
export default createReducer(INITIAL_STATE, HANDLERS);
