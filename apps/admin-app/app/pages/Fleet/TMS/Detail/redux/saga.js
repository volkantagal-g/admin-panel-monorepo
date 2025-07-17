import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getTmsVehicle, updateTmsVehicle } from '@shared/api/fleet';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

export function* tmsVehicleDetailsRequest({ vehicleId }) {
  try {
    const { tmsVehicle } = yield call(getTmsVehicle, { vehicleId });
    yield put(Creators.getTmsVehicleSuccess({ data: tmsVehicle }));
  }
  catch (error) {
    yield put(Creators.getTmsVehicleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* tmsVehicleUpdateRequest({ vehicleId, formValues }) {
  try {
    const { tmsVehicle } = yield call(updateTmsVehicle, { vehicleId, formValues });
    yield put(Creators.updateTmsVehicleSuccess({ data: tmsVehicle }));
    yield put(ToastCreators.success());
    history.push(ROUTE.TMS_LIST.path);
  }
  catch (error) {
    yield put(Creators.updateTmsVehicleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetTmsVehicleRequestRequest() {
  yield takeLatest(Types.GET_TMS_VEHICLE_REQUEST, tmsVehicleDetailsRequest);
}

export function* watchTmsVehicleUpdateRequest() {
  yield takeLatest(Types.UPDATE_TMS_VEHICLE_REQUEST, tmsVehicleUpdateRequest);
}

export default function* detailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTmsVehicleRequestRequest),
      fork(watchTmsVehicleUpdateRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
