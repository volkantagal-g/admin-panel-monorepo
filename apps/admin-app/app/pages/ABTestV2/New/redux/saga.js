import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createTest, getTestTypeList } from '@shared/api/abTestingV2';
import { getClientListTemplateFilter } from '@shared/api/clientTargeting';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

import { Types, Creators } from './actions';
import { MESSAGE_WITH_STATUS_CODE } from '../../constants';

function* getTestTypeListRequest() {
  try {
    const { data } = yield call(getTestTypeList);
    yield put(Creators.getTestTypeListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTestTypeListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createABTestRequest({ requestData }) {
  try {
    const data = yield call(createTest, requestData);
    const message = MESSAGE_WITH_STATUS_CODE[data?.status_code];

    if (data?.successful) {
      yield put(Creators.createABTestSuccess({ data }));
      yield put(ToastCreators.success({ message }));
      const path = ROUTE.AB_TEST_V2_DETAIL.path.replace(':id', data?.id);
      history.push(path);
    }
    else {
      yield put(Creators.createABTestFailure({ error: message }));
      yield put(ToastCreators.error({ message }));
      return;
    }
  }
  catch (error) {
    yield put(Creators.createABTestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getClientListTemplatesRequest({ name }) {
  try {
    const data = yield call(getClientListTemplateFilter, { name });
    yield put(Creators.getClientListTemplatesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getClientListTemplatesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetTestTypeListRequestt() {
  yield takeLatest(Types.GET_TEST_TYPE_LIST_REQUEST, getTestTypeListRequest);
}

function* watchCreateABTestRequest() {
  yield takeLatest(Types.CREATE_AB_TEST_REQUEST, createABTestRequest);
}

function* watchGetClientListTemplatesRequest() {
  yield takeLatest(Types.GET_CLIENT_LIST_TEMPLATES_REQUEST, getClientListTemplatesRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateABTestRequest),
      fork(watchGetClientListTemplatesRequest),
      fork(watchGetTestTypeListRequestt),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
