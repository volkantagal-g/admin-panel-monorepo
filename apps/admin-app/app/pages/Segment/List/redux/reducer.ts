import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { Segment } from '../../types';

import { INITIAL_PAGINATION } from '../constants';

export type State = {
  segmentsSearch: {
    limit: number,
    offset: number,
    search: text,
  },
  segments: {
    isPending: boolean,
    data: Segment[],
    totalCount: number,
  },
  deleteSegment: {
    isPending: boolean,
    data: null,
  },
  addSegmentToClients: {
    isPending: boolean,
    data: null,
  },
  removeSegmentFromClients: {
    isPending: boolean,
    data: null,
  },
  resetClientsOfSegment: {
    isPending: boolean,
  },
  sendSegmentListAudienceInfoMail: {
    isPending: boolean,
    data: null,
    error: null,
  },
};

export const INITIAL_STATE: State = {
  segmentsSearch: {
    limit: INITIAL_PAGINATION.rowsPerPage,
    offset: INITIAL_PAGINATION.rowsPerPage * (INITIAL_PAGINATION.currentPage - 1),
    search: '',
  },
  segments: {
    isPending: false,
    data: [],
    totalCount: 0,
  },
  deleteSegment: {
    isPending: false,
    data: null,
  },
  addSegmentToClients: {
    isPending: false,
    data: null,
  },
  removeSegmentFromClients: {
    isPending: false,
    data: null,
  },
  resetClientsOfSegment: { isPending: false },
  sendSegmentListAudienceInfoMail: {
    isPending: false,
    data: null,
    error: null,
  },
};

const segmentsRequest = (state: State, { limit, offset, search }: State['segmentsSearch']) => ({
  ...state,
  segmentsSearch: {
    ...state.segmentsSearch,
    limit,
    offset,
    search,
  },
  segments: {
    ...state.segments,
    isPending: true,
    data: [],
  },
});
const segmentsSuccess = (state: State, { data, totalCount }: { data: State['segments']['data'], totalCount: State['segments']['totalCount']}) => ({
  ...state,
  segments: {
    ...state.segments,
    isPending: false,
    data,
    totalCount,
  },
});
const segmentsFailure = state => ({
  ...state,
  segments: {
    ...state.segments,
    isPending: false,
  },
});

const deleteSegmentRequest = state => ({
  ...state,
  deleteSegment: {
    ...state.deleteSegment,
    isPending: true,
    data: [],
  },
});
const deleteSegmentSuccess = (state, { data }) => ({
  ...state,
  deleteSegment: {
    ...state.deleteSegment,
    isPending: false,
    data,
  },
});
const deleteSegmentFailure = state => ({
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
    data: [],
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

const addSegmentToClientsRequest = (state = INITIAL_STATE) => ({
  ...state,
  addSegmentToClients: {
    ...state.addSegmentToClients,
    isPending: true,
  },
});

const addSegmentToClientsSuccess = (state = INITIAL_STATE) => ({
  ...state,
  addSegmentToClients: {
    ...state.addSegmentToClients,
    isPending: false,
  },
});

const addSegmentToClientsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  addSegmentToClients: {
    ...state.addSegmentToClients,
    isPending: false,
    error,
  },
});

const removeSegmentFromClientsRequest = (state = INITIAL_STATE) => ({
  ...state,
  removeSegmentFromClients: {
    ...state.removeSegmentFromClients,
    isPending: true,
  },
});

const removeSegmentFromClientsSuccess = (state = INITIAL_STATE) => ({
  ...state,
  removeSegmentFromClients: {
    ...state.removeSegmentFromClients,
    isPending: false,
  },
});

const removeSegmentFromClientsFailure = (state: State = INITIAL_STATE, { error }: { error: any }) => ({
  ...state,
  removeSegmentFromClients: {
    ...state.removeSegmentFromClients,
    isPending: false,
    error,
  },
});

const sendSegmentListAudienceInfoMailRequest = (state: State) => ({
  ...state,
  sendSegmentListAudienceInfoMail: {
    ...state.sendSegmentListAudienceInfoMail,
    isPending: true,
    data: [],
  },
});
const sendSegmentListAudienceInfoMailSuccess = (state: State) => ({
  ...state,
  sendSegmentListAudienceInfoMail: {
    ...state.sendSegmentListAudienceInfoMail,
    isPending: false,
  },
});
const sendSegmentListAudienceInfoMailFailure = (state: State) => ({
  ...state,
  sendSegmentListAudienceInfoMail: {
    ...state.sendSegmentListAudienceInfoMail,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_SEGMENTS_REQUEST]: segmentsRequest,
  [Types.GET_SEGMENTS_SUCCESS]: segmentsSuccess,
  [Types.GET_SEGMENTS_FAILURE]: segmentsFailure,
  [Types.DELETE_SEGMENT_REQUEST]: deleteSegmentRequest,
  [Types.DELETE_SEGMENT_SUCCESS]: deleteSegmentSuccess,
  [Types.DELETE_SEGMENT_FAILURE]: deleteSegmentFailure,
  [Types.RESET_CLIENTS_OF_SEGMENT_REQUEST]: resetClientsOfSegmentRequest,
  [Types.RESET_CLIENTS_OF_SEGMENT_SUCCESS]: resetClientsOfSegmentSuccess,
  [Types.RESET_CLIENTS_OF_SEGMENT_FAILURE]: resetClientsOfSegmentFailure,
  [Types.ADD_SEGMENT_TO_CLIENTS_REQUEST]: addSegmentToClientsRequest,
  [Types.ADD_SEGMENT_TO_CLIENTS_SUCCESS]: addSegmentToClientsSuccess,
  [Types.ADD_SEGMENT_TO_CLIENTS_FAILURE]: addSegmentToClientsFailure,
  [Types.REMOVE_SEGMENT_FROM_CLIENTS_REQUEST]: removeSegmentFromClientsRequest,
  [Types.REMOVE_SEGMENT_FROM_CLIENTS_SUCCESS]: removeSegmentFromClientsSuccess,
  [Types.REMOVE_SEGMENT_FROM_CLIENTS_FAILURE]: removeSegmentFromClientsFailure,
  [Types.SEND_SEGMENT_LIST_AUDIENCE_INFO_MAIL_REQUEST]: sendSegmentListAudienceInfoMailRequest,
  [Types.SEND_SEGMENT_LIST_AUDIENCE_INFO_MAIL_SUCCESS]: sendSegmentListAudienceInfoMailSuccess,
  [Types.SEND_SEGMENT_LIST_AUDIENCE_INFO_MAIL_FAILURE]: sendSegmentListAudienceInfoMailFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
