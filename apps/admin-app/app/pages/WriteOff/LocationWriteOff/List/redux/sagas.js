import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { filterLocationWriteOff } from '@shared/api/locationWriteOff';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { filterWarehouseLocations } from '@shared/api/warehouseLocation';

function* locationWriteOffRequest({ warehouses, statuses, reasons, locations, createdAt, approvedAt, limit, offset }) {
  try {
    const locationWriteOffs = yield call(filterLocationWriteOff, {
      warehouseIds: warehouses,
      statuses,
      locations,
      reasons,
      createdAt,
      approvedAt,
      limit,
      offset,
    });

    yield put(Creators.filterLocationWriteOffSuccess(locationWriteOffs));
  }
  catch (error) {
    yield put(Creators.filterLocationWriteOffFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getLocationsRequest({ warehouseId }) {
  try {
    const locationsData = yield call(filterWarehouseLocations, { warehouseId, isAllowedForWriteOff: true });
    yield put(Creators.getLocationsSuccess({ data: locationsData }));
  }
  catch (error) {
    yield put(Creators.getLocationsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchLocationWriteOffRequest() {
  yield takeLatest(Types.FILTER_LOCATION_WRITE_OFF_REQUEST, locationWriteOffRequest);
}

function* watchGetLocationsRequest() {
  yield takeLatest(Types.GET_LOCATIONS_REQUEST, getLocationsRequest);
}

export default function* locationWriteOffsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchLocationWriteOffRequest),
      fork(watchGetLocationsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
