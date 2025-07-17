import { createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';

import { REDUX_STORE_KEYS } from '@app/pages/CommerceIntelligence/constants';
import { Types } from './actions';

const INITIAL_STATE = {
  data: [],
  loading: {
    fetch: false,
    activeRequests: 0,
  },
  error: null,
};

const fetchSmartPricingIndexRequest = state => ({
  ...state,
  loading: {
    ...state.loading,
    fetch: true,
  },
  error: null,
});

const fetchSmartPricingIndexSuccess = (state, { smartPricingIndex }) => ({
  ...state,
  data: smartPricingIndex,
  loading: {
    ...state.loading,
    fetch: false,
  },
  error: null,
});

const fetchSmartPricingIndexFailure = (state, { error }) => ({
  ...state,
  loading: {
    ...state.loading,
    fetch: false,
  },
  error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_SMART_PRICING_INDEX_REQUEST]: fetchSmartPricingIndexRequest,
  [Types.FETCH_SMART_PRICING_INDEX_FAILURE]: fetchSmartPricingIndexFailure,
  [Types.FETCH_SMART_PRICING_INDEX_SUCCESS]: fetchSmartPricingIndexSuccess,
});

const getSmartPricingState = state => state?.[REDUX_STORE_KEYS.SMART_PRICING] || INITIAL_STATE;

export const selectSmartPricingData = createSelector(
  [getSmartPricingState],
  state => state.data || [],
);
