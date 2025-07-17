import _ from 'lodash';

import {
  all,
  takeLatest,
  call,
  cancel,
  fork,
  put,
  take,
} from 'redux-saga/effects';

import { createRunner } from '@shared/api/runner';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

function* createRunnerRequest({ body }) {
  const { cellPhone, ...rest } = body;
  try {
    const data = yield call(createRunner, { body: { cellPhone: `+${cellPhone}`, ...rest } });
    yield put(Creators.createRunnerSuccess({ data }));
    yield put(ToastCreators.success());
    const runnerUuid = _.get(data.data, 'runnerUuid', '');
    const path = ROUTE.GL_RUNNER_DETAIL.path.replace(':id', runnerUuid);
    history.push(path);
  }
  catch (error) {
    yield put(Creators.createRunnerFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateRunnerRequest() {
  yield takeLatest(Types.CREATE_RUNNER_REQUEST, createRunnerRequest);
}

export default function* runnerNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchCreateRunnerRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
