import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createKdsQuestionGroup as createKdsQuestionGroupApi } from '@shared/api/kds/questionGroup';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';

function* createKdsQuestionGroupRequest({
  name,
  status,
  auditFormType,
}) {
  try {
    yield call(createKdsQuestionGroupApi, { name, status, auditFormType });

    yield put(Creators.createKdsQuestionGroupSuccess());
    yield put(ToastCreators.success());
    history.push('/kds/questionGroup/list');
  }
  catch (error) {
    yield put(Creators.createKdsQuestionGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateKdsQuestionGroupRequest() {
  yield takeLatest(Types.CREATE_KDS_QUESTION_GROUP_REQUEST, createKdsQuestionGroupRequest);
}

export default function* createKdsQuestionGroupRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateKdsQuestionGroupRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
