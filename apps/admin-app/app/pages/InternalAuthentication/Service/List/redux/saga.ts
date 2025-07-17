import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getServices as getServicesApi } from '@shared/api/internalAuthentication';

import { Types, Creators } from './actions';

function* getServices() {
  try {
    const { data } = yield call(getServicesApi);
    yield put(Creators.getServicesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getServicesFailure({ error }));
  }
}

function* watchGetServicesRequest() {
  yield takeLatest(Types.GET_SERVICES_REQUEST, getServices);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetServicesRequest),
    ]);

    yield put(Creators.getServicesRequest());

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
