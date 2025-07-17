import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { filterVehicleConstraints } from '@shared/api/fleet';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

export function* vehicleConstraintListRequest({
  statuses,
  types,
  limit,
  offset,
}) {
  try {
    const { vehicleConstraints, totalCount } = yield call(filterVehicleConstraints, {
      status: statuses,
      type: types,
      limit,
      offset,
    });
    yield put(Creators.getVehicleConstraintListSuccess({ data: { vehicleConstraints, totalCount } }));
  }
  catch (error) {
    yield put(Creators.getVehicleConstraintListFailure());
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchVehicleConstraintListRequest() {
  yield takeLatest(Types.GET_VEHICLE_CONSTRAINT_LIST_REQUEST, vehicleConstraintListRequest);
}

export default function* vehicleConstraintListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchVehicleConstraintListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
