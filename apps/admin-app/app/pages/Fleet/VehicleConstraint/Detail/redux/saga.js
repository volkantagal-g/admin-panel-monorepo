import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import {
  updateVehicleConstraint,
  getVehicleConstraintsById,
  activateVehicleConstraint,
  inactivateVehicleConstraint,
} from '@shared/api/fleet';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

export function* getVehicleConstraintRequest({ vehicleConstraintId }) {
  try {
    const { vehicleConstraint } = yield call(getVehicleConstraintsById, { vehicleConstraintId });
    yield put(Creators.getVehicleConstraintSuccess({ data: vehicleConstraint }));
  }
  catch (error) {
    yield put(Creators.getVehicleConstraintFailure());
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetVehicleConstraintRequest() {
  yield takeLatest(Types.GET_VEHICLE_CONSTRAINT_REQUEST, getVehicleConstraintRequest);
}

export function* updateVehicleConstraintRequest({ vehicleConstraintId, name, vehicleType, constraints }) {
  try {
    yield call(updateVehicleConstraint, { vehicleConstraintId, name, type: vehicleType, constraints });
    yield put(Creators.updateVehicleConstraintSuccess());
    yield put(ToastCreators.success());

    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateVehicleConstraintFailure());
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchUpdateVehicleConstraintRequest() {
  yield takeLatest(Types.UPDATE_VEHICLE_CONSTRAINT_REQUEST, updateVehicleConstraintRequest);
}

export function* changeVehicleConstraintActivenessRequest({ id, newActivenessStatus }) {
  try {
    if (newActivenessStatus) {
      yield call(activateVehicleConstraint, { id });
    }
    else {
      yield call(inactivateVehicleConstraint, { id });
    }
    yield call(getVehicleConstraintRequest, { vehicleConstraintId: id });
    yield put(Creators.changeVehicleConstraintActivenessSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.changeVehicleConstraintActivenessFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchChangeVehicleConstraintActivenessRequest() {
  yield takeLatest(Types.CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_REQUEST, changeVehicleConstraintActivenessRequest);
}

export default function* vehicleConstraintRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUpdateVehicleConstraintRequest),
      fork(watchGetVehicleConstraintRequest),
      fork(watchChangeVehicleConstraintActivenessRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
