import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  eventDetail: {
    isPending: false,
    data: [],
  },
};

const eventDetailRequest = (state = INITIAL_STATE) => ({
  ...state,
  eventDetail: {
    ...state.eventDetail,
    isPending: true,
    data: [],
  },
});

const eventDetailSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  eventDetail: {
    ...state.eventDetail,
    isPending: false,
    data,
  },
});

const eventDetailFailure = (state = INITIAL_STATE) => ({
  ...state,
  eventDetail: {
    ...state.eventDetail,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_EVENT_DETAIL_REQUEST]: eventDetailRequest,
  [Types.GET_EVENT_DETAIL_SUCCESS]: eventDetailSuccess,
  [Types.GET_EVENT_DETAIL_FAILURE]: eventDetailFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
