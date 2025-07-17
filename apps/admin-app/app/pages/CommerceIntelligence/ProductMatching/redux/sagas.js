import { all, cancel, fork, take, takeLatest } from 'redux-saga/effects';

import { Types } from './actions';

function* fetchProductMatchingConfidenceVeryHigh() {
  // Will be implemented api call
}

export function* productMatchingSagas() {
  const sagaTaskId = yield fork(function* watchProductMatchingSagas() {
    yield all([
      takeLatest(Types.FETCH_PRODUCT_MATCHING_CONFIDENCE_VERY_HIGH_REQUEST, fetchProductMatchingConfidenceVeryHigh),
    ]);
  });

  yield take(Types.CLEAR_PRODUCT_MATCHING_STATE);
  yield cancel(sagaTaskId);
}
