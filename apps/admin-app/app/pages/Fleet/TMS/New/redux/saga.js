import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { createTmsVehicle } from '@shared/api/fleet';
import { Types, Creators } from '@app/pages/Fleet/TMS/New/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* createTmsVehicleRequest({ formValues }) {
  try {
    const { tmsVehicle } = yield call(createTmsVehicle, { formValues });
    yield put(Creators.createTmsVehicleSuccess({ data: tmsVehicle }));
    yield put(ToastCreators.success());
    history.push('/tms/list');
  }
  catch (error) {
    yield put(Creators.createTmsVehicleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateTmsVehicleRequest() {
  yield takeLatest(Types.CREATE_TMS_VEHICLE_REQUEST, createTmsVehicleRequest);
}

export default function* createTmsVehiclePageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateTmsVehicleRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
