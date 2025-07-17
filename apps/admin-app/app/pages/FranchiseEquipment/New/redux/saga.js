import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createFranchiseEquipment } from '@shared/api/franchiseEquipment';
import history from '@shared/utils/history';

function* createFranchiseEquipmentRequest({
  franchiseId,
  warehouseId,
  carCount,
  motoCount,
  openDate,
}) {
  try {
    yield call(createFranchiseEquipment, { franchiseId, warehouseId, carCount, motoCount, openDate });

    yield put(Creators.createFranchiseEquipmentSuccess());
    yield put(ToastCreators.success());
    history.push('/franchiseEquipment/list');
  }
  catch (error) {
    yield put(Creators.createFranchiseEquipmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateFranchiseEquipmentRequest() {
  yield takeLatest(Types.CREATE_FRANCHISE_EQUIPMENT_REQUEST, createFranchiseEquipmentRequest);
}

export default function* createFranchiseEquipmentRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateFranchiseEquipmentRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
