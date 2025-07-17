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

import { Creators, Types } from '@app/pages/Planogram/Products/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { getSignedPlanogramProductsImportUrl } from '@shared/api/planogramProduct';

import {
  exportPlanogramProducts,
  filterPlanogramWarehouse,
  getDemographies,
  getMainWarehousesAndCities,
  getPlanogramProductDetails,
  getSizes,
  getWarehouseTypes,
  importPlanogramProducts,
  listPlanogramProduct,
  updatePlanogramProduct,
} from '@shared/api/planogram';

function* importPlanogramProductsRequest({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(
      getSignedPlanogramProductsImportUrl,
    );
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    yield call(importPlanogramProducts, { fileName });
    yield put(
      ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED') }),
    );
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}
function* watchImportPlanogramProductsRequest() {
  yield takeLatest(
    Types.IMPORT_PLANOGRAM_PRODUCTS_REQUEST,
    importPlanogramProductsRequest,
  );
}

function* exportPlanogramProductRequest() {
  try {
    yield call(exportPlanogramProducts);
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
function* watchExportPlanogramProductRequest() {
  yield takeLatest(
    Types.EXPORT_PLANOGRAM_PRODUCT_REQUEST,
    exportPlanogramProductRequest,
  );
}

function* getPlanogramProductListRequest({ body }) {
  try {
    const data = yield call(listPlanogramProduct, { body });
    yield put(Creators.getPlanogramProductListSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getPlanogramProductListFailure({ error }));
  }
}
function* watchGetPlanogramProductListRequest() {
  yield takeLatest(
    Types.GET_PLANOGRAM_PRODUCT_LIST_REQUEST,
    getPlanogramProductListRequest,
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

function* getPlanogramProductDetailsRequest({ id }) {
  try {
    const { data } = yield call(getPlanogramProductDetails, { id });
    yield put(Creators.getPlanogramProductDetailsSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.getPlanogramProductDetailsFailure({ error }));
  }
}
function* watchGetPlanogramProductDetailsRequest() {
  yield takeLatest(Types.GET_PLANOGRAM_PRODUCT_DETAILS_REQUEST, getPlanogramProductDetailsRequest);
}

function* filterPlanogramWarehouseRequest({ body }) {
  try {
    const { data } = yield call(filterPlanogramWarehouse, { body });
    yield put(Creators.filterPlanogramWarehouseSuccess({ data }));
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.filterPlanogramWarehouseFailure({ error }));
  }
}
function* watchFilterPlanogramWarehouseRequest() {
  yield takeLatest(Types.FILTER_PLANOGRAM_WAREHOUSE_REQUEST, filterPlanogramWarehouseRequest);
}

function* updatePlanogramProductRequest({ productId, body }) {
  try {
    const data = yield call(updatePlanogramProduct, { productId, body });
    yield put(Creators.updatePlanogramProductSuccess({ data }));
    yield put(ToastCreators.success());
    yield put(Creators.getPlanogramProductDetailsRequest({ id: productId }));
    const id = data?.productId;
    const path = ROUTE.PLANOGRAM_PRODUCT_DETAIL.path.replace(':id', id);
    history.push(path);
  }
  catch (error) {
    const errorMessage = get(
      error,
      'response.data.details.message',
      error.response.data?.message,
    );
    yield put(ToastCreators.error({ message: errorMessage }));
    yield put(Creators.updatePlanogramProductFailure({ error }));
  }
}
function* watchUpdatePlanogramProductRequest() {
  yield takeLatest(
    Types.UPDATE_PLANOGRAM_PRODUCT_REQUEST,
    updatePlanogramProductRequest,
  );
}

export default function* plangoramProductsListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchImportPlanogramProductsRequest),
      fork(watchExportPlanogramProductRequest),
      fork(watchGetPlanogramProductListRequest),
      fork(watchGetSizesRequest),
      fork(watchGetDemographiesRequest),
      fork(watchGetWarehouseTypesRequest),
      fork(watchGetMainWarehousesAndCitiesRequest),
      fork(watchGetPlanogramProductDetailsRequest),
      fork(watchFilterPlanogramWarehouseRequest),
      fork(watchUpdatePlanogramProductRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
