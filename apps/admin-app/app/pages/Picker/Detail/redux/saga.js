import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  getPickerDetail as getPickerDetailApi,
  releasePickerFromWarehouseApi,
  updateWarehouseApi,
  activatePickerApi,
  releasePickerJobApi,
  deactivatePickerApi,
  updatePickerApi,
  getPickerJobApi,
} from '@shared/api/picker';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getPickerDetail({ id, fields }) {
  try {
    const { picker } = yield call(getPickerDetailApi, { id, fields });
    yield put(Creators.getPickerDetailSuccess({ data: picker }));
  }
  catch (error) {
    yield put(Creators.getPickerDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPickerDetailRequest() {
  yield takeLatest(Types.GET_PICKER_DETAIL_REQUEST, getPickerDetail);
}

function* updatePicker({ id, updateData }) {
  try {
    const data = yield call(updatePickerApi, { id, updateData });
    yield put(Creators.updatePickerSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updatePickerFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchupdatePickerRequest() {
  yield takeLatest(Types.UPDATE_PICKER_REQUEST, updatePicker);
}
function* releasePickerFromWarehouse({ id, updateData }) {
  try {
    const data = yield call(releasePickerFromWarehouseApi, { id, updateData });
    yield put(Creators.releasePickerFromWarehouseSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.releasePickerFromWarehouseFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchreleasePickerFromWarehouseRequest() {
  yield takeLatest(
    Types.RELEASE_PICKER_FROM_WAREHOUSE_REQUEST,
    releasePickerFromWarehouse,
  );
}
function* updateWarehouse({ id, updateData }) {
  try {
    const data = yield call(updateWarehouseApi, { id, updateData });
    yield put(Creators.updateWarehouseSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateWarehouseFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchupdateWarehouseRequest() {
  yield takeLatest(Types.UPDATE_WAREHOUSE_REQUEST, updateWarehouse);
}
function* getPickerJob({ id }) {
  try {
    const pickerJob = yield call(getPickerJobApi, { id });
    yield put(Creators.getPickerJobSuccess({ data: pickerJob }));
  }
  catch (error) {
    yield put(Creators.getPickerJobFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchgetPickerJobRequest() {
  yield takeLatest(Types.GET_PICKER_JOB_REQUEST, getPickerJob);
}
function* activatePicker({ id, updateData }) {
  try {
    const data = yield call(activatePickerApi, { id, updateData });
    yield put(Creators.activatePickerSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.activatePickerFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchactivatePickerRequest() {
  yield takeLatest(Types.ACTIVATE_PICKER_REQUEST, activatePicker);
}

function* deactivatePicker({ id, updateData }) {
  try {
    const data = yield call(deactivatePickerApi, { id, updateData });
    yield put(Creators.deactivatePickerSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deactivatePickerFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchdeactivatePickerRequest() {
  yield takeLatest(Types.DEACTIVATE_PICKER_REQUEST, deactivatePicker);
}

function* releasePickerJob({ id }) {
  try {
    const data = yield call(releasePickerJobApi, { id });
    yield put(Creators.releasePickerJobSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.releasePickerJobFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchreleasePickerJobRequest() {
  yield takeLatest(Types.RELEASE_PICKER_JOB_REQUEST, releasePickerJob);
}

export default function* pickerDetailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPickerDetailRequest),
      fork(watchupdatePickerRequest),
      fork(watchreleasePickerFromWarehouseRequest),
      fork(watchupdateWarehouseRequest),
      fork(watchactivatePickerRequest),
      fork(watchreleasePickerJobRequest),
      fork(watchdeactivatePickerRequest),
      fork(watchgetPickerJobRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
