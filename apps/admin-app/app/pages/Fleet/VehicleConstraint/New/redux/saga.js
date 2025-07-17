import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';
import { createVehicleConstraint, getAllVehicleConstraints } from '@shared/api/fleet';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

export function* createVehicleConstraintRequest({ name, vehicleType, constraints }) {
  try {
    yield call(createVehicleConstraint, { name, type: vehicleType, constraints });
    yield put(Creators.createVehicleConstraintSuccess());
    yield put(ToastCreators.success());

    history.push(ROUTE?.VEHICLE_CONSTRAINT_LIST?.path);
  }
  catch (error) {
    yield put(Creators.createVehicleConstraintFailure());
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateVehicleConstraintRequest() {
  yield takeLatest(Types.CREATE_VEHICLE_CONSTRAINT_REQUEST, createVehicleConstraintRequest);
}

export function* getVehicleConstraintsRequest() {
  try {
    const { vehicleConstraints } = yield call(getAllVehicleConstraints, {});
    yield put(Creators.getVehicleConstraintsSuccess({ data: vehicleConstraints }));
  }
  catch (error) {
    yield put(Creators.getVehicleConstraintsFailure());
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetVehicleConstraintsRequest() {
  yield takeLatest(Types.GET_VEHICLE_CONSTRAINTS_REQUEST, getVehicleConstraintsRequest);
}

export default function* vehicleConstraintRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateVehicleConstraintRequest),
      fork(watchGetVehicleConstraintsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
