import { all, cancel, fork, take, takeLatest } from 'redux-saga/effects';

import { Types } from './actions';

function* fetchSmartPricingIndex() {
  // Will be implemented api call
}

export function* smartPricingSagas() {
  const sagaTaskId = yield fork(function* watchSmartPricingSagas() {
    yield all([
      takeLatest(Types.FETCH_SMART_PRICING_INDEX_REQUEST, fetchSmartPricingIndex),
    ]);
  });

  yield take(Types.CLEAR_PRODUCT_MATCHING_STATE);
  yield cancel(sagaTaskId);
}
