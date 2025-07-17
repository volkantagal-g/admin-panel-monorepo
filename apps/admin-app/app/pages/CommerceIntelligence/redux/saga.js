// Saga file for Commerce Intelligence

import { all, takeLatest } from 'redux-saga/effects';

import { Types } from './actions';

function* initPageSaga() {
  // Initialize page saga logic here
}

function* destroyPageSaga() {
  // Cleanup page saga logic here
}

function* watchInitPage() {
  yield takeLatest(Types.INIT_PAGE, initPageSaga);
}

function* watchDestroyPage() {
  yield takeLatest(Types.DESTROY_PAGE, destroyPageSaga);
}

export default function* rootSaga() {
  yield all([
    watchInitPage(),
    watchDestroyPage(),
  ]);
}
