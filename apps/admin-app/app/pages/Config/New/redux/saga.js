import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createConfig as createConfigApi } from '@shared/api/marketConfig';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';
import { ROUTE } from '@app/routes';

function* createConfigRequest({ key, configType, value, description, responsibleSquad }) {
  try {
    yield call(createConfigApi, { key, value, type: configType, description, responsibleSquad });
    yield put(ToastCreators.success());
    history.push(ROUTE.CONFIG_LIST.path);
  }
  catch (error) {
    yield put(Creators.createConfigFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateConfigRequest() {
  yield takeLatest(Types.CREATE_CONFIG_REQUEST, createConfigRequest);
}

export default function* createConfigRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateConfigRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
