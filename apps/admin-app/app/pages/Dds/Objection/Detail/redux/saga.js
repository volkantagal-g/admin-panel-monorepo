import { all, cancel, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getDdsObjectionDetail as getDdsObjectionDetailApi,
  acceptDdsObjection as acceptDdsObjectionApi,
  rejectDdsObjection as rejectDdsObjectionApi,
} from '@shared/api/dds';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getDdsObjectionDetail({ objectionId }) {
  try {
    const data = yield call(getDdsObjectionDetailApi, { objectionId });
    yield put(Creators.getDdsObjectionDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDdsObjectionDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* acceptDdsObjectionRequest({ objectionId }) {
  try {
    yield call(acceptDdsObjectionApi, { objectionId });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.acceptDdsObjectionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* rejectDdsObjectionRequest({ objectionId, description }) {
  try {
    yield call(rejectDdsObjectionApi, { objectionId, description });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.rejectDdsObjectionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAcceptDdsObjectionRequest() {
  yield takeLatest(Types.ACCEPT_DDS_OBJECTION_REQUEST, acceptDdsObjectionRequest);
}

function* watchRejectDdsObjectionRequest() {
  yield takeLatest(Types.REJECT_DDS_OBJECTION_REQUEST, rejectDdsObjectionRequest);
}

function* watchDdsObjectionDetailRequest() {
  yield takeLatest(Types.GET_DDS_OBJECTION_DETAIL_REQUEST, getDdsObjectionDetail);
}

export default function* ddsObjectionDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchDdsObjectionDetailRequest),
      fork(watchAcceptDdsObjectionRequest),
      fork(watchRejectDdsObjectionRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
