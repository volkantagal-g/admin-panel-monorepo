import { get } from 'lodash';
import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { uploadToS3SignedUrl } from '@shared/api/public';
import { t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

import { Creators, Types } from '@app/pages/Planogram/Warehouses/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { getSignedPlanogramWarehousesImportUrl } from '@shared/api/planogramWarehouse';

import {
  getDemographies,
  getMainWarehousesAndCities,
  getPlanogramWarehouseDetails,
  getSizes,
  getWarehouseTypes,
  importPlanogramWarehouse,
  listPlanogramWarehouses,
  updatePlanogramWarehouse,
  exportPlanogramWarehouses,
} from '@shared/api/planogram';

function* exportPlanogramWarehouseRequest() {
  try {
    yield call(exportPlanogramWarehouses);
    yield put(
      ToastCreators.success({
        message: t('global:FILE_WILL_BE_SENT'),
        toastOptions: { autoClose: 3000 },
      }),
    );
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}
function* watchExportPlanogramWarehouseRequest() {
  yield takeLatest(
    Types.EXPORT_PLANOGRAM_WAREHOUSE_REQUEST,
    exportPlanogramWarehouseRequest,
  );
}

function* importPlanogramWarehousesRequest({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(
      getSignedPlanogramWarehousesImportUrl,
    );
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    yield call(importPlanogramWarehouse, { fileName });
    yield put(
      ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED') }),
    );
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}
function* watchImportPlanogramWarehousesRequest() {
  yield takeLatest(
    Types.IMPORT_PLANOGRAM_WAREHOUSES_REQUEST,
    importPlanogramWarehousesRequest,
  );
}
function* getSizesRequest() {
  try {
    const { data } = yield call(getSizes);
    yield put(Creators.getSizesSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getSizesFailure({ error }));
  }
}
function* watchGetSizesRequest() {
  yield takeLatest(Types.GET_SIZES_REQUEST, getSizesRequest);
}

function* getDemographiesRequest() {
  try {
    const { data } = yield call(getDemographies);
    yield put(Creators.getDemographiesSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getDemographiesFailure({ error }));
  }
}
function* watchGetDemographiesRequest() {
  yield takeLatest(Types.GET_DEMOGRAPHIES_REQUEST, getDemographiesRequest);
}

function* getWarehouseTypesRequest() {
  try {
    const { data } = yield call(getWarehouseTypes);
    yield put(Creators.getWarehouseTypesSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getWarehouseTypesFailure({ error }));
  }
}
function* watchGetWarehouseTypesRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_TYPES_REQUEST, getWarehouseTypesRequest);
}

function* getMainWarehousesAndCitiesRequest() {
  try {
    const { data } = yield call(getMainWarehousesAndCities);
    yield put(Creators.getMainWarehousesAndCitiesSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getMainWarehousesAndCitiesFailure({ error }));
  }
}
function* watchGetMainWarehousesAndCitiesRequest() {
  yield takeLatest(Types.GET_MAIN_WAREHOUSES_AND_CITIES_REQUEST, getMainWarehousesAndCitiesRequest);
}

function* listPlanogramWarehousesRequest({ body }) {
  try {
    const data = yield call(listPlanogramWarehouses, { body });
    yield put(Creators.listPlanogramWarehousesSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.listPlanogramWarehousesFailure({ error }));
  }
}
function* watchListPlanogramWarehousesRequest() {
  yield takeLatest(
    Types.LIST_PLANOGRAM_WAREHOUSES_REQUEST,
    listPlanogramWarehousesRequest,
  );
}

function* getPlanogramWarehouseDetailsRequest({ body }) {
  try {
    const { data } = yield call(getPlanogramWarehouseDetails, { body });
    yield put(Creators.getPlanogramWarehouseDetailsSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getPlanogramWarehouseDetailsFailure({ error }));
  }
}
function* watchGetPlanogramWarehouseDetailsRequest() {
  yield takeLatest(
    Types.GET_PLANOGRAM_WAREHOUSE_DETAILS_REQUEST,
    getPlanogramWarehouseDetailsRequest,
  );
}

function* listPlanogramWarehousesInitialRequest() {
  try {
    const data = yield call(listPlanogramWarehouses, {});
    yield put(Creators.listPlanogramWarehousesInitialSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.listPlanogramWarehousesInitialFailure({ error }));
  }
}
function* watchListPlanogramWarehousesInitialRequest() {
  yield takeLatest(
    Types.LIST_PLANOGRAM_WAREHOUSES_INITIAL_REQUEST,
    listPlanogramWarehousesInitialRequest,
  );
}

function* updatePlanogramWarehouseRequest({ warehouseId, body }) {
  try {
    const data = yield call(updatePlanogramWarehouse, { warehouseId, body });
    yield put(Creators.updatePlanogramWarehouseSuccess({ data }));
    yield put(ToastCreators.success());
    yield put(
      Creators.getPlanogramWarehouseDetailsRequest({ body: { warehouseId, pagination: { page: 1, pageSize: 10 } } }),
    );
    const id = data?.warehouse;
    const path = ROUTE.PLANOGRAM_WAREHOUSES_DETAIL.path.replace(':id', id);
    history.push(path);
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.updatePlanogramWarehouseFailure({ error }));
  }
}
function* watchUpdatePlanogramWarehouseRequest() {
  yield takeLatest(
    Types.UPDATE_PLANOGRAM_WAREHOUSE_REQUEST,
    updatePlanogramWarehouseRequest,
  );
}

export default function* plangoramWarehousesListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchExportPlanogramWarehouseRequest),
      fork(watchImportPlanogramWarehousesRequest),
      fork(watchGetSizesRequest),
      fork(watchGetDemographiesRequest),
      fork(watchGetWarehouseTypesRequest),
      fork(watchGetMainWarehousesAndCitiesRequest),
      fork(watchListPlanogramWarehousesRequest),
      fork(watchGetPlanogramWarehouseDetailsRequest),
      fork(watchListPlanogramWarehousesInitialRequest),
      fork(watchUpdatePlanogramWarehouseRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
