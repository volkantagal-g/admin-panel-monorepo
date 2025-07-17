import { isFunction } from 'lodash';
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators, Types } from './actions';
import {
  getEquipmentInformation,
  updateEquipmentInformationRecord,
  createEquipmentInformationRecord,
} from '@shared/api/employeeAssetManagement/vehicleTabRequests.ts';
import { ActionWithType } from '@shared/containers/AssetManagementModules/types';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* filterEquipmentInformationRequest(
  { assetIds } : ActionWithType<{ assetIds: MongoIDType[] }>,
): Generator {
  try {
    const vehicleEquipmentsData = (yield call(getEquipmentInformation, { assetIds })) as VehicleEquipmentInformation[];
    // every vehicle has only one equipment data
    yield put(Creators.filterEquipmentInformationSuccess({ data: vehicleEquipmentsData?.[0] }));
  }
  catch (error) {
    yield put(Creators.filterEquipmentInformationFailure(error));
  }
}

export function* watchFilterEquipmentInformationRequest(): Generator {
  yield takeLatest(Types.FILTER_EQUIPMENT_INFORMATION_REQUEST, filterEquipmentInformationRequest);
}

export function* editEquipmentInformationRequest(
  { equipmentInformationId, updateData, onSuccess }
  : ActionWithType<{ equipmentInformationId: MongoIDType, updateData: VehicleEquipmentInformation, onSuccess: () => void }>,
): Generator {
  try {
    yield call(updateEquipmentInformationRecord, { equipmentInformationId, updateData });
    yield put(Creators.editEquipmentInformationSuccess());
    yield put(ToastCreators.success());
    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.editEquipmentInformationFailure(error));
  }
}

export function* watchEditEquipmentInformationRequest(): Generator {
  yield takeLatest(Types.EDIT_EQUIPMENT_INFORMATION_REQUEST, editEquipmentInformationRequest);
}

export function* createEquipmentInformationRequest(
  { assetId, data, onSuccess }
  : ActionWithType<{ assetId: MongoIDType, data: VehicleEquipmentInformation, onSuccess: () => void }>,
): Generator {
  try {
    yield call(createEquipmentInformationRecord, { assetId, data });
    yield put(Creators.createEquipmentInformationSuccess());
    yield put(ToastCreators.success());
    if (isFunction(onSuccess)) {
      onSuccess();
    }
  }
  catch (error) {
    yield put(Creators.createEquipmentInformationFailure(error));
  }
}

export function* watchCreateEquipmentInformationRequest(): Generator {
  yield takeLatest(Types.CREATE_EQUIPMENT_INFORMATION_REQUEST, createEquipmentInformationRequest);
}

export default function* equipmentInformationRootSaga(): Generator {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchFilterEquipmentInformationRequest),
      fork(watchEditEquipmentInformationRequest),
      fork(watchCreateEquipmentInformationRequest),
    ]);

    yield (take(Types.DESTROY_CONTAINER));

    // @ts-ignore
    yield all(backgroundTasks.map(task => task.cancel()));
  }
}
