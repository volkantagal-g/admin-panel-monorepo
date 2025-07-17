import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getKdsQuestionDetail, updateKdsQuestion } from '@shared/api/kds/question';
import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getKdsQuestionDetailRequest({ id }) {
  try {
    const { data } = yield call(getKdsQuestionDetail, { id });
    yield put(Creators.getKdsQuestionDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getKdsQuestionDetailFailure({ error }));
  }
}

function* updateKdsQuestionRequest({ data }) {
  try {
    yield call(updateKdsQuestion, { data });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateKdsQuestionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetKdsQuestionDetailRequest() {
  yield takeLatest(Types.GET_KDS_QUESTION_DETAIL_REQUEST, getKdsQuestionDetailRequest);
}

function* watchUpdateKdsQuestionRequest() {
  yield takeLatest(Types.UPDATE_KDS_QUESTION_REQUEST, updateKdsQuestionRequest);
}

export default function* getKdsQuestionDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetKdsQuestionDetailRequest),
      fork(watchUpdateKdsQuestionRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
