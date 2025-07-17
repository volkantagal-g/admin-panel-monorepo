import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createSegmentedCodeByBulk: {
    isPending: false,
    data: [],
  },
};

const createSegmentedCodeByBulkRequest = state => ({
  ...state,
  createSegmentedCodeByBulk: {
    ...state.createSegmentedCodeByBulk,
    isPending: true,
    data: [],
  },
});

const createSegmentedCodeByBulkSuccess = (state, { data }) => ({
  ...state,
  createSegmentedCodeByBulk: {
    ...state.createSegmentedCodeByBulk,
    isPending: false,
    data,
  },
});

const createSegmentedCodeByBulkFailure = state => ({
  ...state,
  createSegmentedCodeByBulk: {
    ...state.createSegmentedCodeByBulk,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.CREATE_SEGMENTED_CODE_BY_BULK_REQUEST]: createSegmentedCodeByBulkRequest,
  [Types.CREATE_SEGMENTED_CODE_BY_BULK_SUCCESS]: createSegmentedCodeByBulkSuccess,
  [Types.CREATE_SEGMENTED_CODE_BY_BULK_FAILURE]: createSegmentedCodeByBulkFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
