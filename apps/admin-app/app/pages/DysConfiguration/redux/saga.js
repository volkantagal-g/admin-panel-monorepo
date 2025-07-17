import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { getDysConfigs, updateDysConfigs } from '@shared/api/dys';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getDysConfigsRequest() {
  try {
    const data = yield call(getDysConfigs);
    yield put(Creators.getDysConfigsSuccess({ data }));
  }
  catch (error) {
    const detailedErrorMessage = error.response.data.message;
    yield put(ToastCreators.error({ message: detailedErrorMessage }));
    yield put(Creators.getDysConfigsFailure({ error }));
  }
}

function* updateDysConfigsRequest({ updateData }) {
  try {
    yield call(updateDysConfigs, { updateData });
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.updateDysConfigsFailure(error));
  }
}

function* watchGetDysConfigsRequest() {
  yield takeLatest(Types.GET_DYS_CONFIGS_REQUEST, getDysConfigsRequest);
}

function* watchUpdateDysConfigsRequest() {
  yield takeLatest(Types.UPDATE_DYS_CONFIGS_REQUEST, updateDysConfigsRequest);
}

export default function* dysConfigsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDysConfigsRequest),
      fork(watchUpdateDysConfigsRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
