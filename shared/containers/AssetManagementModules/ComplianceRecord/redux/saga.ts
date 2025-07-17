import { isFunction } from 'lodash';
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import { ActionWithType, VehicleComplianceRecord } from '@shared/containers/AssetManagementModules/types';

import {
  createVehicleComplianceRecord as createVehicleComplianceRecordApi,
  filterVehicleComplianceRecords as filterVehicleComplianceRecordsApi,
  deleteVehicleComplianceRecord as deleteVehicleComplianceRecordApi,
  updateVehicleComplianceRecord as updateVehicleComplianceRecordApi,
  IFilterVehicleComplianceRecords,
  ICreateVehicleComplianceRecord,
  IUpdateVehicleComplianceRecord,
  IDeleteVehicleComplianceRecord,
} from '@shared/api/employeeAssetManagement/vehicleTabRequests';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators, Types } from './actions';
import { VEHICLE_COMPLIANCE_RECORD_TYPES } from '@shared/containers/AssetManagementModules/constants';

// Vehicle Inspection Sagas
export function* filterVehicleInspectionRequest(
  { asset }: ActionWithType<{asset: string}>,
): Generator {
  try {
    const payload: IFilterVehicleComplianceRecords = {
      fields: '_id type startDate endDate documentFileKey',
      type: [VEHICLE_COMPLIANCE_RECORD_TYPES.INSPECTION],
      asset: [asset],
    };

    const { vehicleComplianceRecords: vehicleInspections } = yield call(filterVehicleComplianceRecordsApi, payload);
    yield put(Creators.filterVehicleInspectionSuccess({ vehicleInspections }));
  }
  catch (error) {
    yield put(Creators.filterVehicleInspectionFailure({ error }));
  }
}

export function* createVehicleInspectionRequest(
  { vehicleInspection, onSuccess }: ActionWithType<{ vehicleInspection: VehicleComplianceRecord, onSuccess: Function}>,
): Generator {
  try {
    const { asset, startDate, endDate, documentFileKey } = vehicleInspection;

    const payload: ICreateVehicleComplianceRecord = {
      asset,
      type: VEHICLE_COMPLIANCE_RECORD_TYPES.INSPECTION,
      startDate,
      endDate,
      documentFileKey: documentFileKey || undefined,
    };

    yield call(createVehicleComplianceRecordApi, payload);
    yield put(Creators.createVehicleInspectionSuccess());
    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.createComplianceRecordFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateVehicleInspectionRequest(
  { vehicleInspectionId, updateData, onSuccess } : ActionWithType<{ vehicleInspectionId: MongoIDType, updateData: any, onSuccess: Function}>,
): Generator {
  try {
    const payload: IUpdateVehicleComplianceRecord = {
      vehicleComplianceRecordId: vehicleInspectionId,
      updateData: {
        startDate: updateData?.startDate,
        endDate: updateData?.endDate,
        documentFileKey: updateData?.documentFileKey,
      },
    };

    yield call(updateVehicleComplianceRecordApi, payload);
    yield put(Creators.updateVehicleInspectionSuccess());
    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.updateVehicleInspectionFailure());
    yield put(ToastCreators.error());
  }
}

export function* deleteVehicleInspectionRequest(
  { vehicleInspectionId, onSuccess }: ActionWithType<{ vehicleInspectionId: MongoIDType, onSuccess: Function }>,
): Generator {
  try {
    const payload: IDeleteVehicleComplianceRecord = { vehicleComplianceRecordId: vehicleInspectionId };
    yield call(deleteVehicleComplianceRecordApi, payload);
    yield put(Creators.deleteVehicleInspectionSuccess());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.deleteVehicleInspectionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

// Vehicle Inspection Watcher Sagas
export function* watchFilterVehicleInspectionRequest() {
  yield takeLatest(Types.FILTER_VEHICLE_INSPECTION_REQUEST, filterVehicleInspectionRequest);
}
export function* watchCreateVehicleInspectionRequest() {
  yield takeLatest(Types.CREATE_VEHICLE_INSPECTION_REQUEST, createVehicleInspectionRequest);
}
export function* watchUpdateVehicleInspectionRequest() {
  yield takeLatest(Types.UPDATE_VEHICLE_INSPECTION_REQUEST, updateVehicleInspectionRequest);
}
export function* watchDeleteVehicleInspectionRequest() {
  yield takeLatest(Types.DELETE_VEHICLE_INSPECTION_REQUEST, deleteVehicleInspectionRequest);
}

// Vehicle Insurance Sagas
export function* filterVehicleInsuranceRequest(
  { asset }: ActionWithType<{asset: MongoIDType}>,
): Generator {
  try {
    const payload: IFilterVehicleComplianceRecords = {
      fields: '_id type startDate endDate documentFileKey',
      type: [VEHICLE_COMPLIANCE_RECORD_TYPES.INSURANCE],
      asset: [asset],
    };

    const { vehicleComplianceRecords: vehicleInsurances } = yield call(filterVehicleComplianceRecordsApi, payload);
    yield put(Creators.filterVehicleInsuranceSuccess({ vehicleInsurances }));
  }
  catch (error) {
    yield put(Creators.filterVehicleInsuranceFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* createVehicleInsuranceRequest(
  { vehicleInsurance, onSuccess }: ActionWithType<{vehicleInsurance: VehicleComplianceRecord, onSuccess: Function}>,
): Generator {
  try {
    const { asset, startDate, endDate, documentFileKey } = vehicleInsurance;

    const payload: ICreateVehicleComplianceRecord = {
      asset,
      type: VEHICLE_COMPLIANCE_RECORD_TYPES.INSURANCE,
      startDate,
      endDate,
      documentFileKey,
    };

    yield call(createVehicleComplianceRecordApi, payload);
    yield put(Creators.createVehicleInsuranceSuccess());
    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.createVehicleInsuranceFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateVehicleInsuranceRequest(
  { vehicleInsuranceId, updateData, onSuccess } : ActionWithType<{ vehicleInsuranceId: MongoIDType, updateData: any, onSuccess: Function }>,
): Generator {
  try {
    const payload: IUpdateVehicleComplianceRecord = {
      vehicleComplianceRecordId: vehicleInsuranceId,
      updateData: {
        startDate: updateData?.startDate,
        endDate: updateData?.endDate,
        documentFileKey: updateData?.documentFileKey,
      },
    };

    yield call(updateVehicleComplianceRecordApi, payload);
    yield put(Creators.updateVehicleInspectionSuccess());
    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.updateVehicleInsuranceFailure());
    yield put(ToastCreators.error({ error }));
  }
}

export function* deleteVehicleInsuranceRequest(
  { vehicleInsuranceId, onSuccess }: ActionWithType<{ vehicleInsuranceId: MongoIDType, onSuccess: Function }>,
): Generator {
  try {
    const payload: IDeleteVehicleComplianceRecord = { vehicleComplianceRecordId: vehicleInsuranceId };
    yield call(deleteVehicleComplianceRecordApi, payload);
    yield put(Creators.deleteVehicleInspectionSuccess());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.deleteVehicleInsuranceFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

// Vehicle Insurance Watcher Sagas
export function* watchFilterVehicleInsuranceRequest() {
  yield takeLatest(Types.FILTER_VEHICLE_INSURANCE_REQUEST, filterVehicleInsuranceRequest);
}
export function* watchCreateVehicleInsuranceRequest() {
  yield takeLatest(Types.CREATE_VEHICLE_INSURANCE_REQUEST, createVehicleInsuranceRequest);
}
export function* watchUpdateVehicleInsuranceRequest() {
  yield takeLatest(Types.UPDATE_VEHICLE_INSURANCE_REQUEST, updateVehicleInsuranceRequest);
}
export function* watchDeleteVehicleInsuranceRequest() {
  yield takeLatest(Types.DELETE_VEHICLE_INSURANCE_REQUEST, deleteVehicleInsuranceRequest);
}

// Vehicle Coverage Sagas
export function* filterVehicleCoverageRequest(
  { asset }: ActionWithType<{asset: string}>,
): Generator {
  try {
    const payload: IFilterVehicleComplianceRecords = {
      fields: '_id type startDate endDate documentFileKey',
      type: [VEHICLE_COMPLIANCE_RECORD_TYPES.COVERAGE],
      asset: [asset],
    };

    const { vehicleComplianceRecords: vehicleCoverages } = yield call(filterVehicleComplianceRecordsApi, payload);
    yield put(Creators.filterVehicleCoverageSuccess({ vehicleCoverages }));
  }
  catch (error) {
    yield put(Creators.filterVehicleCoverageFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
export function* createVehicleCoverageRequest(
  { vehicleCoverage, onSuccess }: ActionWithType<{ vehicleCoverage: VehicleComplianceRecord, onSuccess: Function}>,
): Generator {
  const { asset, startDate, endDate, documentFileKey } = vehicleCoverage;

  const payload: ICreateVehicleComplianceRecord = {
    asset,
    type: VEHICLE_COMPLIANCE_RECORD_TYPES.COVERAGE,
    startDate,
    endDate,
    documentFileKey,
  };

  try {
    yield call(createVehicleComplianceRecordApi, payload);
    yield put(Creators.createVehicleCoverageSuccess());
    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.createVehicleCoverageFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
export function* updateVehicleCoverageRequest(
  { vehicleCoverageId, updateData, onSuccess } : ActionWithType<{ vehicleCoverageId: MongoIDType, updateData: any, onSuccess: Function }>,
): Generator {
  try {
    const payload: IUpdateVehicleComplianceRecord = {
      vehicleComplianceRecordId: vehicleCoverageId,
      updateData: {
        startDate: updateData?.startDate,
        endDate: updateData?.endDate,
        documentFileKey: updateData?.documentFileKey,
      },
    };

    yield call(updateVehicleComplianceRecordApi, payload);
    yield put(Creators.updateVehicleCoverageSuccess());
    yield put(ToastCreators.success());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.updateVehicleCoverageFailure());
    yield put(ToastCreators.error({ error }));
  }
}
export function* deleteVehicleCoverageRequest(
  { vehicleCoverageId, onSuccess }: ActionWithType<{ vehicleCoverageId: MongoIDType, onSuccess: Function }>,
): Generator {
  try {
    const payload: IDeleteVehicleComplianceRecord = { vehicleComplianceRecordId: vehicleCoverageId };
    yield call(deleteVehicleComplianceRecordApi, payload);
    yield put(Creators.deleteVehicleCoverageSuccess());

    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.deleteVehicleCoverageFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

// Vehicle Coverage Watcher Sagas
export function* watchFilterVehicleCoverageRequest() {
  yield takeLatest(Types.FILTER_VEHICLE_COVERAGE_REQUEST, filterVehicleCoverageRequest);
}
export function* watchCreateVehicleCoverageRequest() {
  yield takeLatest(Types.CREATE_VEHICLE_COVERAGE_REQUEST, createVehicleCoverageRequest);
}
export function* watchUpdateVehicleCoverageRequest() {
  yield takeLatest(Types.UPDATE_VEHICLE_COVERAGE_REQUEST, updateVehicleCoverageRequest);
}
export function* watchDeleteVehicleCoverageRequest() {
  yield takeLatest(Types.DELETE_VEHICLE_COVERAGE_REQUEST, deleteVehicleCoverageRequest);
}

// Root Saga
export default function* complianceRecordRootSaga(): Generator {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      // Vehicle Inspection
      fork(watchFilterVehicleInspectionRequest),
      fork(watchCreateVehicleInspectionRequest),
      fork(watchUpdateVehicleInspectionRequest),
      fork(watchDeleteVehicleInspectionRequest),

      // Vehicle Insurance
      fork(watchCreateVehicleInsuranceRequest),
      fork(watchFilterVehicleInsuranceRequest),
      fork(watchUpdateVehicleInsuranceRequest),
      fork(watchDeleteVehicleInsuranceRequest),

      // Vehicle Coverage
      fork(watchCreateVehicleCoverageRequest),
      fork(watchFilterVehicleCoverageRequest),
      fork(watchUpdateVehicleCoverageRequest),
      fork(watchDeleteVehicleCoverageRequest),
    ]);

    yield (take(Types.DESTROY_CONTAINER));

    // @ts-ignore
    yield all(backgroundTasks.map(task => task.cancel()));
  }
}
