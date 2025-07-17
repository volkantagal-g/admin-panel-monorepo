import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { createKdsQuestionRequest as createKdsQuestionRequestApi } from '@shared/api/kds/question';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

function* createKdsQuestionRequest({ requestBody: question }) {
  try {
    yield call(createKdsQuestionRequestApi, { question });
    yield put(Creators.createKdsQuestionSuccess());

    history.push(ROUTE.KDS_QUESTION_LIST.path);
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createKdsQuestionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateKdsQuestionRequest() {
  yield takeLatest(Types.CREATE_KDS_QUESTION_REQUEST, createKdsQuestionRequest);
}

export default function* kdsQuestionCreationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateKdsQuestionRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
