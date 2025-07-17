import { isFunction } from 'lodash';
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import { ActionWithType } from '@shared/containers/AssetManagementModules/types';

import {
  getVehicleDamageRecords,
  createVehicleDamageRecords,
  ICreateVehicleDamageRecord,
  updateVehicleDamageRecord,
  IUpdateVehicleDamageRecord,
  deleteVehicleDamageRecord,
} from '@shared/api/employeeAssetManagement/vehicleTabRequests';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators, Types } from './actions';

export function* filterVehicleDamageRequest(
  { assetId }: ActionWithType<{assetId: MongoIDType}>,
): Generator {
  try {
    const vehicleDamage = yield call(getVehicleDamageRecords, { assetId });
    yield put(Creators.filterVehicleDamageSuccess({ vehicleDamage }));
  }
  catch (error) {
    yield put(Creators.ffilterVehicleDamageFailure({ error }));
  }
}

export function* watchFilterVehicleDamageRequest(): Generator {
  yield takeLatest(Types.FILTER_VEHICLE_DAMAGE_REQUEST, filterVehicleDamageRequest);
}

export function* createVehicleDamageRequest(
  { vehicleDamageRecord, onSuccess }: ActionWithType<{vehicleDamageRecord: ICreateVehicleDamageRecord, onSuccess: () => void}>,
): Generator {
  try {
    const vehicleDamage = yield call(createVehicleDamageRecords, { vehicleDamageRecord });
    yield put(Creators.createVehicleDamageSuccess({ vehicleDamage }));

    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.createVehicleDamageFailure({ error }));
  }
}

export function* watchCreateVehicleDamageRequest(): Generator {
  yield takeLatest(Types.CREATE_VEHICLE_DAMAGE_REQUEST, createVehicleDamageRequest);
}

export function* updateVehicleDamageRequest(
  { vehicleDamageRecordId, updateData, onSuccess }:
  ActionWithType<{vehicleDamageRecordId: MongoIDType, updateData: IUpdateVehicleDamageRecord, onSuccess: () => void}>,
): Generator {
  try {
    const vehicleDamage = yield call(updateVehicleDamageRecord, { vehicleDamageRecordId, updateData });
    yield put(Creators.updateVehicleDamageSuccess({ vehicleDamage }));

    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.updateVehicleDamageFailure({ error }));
  }
}

export function* watchUpdateVehicleDamageRequest(): Generator {
  yield takeLatest(Types.UPDATE_VEHICLE_DAMAGE_REQUEST, updateVehicleDamageRequest);
}

export function* deleteVehicleDamageRequest(
  { vehicleDamageRecordId, onSuccess }: ActionWithType<{vehicleDamageRecordId: MongoIDType, onSuccess: () => void}>,
): Generator {
  try {
    const vehicleDamage = yield call(deleteVehicleDamageRecord, { vehicleDamageRecordId });
    yield put(Creators.deleteVehicleDamageSuccess({ vehicleDamage }));

    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.deleteVehicleDamageFailure({ error }));
  }
}

export function* watchDeleteVehicleDamageRequest(): Generator {
  yield takeLatest(Types.DELETE_VEHICLE_DAMAGE_REQUEST, deleteVehicleDamageRequest);
}

// Root Saga
export default function* complianceRecordRootSaga(): Generator {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchFilterVehicleDamageRequest),
      fork(watchCreateVehicleDamageRequest),
      fork(watchUpdateVehicleDamageRequest),
      fork(watchDeleteVehicleDamageRequest),
    ]);

    yield (take(Types.DESTROY_CONTAINER));

    // @ts-ignore
    yield all(backgroundTasks.map(task => task.cancel()));
  }
}
