import { all, cancel, take, call, put, takeLatest, fork } from 'redux-saga/effects';
import { uniq } from 'lodash';

import {
  deleteDiscountedPrice,
  deletePrice,
  exportDiscountedPricings,
  exportPricings,
  getMarketProductDiscountedPriceDetail,
  getMarketProductPriceDetail,
  getMarketProductsPriceList,
  getSignedPricingsImportUrl,
  importPricings,
  updateMarketProductDiscounted,
  updateMarketProductPrice,
  importMarketProductBuyingPrices,
  exportMarketProductSupplierBuyingPrices,
} from '@shared/api/marketProductPrice';
import { Creators, Types } from './actions';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getMarketProducts } from '@shared/api/marketProduct';
import { handleErrorMessages } from '@app/pages/MarketProduct/Pricing/utils';
import { t } from '@shared/i18n';
import { uploadToS3SignedUrl } from '@shared/api/public';
import { PRICE_OPTION } from '@app/pages/MarketProduct/Pricing/constants';
import history from '@shared/utils/history';

function* getMarketProductsPriceListRequest({ limit, offset, productIds, domainTypes, warehouseIds, startDate, endDate, pricingTypes, priceOption }) {
  try {
    const modifiedLimit = priceOption === PRICE_OPTION.DISCOUNTED_AND_PRICE ? limit : 10;
    const data = yield call(
      getMarketProductsPriceList,
      { limit: modifiedLimit, offset, productIds, domainTypes, warehouseIds, startDate, endDate, pricingTypes, priceOption },
    );
    const products = uniq(data?.data?.map(price => price?.productId));
    yield put(CommonCreators.getMarketProductsRequest({ ids: products, populate: [], fields: ['_id', 'name'] }));
    yield put(Creators.getMarketProductsPriceListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductsPriceListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchGetMarketProductsPriceListRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCTS_PRICE_LIST_REQUEST, getMarketProductsPriceListRequest);
}

function* getActiveMarketProductsRequest({ limit, offset, queryText, filterOptions, fields, ids }) {
  try {
    const data = yield call(getMarketProducts, { isActive: true, limit, offset, queryText, filterOptions, fields, ids });
    yield put(Creators.getActiveMarketProductsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getActiveMarketProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
export function* watchGetActiveMarketProductsRequest() {
  yield takeLatest(Types.GET_ACTIVE_MARKET_PRODUCTS_REQUEST, getActiveMarketProductsRequest);
}
function* updateMarketProductPriceRequest({ body, page }) {
  try {
    const data = yield call(updateMarketProductPrice, { body });
    yield put(Creators.getMarketProductPriceDetailRequest({ id: body?.priceId }));
    yield put(Creators.updateMarketProductPriceSuccess({ data }));
    yield put(ToastCreators.success());
    if (page) {
      history.push(page);
    }
  }
  catch (error) {
    yield put(Creators.updateMarketProductPriceFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchUpdateMarketProductPriceRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_PRICE_REQUEST, updateMarketProductPriceRequest);
}
function* updateMarketProductDiscountedPriceRequest({ body, page }) {
  try {
    const data = yield call(updateMarketProductDiscounted, { body });
    yield put(Creators.getMarketProductDiscountedPriceDetailRequest({ discountedPriceId: body?.discountedPriceId }));
    yield put(Creators.updateMarketProductDiscountedPriceSuccess({ data }));
    yield put(ToastCreators.success());
    if (page) {
      history.push(page);
    }
  }
  catch (error) {
    yield put(Creators.updateMarketProductDiscountedPriceFailure({ error }));
    const errorMessage = handleErrorMessages(error);
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}
function* watchUpdateMarketProductDiscountedPriceRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_DISCOUNTED_PRICE_REQUEST, updateMarketProductDiscountedPriceRequest);
}
function* getMarketProductPriceDetailRequest({ id }) {
  try {
    const data = yield call(
      getMarketProductPriceDetail,
      { id: Number(id) },
    );
    yield put(Creators.getMarketProductPriceDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductPriceDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchGetMarketProductPriceDetailRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_PRICE_DETAIL_REQUEST, getMarketProductPriceDetailRequest);
}
function* getMarketProductDiscountedPriceDetailRequest({ discountedPriceId }) {
  try {
    const data = yield call(
      getMarketProductDiscountedPriceDetail,
      { discountedPriceId: Number(discountedPriceId) },
    );
    yield put(Creators.getMarketProductDiscountedPriceDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductDiscountedPriceDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchGetMarketProductDiscountedPriceDetailRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_DISCOUNTED_PRICE_DETAIL_REQUEST, getMarketProductDiscountedPriceDetailRequest);
}

function* deletePriceRequest({ priceId, formValues }) {
  try {
    const data = yield call(deletePrice, { priceId });
    yield put(Creators.getMarketProductsPriceListRequest(formValues));
    yield put(Creators.deletePriceSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deletePriceFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchDeletePriceRequest() {
  yield takeLatest(Types.DELETE_PRICE_REQUEST, deletePriceRequest);
}

function* deleteDiscountedPriceRequest({ discountedPriceId, formValues }) {
  try {
    const data = yield call(deleteDiscountedPrice, { discountedPriceId });
    yield put(Creators.getMarketProductsPriceListRequest(formValues));
    yield put(Creators.deleteDiscountedPriceSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteDiscountedPriceFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchDeleteDiscountedPriceRequest() {
  yield takeLatest(Types.DELETE_DISCOUNTED_PRICE_REQUEST, deleteDiscountedPriceRequest);
}
function* exportPricingsRequest() {
  try {
    yield put(ToastCreators.pending());
    yield call(exportPricings);
    yield put(ToastCreators.success({ message: t('global:FILE_WILL_BE_SENT'), toastOptions: { autoClose: 3000 } }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportPricingsRequest() {
  yield takeLatest(Types.EXPORT_PRICINGS_REQUEST, exportPricingsRequest);
}

function* exportDiscountedPricingsRequest() {
  try {
    yield put(ToastCreators.pending());
    yield call(exportDiscountedPricings);
    yield put(ToastCreators.success({ message: t('global:FILE_WILL_BE_SENT'), toastOptions: { autoClose: 3000 } }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportDiscountedPricingsRequest() {
  yield takeLatest(Types.EXPORT_DISCOUNTED_PRICINGS_REQUEST, exportDiscountedPricingsRequest);
}

function* importPricingsRequest({ loadedFile, priceType }) {
  try {
    yield put(ToastCreators.pending({ toastOptions: { autoClose: 4000 } }));
    const { signedUrl, fileName } = yield call(getSignedPricingsImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    yield call(importPricings, { fileName, priceType });
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED') }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchImportPricingsRequest() {
  yield takeLatest(Types.IMPORT_PRICINGS_REQUEST, importPricingsRequest);
}

function* importMarketProductBuyingPricesRequest({ loadedFile }) {
  try {
    yield put(ToastCreators.pending({ toastOptions: { autoClose: 4000 } }));
    const { signedUrl, fileName } = yield call(getSignedPricingsImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    yield call(importMarketProductBuyingPrices, { fileName });
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED') }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchImportMarketProductBuyingPricesRequest() {
  yield takeLatest(Types.IMPORT_MARKET_PRODUCT_BUYING_PRICES_REQUEST, importMarketProductBuyingPricesRequest);
}

function* exportMarketProductSupplierBuyingPricesRequest() {
  try {
    const data = yield call(exportMarketProductSupplierBuyingPrices);
    yield put(Creators.exportMarketProductSupplierBuyingPricesSuccess({ data }));
    yield put(ToastCreators.success({ message: t('global:FILE_WILL_BE_SENT'), toastOptions: { autoClose: 4000 } }));
  }
  catch (error) {
    yield put(Creators.exportMarketProductSupplierBuyingPricesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportMarketProductSupplierBuyingPricesRequest() {
  yield takeLatest(Types.EXPORT_MARKET_PRODUCT_SUPPLIER_BUYING_PRICES_REQUEST, exportMarketProductSupplierBuyingPricesRequest);
}

export default function* marketProductWastePriceListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductsPriceListRequest),
      fork(watchGetActiveMarketProductsRequest),
      fork(watchUpdateMarketProductPriceRequest),
      fork(watchUpdateMarketProductDiscountedPriceRequest),
      fork(watchGetMarketProductPriceDetailRequest),
      fork(watchGetMarketProductDiscountedPriceDetailRequest),
      fork(watchDeletePriceRequest),
      fork(watchDeleteDiscountedPriceRequest),
      fork(watchExportPricingsRequest),
      fork(watchImportPricingsRequest),
      fork(watchImportMarketProductBuyingPricesRequest),
      fork(watchExportDiscountedPricingsRequest),
      fork(watchExportMarketProductSupplierBuyingPricesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
