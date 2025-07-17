import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getClientListTemplates } from '@shared/api/clientTargeting';
import { getTest, updateTest, completeTest, startTest, stopTest } from '@shared/api/abTestingV2';

import { Types, Creators } from './actions';
import { MESSAGE_WITH_STATUS_CODE } from '../../constants';

export function* getTestRequest({ testId }) {
  try {
    const data = yield call(getTest, testId);
    yield put(Creators.getTestSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getTestStatusRequest({ testId }) {
  try {
    const data = yield call(getTest, testId);
    if (data && data?.testStatus) {
      yield put(Creators.getTestStatusSuccess({ testStatus: data?.testStatus }));
    }
    else {
      yield put(Creators.getTestStatusFailure({ error: MESSAGE_WITH_STATUS_CODE[500] }));
      yield put(ToastCreators.error({ error: MESSAGE_WITH_STATUS_CODE[500] }));
    }
  }
  catch (error) {
    yield put(Creators.getTestStatusFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* startTestRequest({ testId }) {
  try {
    const data = yield call(startTest, testId);
    yield put(Creators.startABTestSuccess({ data }));
    yield put(Creators.getTestRequest({ testId }));
  }
  catch (error) {
    yield put(Creators.startABTestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* stopTestRequest({ testId }) {
  try {
    const data = yield call(stopTest, testId);
    yield put(Creators.stopABTestSuccess({ data }));
    yield put(Creators.getTestRequest({ testId }));
  }
  catch (error) {
    yield put(Creators.stopABTestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* completeTestRequest({ requestData }) {
  try {
    const data = yield call(completeTest, requestData);
    yield put(Creators.completeABTestSuccess({ data }));
    yield put(Creators.getTestRequest({ testId: requestData.testId }));
  }
  catch (error) {
    yield put(Creators.completeABTestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getClientListTemplatesRequest({ requestData }) {
  try {
    const data = yield call(getClientListTemplates, requestData);
    yield put(Creators.getClientListTemplatesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientListTemplatesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateABTestRequest({ requestData }) {
  try {
    const data = yield call(updateTest, requestData);
    const message = MESSAGE_WITH_STATUS_CODE[data?.status_code];
    if (data?.successful) {
      yield put(Creators.updateABTestSuccess({ data }));
      yield put(Creators.getTestRequest({ testId: requestData.testId }));
      yield put(ToastCreators.success({ message }));
    }
    else {
      yield put(Creators.updateABTestFailure({ error: message }));
      yield put(ToastCreators.error({ message }));
      return;
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

function* watchGetTestStatusRequest() {
  yield takeLatest(Types.GET_TEST_STATUS_REQUEST, getTestStatusRequest);
}
function* watchStartTestRequest() {
  yield takeLatest(Types.START_AB_TEST_REQUEST, startTestRequest);
}

function* watchStopTestRequest() {
  yield takeLatest(Types.STOP_AB_TEST_REQUEST, stopTestRequest);
}

function* watchCompleteTestRequest() {
  yield takeLatest(Types.COMPLETE_AB_TEST_REQUEST, completeTestRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetClientListTemplatesRequest),
      fork(watchGetTestRequest),
      fork(watchUpdateABTestRequest),
      fork(watchStartTestRequest),
      fork(watchStopTestRequest),
      fork(watchCompleteTestRequest),
      fork(watchGetTestStatusRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
