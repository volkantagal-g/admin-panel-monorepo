import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';
import { createVehicle, filterVehicleConstraints } from '@shared/api/fleet';
import { editVehicleCreationBody } from '../components/Form/utils';
import { ROUTE } from '@app/routes';

export function* vehicleRequest({
  plate, constraintId, warehouse, franchise, city, licenceImage, licenceSerial, firstRegistrationDate, registrationDate,
  tradeName, brand, chasis, kind, color, engineNumber, identityNumber, inspectionValidityDate, tags, ownershipType, licenceOwner,
  licenceNumber, modelYear, isCreatingAnotherVehicle,
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
    yield call(createVehicle, formValues);

    yield put(Creators.createVehicleRequestSuccess({}));
    yield put(ToastCreators.success());
    if (!isCreatingAnotherVehicle) {
      yield call(history.push, ROUTE.VEHICLE_LIST.path);
    }
    else {
      const searchParams = new URLSearchParams(history.location.search);
      searchParams.set('clearForm', 'true');
      yield call(history.replace, {
        pathname: '/fleet/vehicle/new',
        search: `?${searchParams.toString()}`,
      });
    }
  }
  catch (error) {
    yield put(Creators.createVehicleRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateVehicleRequest() {
  yield takeLatest(Types.CREATE_VEHICLE_REQUEST, vehicleRequest);
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

export default function* createVehicleRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateVehicleRequest),
      fork(watchVehicleTypeRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
