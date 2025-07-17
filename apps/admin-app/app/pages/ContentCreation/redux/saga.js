import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getContentCreationTransactionId, getContentCreationTransactionDetails } from '@shared/api/aiContentGeneration';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getContentCreationTransactionIdRequest({ filters }) {
  try {
    const { data } = yield call(getContentCreationTransactionId, { ...filters });
    yield put(Creators.getContentCreationTransactionIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getContentCreationTransactionIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetContentCreationTransactionIdRequest() {
  yield takeLatest(Types.GET_CONTENT_CREATION_TRANSACTION_ID_REQUEST, getContentCreationTransactionIdRequest);
}

function* getContentCreationTransactionDetailsRequest({ transactionId }) {
  try {
    const { data } = yield call(getContentCreationTransactionDetails, { transactionId });
    yield put(Creators.getContentCreationTransactionDetailsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getContentCreationTransactionDetailsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetContentCreationTransactionDetailsRequest() {
  yield takeLatest(Types.GET_CONTENT_CREATION_TRANSACTION_DETAILS_REQUEST, getContentCreationTransactionDetailsRequest);
}

export default function* contentCreationPageRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetContentCreationTransactionIdRequest),
      fork(watchGetContentCreationTransactionDetailsRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
