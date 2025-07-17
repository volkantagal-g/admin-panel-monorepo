import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { Segment } from '../../types';

export type State = {
  createSegment: {
    isPending: boolean,
    data: Segment,
  },
};

export const INITIAL_STATE: State = {
  createSegment: {
    isPending: false,
    data: {} as Segment,
  },
};

const createSegmentRequest = state => ({
  ...state,
  createSegment: {
    ...state.createSegment,
    isPending: true,
    data: [],
  },
});
const createSegmentSuccess = (state, { data }) => ({
  ...state,
  createSegment: {
    ...state.createSegment,
    isPending: false,
    data,
  },
});
const createSegmentFailure = state => ({
  ...state,
  createSegment: {
    ...state.createSegment,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.CREATE_SEGMENT_REQUEST]: createSegmentRequest,
  [Types.CREATE_SEGMENT_SUCCESS]: createSegmentSuccess,
  [Types.CREATE_SEGMENT_FAILURE]: createSegmentFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
