import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getRunnerById, getTasksByRunnerId, updateRunner } from '@shared/api/runner';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getRunnerByIdRequest({ id }) {
  try {
    const data = yield call(getRunnerById, { id });
    yield put(Creators.getRunnerByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRunnerByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getTasksByRunnerIdRequest({ id }) {
  try {
    const data = yield call(getTasksByRunnerId, { id });
    yield put(Creators.getTasksByRunnerIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTasksByRunnerIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateRunnerRequest({ id, updateData }) {
  try {
    const data = yield call(updateRunner, { id, updateData });
    yield put(Creators.updateRunnerSuccess({ data }));
    yield put(Creators.getRunnerByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateRunnerFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRunnerByIdRequest() {
  yield takeLatest(Types.GET_RUNNER_BY_ID_REQUEST, getRunnerByIdRequest);
}

function* watchGetTasksByRunnerIdRequest() {
  yield takeLatest(Types.GET_TASKS_BY_RUNNER_ID_REQUEST, getTasksByRunnerIdRequest);
}

function* watchUpdateRunnerByIdRequest() {
  yield takeLatest(Types.UPDATE_RUNNER_REQUEST, updateRunnerRequest);
}

export default function* runnerDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchGetRunnerByIdRequest), fork(watchUpdateRunnerByIdRequest), fork(watchGetTasksByRunnerIdRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
