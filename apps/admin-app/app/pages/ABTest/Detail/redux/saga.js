import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getTest, updateTest } from '@shared/api/abTesting';

import { Types, Creators } from './actions';
import { getClientListTemplates } from '@shared/api/clientTargeting';

function* getTestRequest({ testId }) {
  try {
    const data = yield call(getTest, testId);
    yield put(Creators.getTestSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientListTemplatesRequest({ requestData }) {
  try {
    const data = yield call(getClientListTemplates, requestData);
    yield put(Creators.getClientListTemplatesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientListTemplatesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateABTestRequest({ requestData }) {
  try {
    const data = yield call(updateTest, requestData);
    yield put(Creators.updateABTestSuccess({ data }));

    if (data && data._id) {
      yield call(getTestRequest, { testId: data._id });
    }
  }
  catch (error) {
    yield put(Creators.updateABTestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateABTestRequest() {
  yield takeLatest(Types.UPDATE_AB_TEST_REQUEST, updateABTestRequest);
}

function* watchGetClientListTemplatesRequest() {
  yield takeLatest(Types.GET_CLIENT_LIST_TEMPLATES_REQUEST, getClientListTemplatesRequest);
}

function* watchGetTestRequest() {
  yield takeLatest(Types.GET_TEST_REQUEST, getTestRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetClientListTemplatesRequest),
      fork(watchGetTestRequest),
      fork(watchUpdateABTestRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
