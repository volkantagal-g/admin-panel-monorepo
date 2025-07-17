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

const fetchProductMatchingConfidenceVeryHighRequest = state => ({
  ...state,
  loading: {
    ...state.loading,
    fetch: true,
  },
  error: null,
});

const fetchProductMatchingConfidenceVeryHighSuccess = (state, { productMatchingList, totalCount }) => ({
  ...state,
  data: productMatchingList,
  pagination: {
    ...state.pagination,
    total: totalCount,
  },
  loading: {
    ...state.loading,
    fetch: false,
  },
  error: null,
});

const fetchProductMatchingConfidenceVeryHighFailure = (state, { error }) => ({
  ...state,
  loading: {
    ...state.loading,
    fetch: false,
  },
  error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_PRODUCT_MATCHING_CONFIDENCE_VERY_HIGH_REQUEST]: fetchProductMatchingConfidenceVeryHighRequest,
  [Types.FETCH_PRODUCT_MATCHING_CONFIDENCE_VERY_HIGH_FAILURE]: fetchProductMatchingConfidenceVeryHighFailure,
  [Types.FETCH_PRODUCT_MATCHING_CONFIDENCE_VERY_HIGH_SUCCESS]: fetchProductMatchingConfidenceVeryHighSuccess,
});

const getProductMatchingState = state => state?.[REDUX_STORE_KEYS.PRODUCT_MATCHING] || INITIAL_STATE;

export const selectProductMatchingData = createSelector(
  [getProductMatchingState],
  state => state.data || [],
);
