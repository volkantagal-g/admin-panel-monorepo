import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { vehicleDetails, filterVehicleConstraints, updateVehicle, getVehicleLogs } from '@shared/api/fleet';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './action';
import { editVehicleCreationBody } from '../components/detailsPage/utils';

export function* vehicleDetailsRequest({ vehicleId }) {
  try {
    const data = yield call(vehicleDetails, { vehicleId });
    yield put(Creators.getVehicleDetailsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getVehicleDetailsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchVehicleDetailsRequest() {
  yield takeLatest(Types.GET_VEHICLE_DETAILS, vehicleDetailsRequest);
}

export function* createVehicleType() {
  try {
    const data = yield call(filterVehicleConstraints, {});
    yield put(Creators.getVehicleTypeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getVehicleTypeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchVehicleTypeRequest() {
  yield takeLatest(Types.GET_VEHICLE_TYPE, createVehicleType);
}

export function* getVehicleLogsRequest({ body }) {
  try {
    const data = yield call(getVehicleLogs, { body });
    yield put(Creators.getVehicleLogsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getVehicleLogsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetVehicleLogsRequest() {
  yield takeLatest(Types.GET_VEHICLE_LOGS_REQUEST, getVehicleLogsRequest);
}

export function* updateVehicleRequest({
  plate, constraintId, warehouse, franchise, city, licenceImage, licenceSerial, firstRegistrationDate, registrationDate,
  tradeName, brand, chasis, kind, color, engineNumber, identityNumber, inspectionValidityDate, tags, ownershipType, licenceOwner,
  licenceNumber, modelYear, id,
}) {
  const formValues = editVehicleCreationBody({
    plate,
    constraintId,
    warehouse,
    franchise,
    city,
    licenceImage,
    licenceSerial,
    firstRegistrationDate,
    registrationDate,
    tradeName,
    brand,
    chasis,
    kind,
    color,
    engineNumber,
    identityNumber,
    inspectionValidityDate,
    tags,
    ownershipType,
    licenceOwner,
    licenceNumber,
    modelYear,
  });
  try {
    const data = yield call(updateVehicle, { id, formValues });
    yield put(Creators.updateVehicleRequestSuccess({ data }));
    yield put(ToastCreators.success());
    history.push('/fleet/vehicle/list');
  }
  catch (error) {
    yield put(Creators.updateVehicleRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchUpdateVehicleRequest() {
  yield takeLatest(Types.UPDATE_VEHICLE_REQUEST, updateVehicleRequest);
}

export default function* vehicleListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchVehicleDetailsRequest),
      fork(watchVehicleTypeRequest),
      fork(watchUpdateVehicleRequest),
      fork(watchGetVehicleLogsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
