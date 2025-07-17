import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { uploadToS3SignedUrl } from '@shared/api/public';
import { t } from '@shared/i18n';
import { getMarketProductMasterCategories, bulkUpdateMarketProductMasterCategories } from '@shared/api/marketProductMasterCategory';
import {
  getSignedLogisticsImportUrl,
  importCreateMasterCategory,
  importUpdateMasterCategory,
  exportMasterCategory,
} from '@shared/api/supplyLogistic';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { PRODUCT_MASTER_CATEGORY_LEVEL } from '@shared/shared/constants';

const TOAST_AUTO_CLOSE_IN_MS = 3000;

function* getMasterMainCategoriesRequest({ queryText, limit, offset }) {
  try {
    const data = yield call(getMarketProductMasterCategories, {
      queryText,
      level: PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_MAIN_CATEGORY,
      limit,
      offset,
    });
    yield put(Creators.getMasterMainCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMasterMainCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMasterCategoriesRequest({ queryText, limit, offset }) {
  try {
    const data = yield call(getMarketProductMasterCategories, {
      queryText,
      level: PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CATEGORY,
      limit,
      offset,
    });
    yield put(Creators.getMasterCategoriesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMasterCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMasterClassesRequest({ queryText, limit, offset }) {
  try {
    const data = yield call(getMarketProductMasterCategories, {
      queryText,
      level: PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CLASS,
      limit,
      offset,
    });
    yield put(Creators.getMasterClassesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMasterClassesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMasterSubClassesRequest({ queryText, limit, offset }) {
  try {
    const data = yield call(getMarketProductMasterCategories, {
      queryText,
      level: PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_SUB_CLASS,
      limit,
      offset,
    });
    yield put(Creators.getMasterSubClassesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMasterSubClassesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* bulkUpdateMarketProductMasterCategoriesRequest({ categories, queryText, limit, offset }) {
  try {
    const data = yield call(bulkUpdateMarketProductMasterCategories, { categories });
    yield put(Creators.bulkUpdateMarketProductMasterCategoriesSuccess({ data }));
    yield put(Creators.getMasterClassesRequest({ queryText, limit, offset }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.bulkUpdateMarketProductMasterCategoriesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importCreateMasterCategoryRequest({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(getSignedLogisticsImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    const data = yield call(importCreateMasterCategory, { fileName });
    yield put(Creators.importCreateMasterCategorySuccess({ data }));
    yield put(
      ToastCreators.success({
        message: t('YOUR_REQUEST_HAS_BEEN_CREATED'),
        toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS },
      }),
    );
  }
  catch (error) {
    yield put(Creators.importCreateMasterCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importUpdateMasterCategoryRequest({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(getSignedLogisticsImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    const data = yield call(importUpdateMasterCategory, { fileName });
    yield put(Creators.importUpdateMasterCategorySuccess({ data }));
    yield put(
      ToastCreators.success({
        message: t('YOUR_REQUEST_HAS_BEEN_CREATED'),
        toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS },
      }),
    );
  }
  catch (error) {
    yield put(Creators.importUpdateMasterCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportMasterCategoryRequest({ levels }) {
  try {
    const data = yield call(exportMasterCategory, { levels });
    yield put(Creators.exportMasterCategorySuccess({ data }));
    yield put(
      ToastCreators.success({
        message: t('global:FILE_WILL_BE_SENT'),
        toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS },
      }),
    );
  }
  catch (error) {
    yield put(Creators.exportMasterCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMasterMainCategoriesRequest() {
  yield takeLatest(Types.GET_MASTER_MAIN_CATEGORIES_REQUEST, getMasterMainCategoriesRequest);
}

function* watchGetMasterCategoriesRequest() {
  yield takeLatest(Types.GET_MASTER_CATEGORIES_REQUEST, getMasterCategoriesRequest);
}

function* watchGetMasterClassesRequest() {
  yield takeLatest(Types.GET_MASTER_CLASSES_REQUEST, getMasterClassesRequest);
}

function* watchGetMasterSubClassesRequest() {
  yield takeLatest(Types.GET_MASTER_SUB_CLASSES_REQUEST, getMasterSubClassesRequest);
}

function* watchBulkUpdateMarketProductMasterCategoriesRequest() {
  yield takeLatest(Types.BULK_UPDATE_MARKET_PRODUCT_MASTER_CATEGORIES_REQUEST, bulkUpdateMarketProductMasterCategoriesRequest);
}

function* watchImportCreateMasterCategoryRequest() {
  yield takeLatest(Types.IMPORT_CREATE_MASTER_CATEGORY_REQUEST, importCreateMasterCategoryRequest);
}

function* watchImportUpdateMasterCategoryRequest() {
  yield takeLatest(Types.IMPORT_UPDATE_MASTER_CATEGORY_REQUEST, importUpdateMasterCategoryRequest);
}

function* watchExportMasterCategoryRequest() {
  yield takeLatest(Types.EXPORT_MASTER_CATEGORY_REQUEST, exportMasterCategoryRequest);
}

export default function* marketProductCategoryListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMasterMainCategoriesRequest),
      fork(watchGetMasterCategoriesRequest),
      fork(watchGetMasterClassesRequest),
      fork(watchGetMasterSubClassesRequest),
      fork(watchBulkUpdateMarketProductMasterCategoriesRequest),
      fork(watchImportCreateMasterCategoryRequest),
      fork(watchImportUpdateMasterCategoryRequest),
      fork(watchExportMasterCategoryRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
