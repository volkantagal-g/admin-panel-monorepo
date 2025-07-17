import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchProductMatchingConfidenceVeryHighRequest: null,
  fetchProductMatchingConfidenceVeryHighSuccess: ['productMatchingList', 'totalCount'],
  fetchProductMatchingConfidenceVeryHighFailure: ['error'],

  clearProductMatchingState: null,
});

export { Creators, Types };
