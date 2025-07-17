import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getFranchiseEquipmentDetail,
  updateFranchiseEquipment,
  getFranchiseEquipmentLogs,
  updateFranchiseEquipmentVehicleCount,
  archiveFranchiseEquipment,
} from '@shared/api/franchiseEquipment';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getFranchiseEquipmentDetailRequest({ id }) {
  try {
    const { data, franchiseId, warehouseId, openDate, isArchived, archivedAt } = yield call(getFranchiseEquipmentDetail, { id });
    yield put(Creators.getFranchiseEquipmentDetailSuccess({ data: { ...data, franchiseId, warehouseId, openDate, isArchived, archivedAt } }));
  }
  catch (error) {
    yield put(Creators.getFranchiseEquipmentDetailFailure({ error }));
  }
}

function* updateFranchiseEquipmentRequest({ id, data, openDate }) {
  try {
    yield call(updateFranchiseEquipment, { id, data, openDate });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.updateFranchiseEquipmentFailure({ error }));
  }
}

function* archiveFranchiseEquipmentRequest({ id }) {
  try {
    yield call(archiveFranchiseEquipment, { id });
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.archiveFranchiseEquipmentFailure({ error }));
  }
}

function* getFranchiseEquipmentLogsRequest({ id, limit, offset }) {
  try {
    const { logs, totalCount } = yield call(getFranchiseEquipmentLogs, { id, limit, offset });
    yield put(Creators.getFranchiseEquipmentLogsSuccess({ data: logs, totalCount }));
  }
  catch (error) {
    yield put(Creators.getFranchiseEquipmentLogsFailure({ error }));
  }
}

function* updateFranchiseEquipmentVehicleCountRequest({ id, data }) {
  try {
    yield call(updateFranchiseEquipmentVehicleCount, { id, data });
    const { data: franchiseEquipmentData, franchiseId, warehouseId, openDate } = yield call(getFranchiseEquipmentDetail, { id });
    yield put(Creators.getFranchiseEquipmentDetailSuccess({ data: { ...franchiseEquipmentData, franchiseId, warehouseId, openDate } }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateFranchiseEquipmentVehicleCountFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFranchiseEquipmentDetailRequest() {
  yield takeLatest(Types.GET_FRANCHISE_EQUIPMENT_DETAIL_REQUEST, getFranchiseEquipmentDetailRequest);
}

function* watchUpdateFranchiseEquipmentRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_EQUIPMENT_REQUEST, updateFranchiseEquipmentRequest);
}

function* watchArchiveFranchiseEquipmentRequest() {
  yield takeLatest(Types.ARCHIVE_FRANCHISE_EQUIPMENT_REQUEST, archiveFranchiseEquipmentRequest);
}

function* watchGetFranchiseEquipmentLogsRequest() {
  yield takeLatest(Types.GET_FRANCHISE_EQUIPMENT_LOGS_REQUEST, getFranchiseEquipmentLogsRequest);
}

function* watchUpdateFranchiseEquipmentVehicleCountRequest() {
  yield takeLatest(Types.UPDATE_FRANCHISE_EQUIPMENT_VEHICLE_COUNT_REQUEST, updateFranchiseEquipmentVehicleCountRequest);
}

export default function* getFranchiseEquipmentDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFranchiseEquipmentDetailRequest),
      fork(watchUpdateFranchiseEquipmentRequest),
      fork(watchArchiveFranchiseEquipmentRequest),
      fork(watchGetFranchiseEquipmentLogsRequest),
      fork(watchUpdateFranchiseEquipmentVehicleCountRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
