import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { tmsFilter, tmsDelete } from '@shared/api/fleet';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './action';
import vehicleListRequestParams from '../utils';

export function* vehicleListRequest({ plate, dincerId, palletCapacity, volumeCapacity, activeness, vehicleType, vehicleClass, currentPage, rowsPerPage }) {
  try {
    const requestParams = vehicleListRequestParams({
      plate,
      dincerId,
      palletCapacity,
      volumeCapacity,
      activeness,
      vehicleType,
      vehicleClass,
      currentPage,
      rowsPerPage,
    });
    const data = yield call(tmsFilter, requestParams);
    yield put(Creators.getVehicleListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getVehicleListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchVehicleListRequest() {
  yield takeLatest(Types.GET_VEHICLE_LIST, vehicleListRequest);
}

export function* deleteTmsVehicle({ id }) {
  try {
    const data = yield call(tmsDelete, { id });
    yield put(Creators.deleteVehicleSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.deleteVehicleFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchVehicleDelete() {
  yield takeLatest(Types.DELETE_VEHICLE, deleteTmsVehicle);
}

export default function* vehicleListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchVehicleListRequest),
      fork(watchVehicleDelete),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
