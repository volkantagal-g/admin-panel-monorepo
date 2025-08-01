import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getMarketProducts,
  importMarketProductDomainLimits,
  getSignedMarketProductDomainLimitsImportUrl,
  exportMarketProductDomainLimits,
  importMarketProductDetails,
  getSignedMarketProductDetailsImportUrl,
  exportMarketProductDetails,
  importMarketProductAdditionalTables,
  getSignedMarketProductAdditionalTablesImportUrl,
  exportMarketProductAdditionalTables,
  getSignedMarketProductCategoryPositionsImportUrl,
  importMarketProductCategoryPositions,
  exportMarketProductCategoryPositions,
  exportMarketProductSupplyAndLogistic,
  importMarketProductSupplyAndLogistic,
  getSignedMarketProductSupplyAndLogisticImportUrl,
  getSignedMarketProductTogglesImportUrl,
  importMarketProductToggles,
} from '@shared/api/marketProduct';
import {
  importMarketProductPricingMetadata,
  getSignedPricingsImportUrl,
  exportMarketProductPricingMetadata,
} from '@shared/api/marketProductPrice';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { exportMarketProductsToExcel } from '@app/pages/MarketProduct/ListV2/components/MarketProductListTable/config';
import { uploadToS3SignedUrl } from '@shared/api/public';
import { t } from '@shared/i18n';
import { PROJECT_FIELDS_FOR_TABLE, PROJECT_FIELDS_FOR_EXPORT_MARKET_PRODUCTS } from '../constants';

const TOAST_AUTO_CLOSE_IN_MS = 3000;

export function* getMarketProductsRequest({ limit, offset, queryText, statusList, filterOptions, ids }) {
  try {
    const data = yield call(getMarketProducts, {
      statusList,
      hasTotalCount: true,
      fields: PROJECT_FIELDS_FOR_TABLE,
      limit,
      offset,
      queryText,
      filterOptions,
      ids,
    });
    yield put(Creators.getMarketProductsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportActiveMarketProductsRequest({ t: marketProductPageT }) {
  try {
    const data = yield call(getMarketProducts, {
      isActive: true,
      fields: PROJECT_FIELDS_FOR_EXPORT_MARKET_PRODUCTS,
      // populate: POPULATE_FIELDS_FOR_EXPORT_MARKET_PRODUCTS,
    });
    exportMarketProductsToExcel(data, marketProductPageT);
    yield put(Creators.exportActiveMarketProductsSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportActiveMarketProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importMarketProductDomainLimitsRequest({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(getSignedMarketProductDomainLimitsImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    const data = yield call(importMarketProductDomainLimits, { fileName });
    yield put(Creators.importMarketProductDomainLimitsSuccess({ data }));
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.importMarketProductDomainLimitsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportMarketProductDomainLimitsRequest() {
  try {
    const data = yield call(exportMarketProductDomainLimits);
    yield put(Creators.exportMarketProductDomainLimitsSuccess({ data }));
    yield put(ToastCreators.success({ message: t('global:FILE_WILL_BE_SENT'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.exportMarketProductDomainLimitsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importMarketProductDetailsRequest({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(getSignedMarketProductDetailsImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    const data = yield call(importMarketProductDetails, { fileName });
    yield put(Creators.importMarketProductDetailsSuccess({ data }));
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.importMarketProductDetailsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportMarketProductDetailsRequest() {
  try {
    const data = yield call(exportMarketProductDetails);
    yield put(Creators.exportMarketProductDetailsSuccess({ data }));
    yield put(ToastCreators.success({ message: t('global:FILE_WILL_BE_SENT'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.exportMarketProductDetailsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importMarketProductAdditionalTablesRequest({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(getSignedMarketProductAdditionalTablesImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    const data = yield call(importMarketProductAdditionalTables, { fileName });
    yield put(Creators.importMarketProductAdditionalTablesSuccess({ data }));
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.importMarketProductAdditionalTablesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportMarketProductAdditionalTablesRequest() {
  try {
    const data = yield call(exportMarketProductAdditionalTables);
    yield put(Creators.exportMarketProductAdditionalTablesSuccess({ data }));
    yield put(ToastCreators.success({ message: t('global:FILE_WILL_BE_SENT'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.exportMarketProductAdditionalTablesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importMarketProductCategoryPositionsRequest({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(getSignedMarketProductCategoryPositionsImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    const data = yield call(importMarketProductCategoryPositions, { fileName });
    yield put(Creators.importMarketProductCategoryPositionsSuccess({ data }));
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.importMarketProductCategoryPositionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportMarketProductCategoryPositionsRequest() {
  try {
    const data = yield call(exportMarketProductCategoryPositions);
    yield put(Creators.exportMarketProductCategoryPositionsSuccess({ data }));
    yield put(ToastCreators.success({ message: t('global:FILE_WILL_BE_SENT'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.exportMarketProductCategoryPositionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportMarketProductSupplyAndLogisticRequest() {
  try {
    const data = yield call(exportMarketProductSupplyAndLogistic);
    yield put(Creators.exportMarketProductSupplyAndLogisticSuccess({ data }));
    yield put(ToastCreators.success({ message: t('global:FILE_WILL_BE_SENT'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.exportMarketProductSupplyAndLogisticFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportMarketProductPricingMetadataRequest() {
  try {
    const data = yield call(exportMarketProductPricingMetadata);
    yield put(Creators.exportMarketProductPricingMetadataSuccess({ data }));
    yield put(ToastCreators.success({ message: t('global:FILE_WILL_BE_SENT'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.exportMarketProductPricingMetadataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importMarketProductSupplyAndLogisticRequest({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(getSignedMarketProductSupplyAndLogisticImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    const data = yield call(importMarketProductSupplyAndLogistic, { fileName });
    yield put(Creators.importMarketProductSupplyAndLogisticSuccess({ data }));
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.importMarketProductSupplyAndLogisticFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importMarketProductPricingMetadataRequest({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(getSignedPricingsImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    const data = yield call(importMarketProductPricingMetadata, { fileName });
    yield put(Creators.importMarketProductPricingMetadataSuccess({ data }));
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.importMarketProductPricingMetadataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importMarketProductTogglesRequest({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(getSignedMarketProductTogglesImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    const data = yield call(importMarketProductToggles, { fileName });
    yield put(Creators.importMarketProductTogglesSuccess({ data }));
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED'), toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS } }));
  }
  catch (error) {
    yield put(Creators.importMarketProductTogglesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetMarketProductsRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCTS_REQUEST, getMarketProductsRequest);
}

function* watchExportActiveMarketProductsRequest() {
  yield takeLatest(Types.EXPORT_ACTIVE_MARKET_PRODUCTS_REQUEST, exportActiveMarketProductsRequest);
}

function* watchImportMarketProductDomainLimitsRequest() {
  yield takeLatest(Types.IMPORT_MARKET_PRODUCT_DOMAIN_LIMITS_REQUEST, importMarketProductDomainLimitsRequest);
}

function* watchExportMarketProductDomainLimitsRequest() {
  yield takeLatest(Types.EXPORT_MARKET_PRODUCT_DOMAIN_LIMITS_REQUEST, exportMarketProductDomainLimitsRequest);
}

function* watchImportMarketProductDetailsRequest() {
  yield takeLatest(Types.IMPORT_MARKET_PRODUCT_DETAILS_REQUEST, importMarketProductDetailsRequest);
}

function* watchExportMarketProductDetailsRequest() {
  yield takeLatest(Types.EXPORT_MARKET_PRODUCT_DETAILS_REQUEST, exportMarketProductDetailsRequest);
}

function* watchImportMarketProductAdditionalTablesRequest() {
  yield takeLatest(Types.IMPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_REQUEST, importMarketProductAdditionalTablesRequest);
}

function* watchExportMarketProductAdditionalTablesRequest() {
  yield takeLatest(Types.EXPORT_MARKET_PRODUCT_ADDITIONAL_TABLES_REQUEST, exportMarketProductAdditionalTablesRequest);
}

function* watchImportMarketProductCategoryPositionsRequest() {
  yield takeLatest(Types.IMPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_REQUEST, importMarketProductCategoryPositionsRequest);
}

function* watchExportMarketProductCategoryPositionsRequest() {
  yield takeLatest(Types.EXPORT_MARKET_PRODUCT_CATEGORY_POSITIONS_REQUEST, exportMarketProductCategoryPositionsRequest);
}

function* watchExportMarketProductSupplyAndLogisticRequest() {
  yield takeLatest(Types.EXPORT_MARKET_PRODUCT_SUPPLY_AND_LOGISTIC_REQUEST, exportMarketProductSupplyAndLogisticRequest);
}

function* watchExportMarketProductPricingMetadataRequest() {
  yield takeLatest(Types.EXPORT_MARKET_PRODUCT_PRICING_METADATA_REQUEST, exportMarketProductPricingMetadataRequest);
}

function* watchImportMarketProductSupplyAndLogisticRequest() {
  yield takeLatest(Types.IMPORT_MARKET_PRODUCT_SUPPLY_AND_LOGISTIC_REQUEST, importMarketProductSupplyAndLogisticRequest);
}

function* watchImportMarketProductPricingMetadataRequest() {
  yield takeLatest(Types.IMPORT_MARKET_PRODUCT_PRICING_METADATA_REQUEST, importMarketProductPricingMetadataRequest);
}

function* watchImportMarketProductTogglesRequest() {
  yield takeLatest(Types.IMPORT_MARKET_PRODUCT_TOGGLES_REQUEST, importMarketProductTogglesRequest);
}
export default function* marketProductListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductsRequest),
      fork(watchExportActiveMarketProductsRequest),
      fork(watchImportMarketProductDomainLimitsRequest),
      fork(watchExportMarketProductDomainLimitsRequest),
      fork(watchImportMarketProductDetailsRequest),
      fork(watchExportMarketProductDetailsRequest),
      fork(watchImportMarketProductAdditionalTablesRequest),
      fork(watchExportMarketProductAdditionalTablesRequest),
      fork(watchImportMarketProductCategoryPositionsRequest),
      fork(watchExportMarketProductCategoryPositionsRequest),
      fork(watchImportMarketProductSupplyAndLogisticRequest),
      fork(watchImportMarketProductPricingMetadataRequest),
      fork(watchExportMarketProductSupplyAndLogisticRequest),
      fork(watchExportMarketProductPricingMetadataRequest),
      fork(watchImportMarketProductTogglesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
