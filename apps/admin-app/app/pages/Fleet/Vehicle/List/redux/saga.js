import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { filterVehicleConstraints, bulkCreateOrUpdateVehicle, filterVehicleListV2 } from '@shared/api/fleet';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './action';
import { vehicleListRequestParams } from '../../utils';

export function* vehicleListRequest({
  statuses,
  warehouseIds,
  franchiseIds,
  cities,
  tag,
  plate,
  vehicleConstraintId,
  currentPage,
  rowsPerPage,
  withTotalCount,
}) {
  try {
    const requestParams = vehicleListRequestParams(
      {
        warehouseIds,
        franchiseIds,
        cities,
        tag,
        statuses,
        plate,
        vehicleConstraintId,
        currentPage,
        rowsPerPage,
        withTotalCount,
      },
    );
    const data = yield call(filterVehicleListV2, requestParams);
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

export function* vehicleTypeListRequest({
  statuses,
  types,
}) {
  try {
    const data = yield call(filterVehicleConstraints, {
      status: statuses,
      type: types,
    });
    yield put(Creators.getVehicleTypeListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getVehicleTypeListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchVehicleTypeListRequest() {
  yield takeLatest(Types.GET_VEHICLE_TYPE_LIST, vehicleTypeListRequest);
}

export function* bulkVehicleCreateUpdateRequest({ callType, vehicles }) {
  try {
    const { failedPlates } = yield call(bulkCreateOrUpdateVehicle, { callType, vehicles });
    yield put(Creators.bulkVehicleUpdateCreateSuccess({ data: failedPlates }));
    if (failedPlates.length) {
      yield put(Creators.updateCsvWarningModalVisibility({ showCsvWarningModal: true }));
    }
    yield put(ToastCreators.success({ message: 'Uploaded Successfully!!' }));
  }
  catch (error) {
    yield put(Creators.bulkVehicleUpdateCreateFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchBulkVehicleCreateUpdateRequest() {
  yield takeLatest(Types.BULK_VEHICLE_UPDATE_CREATE_REQUEST, bulkVehicleCreateUpdateRequest);
}

export default function* vehicleListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchVehicleListRequest),
      fork(watchVehicleTypeListRequest),
      fork(watchBulkVehicleCreateUpdateRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
