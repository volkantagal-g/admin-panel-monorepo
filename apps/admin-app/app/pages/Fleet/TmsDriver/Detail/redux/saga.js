import { all, cancel, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getTmsDriverById } from '@shared/api/fleet';
import { Types, Creators } from './actions';
import { TMS_DRIVER_FIELDS } from '../constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getTmsDriverRequest({ id }) {
  try {
    const { courier } = yield call(getTmsDriverById, { id, fields: TMS_DRIVER_FIELDS });
    yield put(Creators.getTmsDriverSuccess({ data: courier }));
  }
  catch (error) {
    yield put(Creators.getTmsDriverFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetTmsDriverRequest() {
  yield takeLatest(Types.GET_TMS_DRIVER_REQUEST, getTmsDriverRequest);
}

export default function* tmsDriverDetailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTmsDriverRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
