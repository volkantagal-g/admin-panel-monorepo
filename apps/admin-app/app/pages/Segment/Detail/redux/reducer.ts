import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { Segment } from '../../types';

export type State = {
  segment: {
    isPending: boolean,
    data: Segment,
  },
  segmentClientCount: {
    isPending: boolean,
    data: number,
    isRequested: boolean,
  },
  updateSegment: {
    isPending: boolean,
    data: Segment,
  },
  deleteSegment: {
    isPending: boolean,
    data: {},
  },
  resetClientsOfSegment: { isPending: boolean },
  expirationStatus: { isPending: boolean },
  indefiniteExpiration: { isPending: boolean },
};

export const INITIAL_STATE: State = {
  segment: {
    isPending: false,
    data: {} as Segment,
  },
  segmentClientCount: {
    isPending: false,
    data: 0,
    isRequested: false,
  },
  updateSegment: {
    isPending: false,
    data: {} as Segment,
  },
  deleteSegment: {
    isPending: false,
    data: {},
  },
  resetClientsOfSegment: { isPending: false },
  expirationStatus: { isPending: false },
  indefiniteExpiration: { isPending: false },
};

const segmentRequest = (state: State) => ({
  ...state,
  segment: {
    ...state.segment,
    isPending: true,
    data: [],
  },
});
const segmentSuccess = (state: State, { data }) => ({
  ...state,
  segment: {
    ...state.segment,
    isPending: false,
    data,
  },
});
const segmentFailure = (state: State) => ({
  ...state,
  segment: {
    ...state.segment,
    isPending: false,
  },
});

const segmentClientCountRequest = (state: State) => ({
  ...state,
  segmentClientCount: {
    ...state.segmentClientCount,
    isPending: true,
    isRequested: true,
    data: 0,
  },
});
const segmentClientCountSuccess = (state: State, { data }) => ({
  ...state,
  segmentClientCount: {
    ...state.segmentClientCount,
    isPending: false,
    data,
  },
});
const segmentClientCountFailure = (state: State) => ({
  ...state,
  segmentClientCount: {
    ...state.segmentClientCount,
    isPending: false,
    isRequested: false,
  },
});

const updateSegmentRequest = (state: State) => ({
  ...state,
  updateSegment: {
    ...state.updateSegment,
    isPending: true,
    data: [],
  },
});
const updateSegmentSuccess = (state: State, { data }) => ({
  ...state,
  updateSegment: {
    ...state.updateSegment,
    isPending: false,
    data,
  },
});
const updateSegmentFailure = (state: State) => ({
  ...state,
  updateSegment: {
    ...state.updateSegment,
    isPending: false,
  },
});

const deleteSegmentRequest = (state: State) => ({
  ...state,
  deleteSegment: {
    ...state.deleteSegment,
    isPending: true,
    data: [],
  },
});
const deleteSegmentSuccess = (state: State, { data }) => ({
  ...state,
  deleteSegment: {
    ...state.deleteSegment,
    isPending: false,
    data,
  },
});
const deleteSegmentFailure = (state: State) => ({
  ...state,
  deleteSegment: {
    ...state.deleteSegment,
    isPending: false,
  },
});

const resetClientsOfSegmentRequest = (state: State) => ({
  ...state,
  resetClientsOfSegment: {
    ...state.resetClientsOfSegment,
    isPending: true,
  },
});
const resetClientsOfSegmentSuccess = (state: State) => ({
  ...state,
  resetClientsOfSegment: {
    ...state.resetClientsOfSegment,
    isPending: false,
  },
});
const resetClientsOfSegmentFailure = (state: State) => ({
  ...state,
  resetClientsOfSegment: {
    ...state.resetClientsOfSegment,
    isPending: false,
  },
});

const updateExpirationStatusRequest = (state: State) => ({
  ...state,
  expirationStatus: {
    ...state.expirationStatus,
    isPending: true,
  },
});
const updateExpirationStatusSuccess = (state: State, { data }) => ({
  ...state,
  expirationStatus: {
    ...state.expirationStatus,
    isPending: false,
  },
  segment: {
    ...state.segment,
    data,
  },
});
const updateExpirationStatusFailure = (state: State) => ({
  ...state,
  expirationStatus: {
    ...state.expirationStatus,
    isPending: false,
  },
});

const updateIndefiniteExpirationRequest = (state: State) => ({
  ...state,
  indefiniteExpiration: {
    ...state.indefiniteExpiration,
    isPending: true,
  },
});
const updateIndefiniteExpirationSuccess = (state: State, { data }) => ({
  ...state,
  indefiniteExpiration: {
    ...state.indefiniteExpiration,
    isPending: false,
  },
  segment: {
    ...state.segment,
    data,
  },
});
const updateIndefiniteExpirationFailure = (state: State) => ({
  ...state,
  indefiniteExpiration: {
    ...state.indefiniteExpiration,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_SEGMENT_REQUEST]: segmentRequest,
  [Types.GET_SEGMENT_SUCCESS]: segmentSuccess,
  [Types.GET_SEGMENT_FAILURE]: segmentFailure,
  [Types.GET_SEGMENT_CLIENT_COUNT_REQUEST]: segmentClientCountRequest,
  [Types.GET_SEGMENT_CLIENT_COUNT_SUCCESS]: segmentClientCountSuccess,
  [Types.GET_SEGMENT_CLIENT_COUNT_FAILURE]: segmentClientCountFailure,
  [Types.UPDATE_SEGMENT_REQUEST]: updateSegmentRequest,
  [Types.UPDATE_SEGMENT_SUCCESS]: updateSegmentSuccess,
  [Types.UPDATE_SEGMENT_FAILURE]: updateSegmentFailure,
  [Types.DELETE_SEGMENT_REQUEST]: deleteSegmentRequest,
  [Types.DELETE_SEGMENT_SUCCESS]: deleteSegmentSuccess,
  [Types.DELETE_SEGMENT_FAILURE]: deleteSegmentFailure,
  [Types.RESET_CLIENTS_OF_SEGMENT_REQUEST]: resetClientsOfSegmentRequest,
  [Types.RESET_CLIENTS_OF_SEGMENT_SUCCESS]: resetClientsOfSegmentSuccess,
  [Types.RESET_CLIENTS_OF_SEGMENT_FAILURE]: resetClientsOfSegmentFailure,
  [Types.UPDATE_EXPIRATION_STATUS_REQUEST]: updateExpirationStatusRequest,
  [Types.UPDATE_EXPIRATION_STATUS_SUCCESS]: updateExpirationStatusSuccess,
  [Types.UPDATE_EXPIRATION_STATUS_FAILURE]: updateExpirationStatusFailure,
  [Types.UPDATE_INDEFINITE_EXPIRATION_REQUEST]: updateIndefiniteExpirationRequest,
  [Types.UPDATE_INDEFINITE_EXPIRATION_SUCCESS]: updateIndefiniteExpirationSuccess,
  [Types.UPDATE_INDEFINITE_EXPIRATION_FAILURE]: updateIndefiniteExpirationFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
