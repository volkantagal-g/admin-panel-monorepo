import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import {
  getSupplierById,
  mapSupplierProducts,
  mapSupplierWarehouses,
  getSupplierProductMappings,
  updateSupplier,
  updateSupplierCustomSettings,
  createSupplierAccount,
  updateDCBonusForLogoAccount,
  updateSupplierProductMappingBarcodeAndCode,
} from '@shared/api/supplier';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getSupplierByIdRequest({ id }) {
  try {
    const data = yield call(getSupplierById, { id });
    yield put(Creators.getSupplierByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSupplierByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* mapSupplierProductsRequest({ id }) {
  try {
    const data = yield call(mapSupplierProducts, { id });
    yield put(Creators.mapSupplierProductsSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.mapSupplierProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* mapSupplierWarehousesRequest() {
  try {
    const data = yield call(mapSupplierWarehouses);
    yield put(Creators.mapSupplierWarehousesSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.mapSupplierWarehousesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getSupplierProductMappingsRequest({ id }) {
  try {
    const data = yield call(getSupplierProductMappings, { id });
    yield put(Creators.getSupplierProductMappingsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSupplierProductMappingsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateSupplierRequest({ id, updateData }) {
  try {
    const data = yield call(updateSupplier, { id, updateData });
    yield put(Creators.updateSupplierSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateSupplierFailure({ error }));
    if (
      error?.response?.data?.data &&
      error?.response?.data?.message
    ) {
      error.response.data.message = `${error.response.data.message} ${
        JSON.stringify(error.response.data.data)}`;
    }
    yield put(ToastCreators.error({ error }));
  }
}

function* updateSupplierCustomSettingsRequest({ id, updateData }) {
  try {
    const data = yield call(updateSupplierCustomSettings, { id, updateData });
    yield put(Creators.updateSupplierCustomSettingsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateSupplierCustomSettingsFailure({ error }));
    if (
      error?.response?.data?.data &&
      error?.response?.data?.message
    ) {
      error.response.data.message = `${error.response.data.message} ${
        JSON.stringify(error.response.data.data)}`;
    }
    yield put(ToastCreators.error({ error }));
  }
}

function* createSupplierAccountRequest({ body }) {
  try {
    const data = yield call(createSupplierAccount, { body });
    yield put(Creators.createSupplierAccountSuccess({ data }));
    yield put(Creators.getSupplierByIdRequest({ id: data._id }));
  }
  catch (error) {
    yield put(Creators.createSupplierAccountFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateDCBonusForLogoAccountRequest({ id, updateData }) {
  try {
    const data = yield call(updateDCBonusForLogoAccount, { id, updateData });
    yield put(Creators.updateDCBonusForLogoAccountSuccess({ data }));
    yield put(Creators.getSupplierByIdRequest({ id }));
  }
  catch (error) {
    yield put(Creators.updateDCBonusForLogoAccountFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateSupplierProductMappingBarcodeAndCodeRequest({ id, updateData }) {
  try {
    const data = yield call(updateSupplierProductMappingBarcodeAndCode, { id, updateData });
    yield put(Creators.updateSupplierProductMappingBarcodeAndCodeSuccess({ data }));
    yield put(Creators.getSupplierProductMappingsRequest({ id: data.supplier }));
  }
  catch (error) {
    yield put(Creators.updateSupplierProductMappingBarcodeAndCodeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* activateSupplierRequest({ id }) {
  try {
    const data = yield call(updateSupplier, { id, updateData: { isActive: true } });
    yield put(Creators.updateSupplierSuccess({ data }));
    yield put(Creators.activateSupplierSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.activateSupplierFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* deactivateSupplierRequest({ id }) {
  try {
    const data = yield call(updateSupplier, { id, updateData: { isActive: false } });
    yield put(Creators.updateSupplierSuccess({ data }));
    yield put(Creators.deactivateSupplierSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deactivateSupplierFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetSupplierByIdRequest() {
  yield takeLatest(Types.GET_SUPPLIER_BY_ID_REQUEST, getSupplierByIdRequest);
}

function* watchMapSupplierProductsRequest() {
  yield takeLatest(Types.MAP_SUPPLIER_PRODUCTS_REQUEST, mapSupplierProductsRequest);
}

function* watchMapSupplierWarehousesRequest() {
  yield takeLatest(Types.MAP_SUPPLIER_WAREHOUSES_REQUEST, mapSupplierWarehousesRequest);
}

function* watchGetSupplierProductMappingsRequest() {
  yield takeLatest(Types.GET_SUPPLIER_PRODUCT_MAPPINGS_REQUEST, getSupplierProductMappingsRequest);
}

function* watchUpdateSupplierRequest() {
  yield takeLatest(Types.UPDATE_SUPPLIER_REQUEST, updateSupplierRequest);
}

function* watchUpdateSupplierCustomSettingsRequest() {
  yield takeLatest(Types.UPDATE_SUPPLIER_CUSTOM_SETTINGS_REQUEST, updateSupplierCustomSettingsRequest);
}

function* watchCreateSupplierAccountRequest() {
  yield takeLatest(Types.CREATE_SUPPLIER_ACCOUNT_REQUEST, createSupplierAccountRequest);
}

function* watchUpdateDCBonusForLogoAccountRequest() {
  yield takeLatest(Types.UPDATE_DC_BONUS_FOR_LOGO_ACCOUNT_REQUEST, updateDCBonusForLogoAccountRequest);
}

function* watchUpdateSupplierProductMappingBarcodeAndCodeRequest() {
  yield takeLatest(Types.UPDATE_SUPPLIER_PRODUCT_MAPPING_BARCODE_AND_CODE_REQUEST, updateSupplierProductMappingBarcodeAndCodeRequest);
}

function* watchActivateSupplierRequest() {
  yield takeLatest(Types.ACTIVATE_SUPPLIER_REQUEST, activateSupplierRequest);
}

function* watchDeactivateSupplierRequest() {
  yield takeLatest(Types.DEACTIVATE_SUPPLIER_REQUEST, deactivateSupplierRequest);
}

export default function* supplierDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSupplierByIdRequest),
      fork(watchMapSupplierProductsRequest),
      fork(watchMapSupplierWarehousesRequest),
      fork(watchGetSupplierProductMappingsRequest),
      fork(watchUpdateSupplierRequest),
      fork(watchUpdateSupplierCustomSettingsRequest),
      fork(watchCreateSupplierAccountRequest),
      fork(watchUpdateDCBonusForLogoAccountRequest),
      fork(watchUpdateSupplierProductMappingBarcodeAndCodeRequest),
      fork(watchActivateSupplierRequest),
      fork(watchDeactivateSupplierRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
