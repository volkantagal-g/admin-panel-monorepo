import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import { createElement } from 'react';

import { set } from 'lodash';

import {
  updateMarketProductGroup,
  getMarketProductGroup,
  deleteMarketProductGroup,
  getProductsOfProductGroup,
  copyMarketProductGroup,
  getSignedProductsOfProductGroupsImportUrl,
  importProductsOfProductGroup,
  createMarketProductGroupImageUrl,
} from '@shared/api/marketProductGroup';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';
import { uploadToS3SignedUrl } from '@shared/api/public';
import { t } from '@shared/i18n';
import ExistingProductGroupError from '@app/pages/MarketProduct/Group/Detail/components/ExistingProductGroupError';

const TOAST_AUTO_CLOSE_IN_MS = 3000;

export function* getMarketProductGroupRequest({ id }) {
  try {
    const data = yield call(getMarketProductGroup, { id });
    yield put(Creators.getMarketProductGroupSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateMarketProductGroupRequest({
  id,
  body,
  loadedImage = null,
  extension = null,
}) {
  try {
    if (extension && loadedImage) {
      const { signedUrl, cdnUrl } = yield call(createMarketProductGroupImageUrl, { extension });
      yield call(uploadToS3SignedUrl, { signedUrl, data: loadedImage });
      set(body, 'picURL', cdnUrl);
    }
    const data = yield call(updateMarketProductGroup, {
      id,
      body,
    });
    yield put(Creators.updateMarketProductGroupSuccess({ data }));
    yield put(Creators.getMarketProductGroupRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateMarketProductGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));

    // Existing product group id can't be shown in error response
    // due to some limitation according to BE. Instead, existing product group's id is responded in `data` field.
    // So we show it like this:
    if (error?.response?.data?.error === 'ProductGroupingExistsWithSameProperties') {
      const productGroupId = error?.response?.data?.data;

      yield put(ToastCreators.error({
        message: createElement(ExistingProductGroupError, { productGroupId }),
        toastOptions: {
          autoClose: 30_000,
          closeOnClick: false,
          draggable: false,
          closeButton: true,
          bodyStyle: { cursor: 'auto' },
        },
      }));
    }
  }
}

export function* copyMarketProductGroupRequest({ id }) {
  try {
    const data = yield call(copyMarketProductGroup, { id });
    yield put(ToastCreators.success());
    const path = ROUTE.MARKET_PRODUCT_GROUP_DETAIL.path.replace(':id', data?.productGrouping?._id);
    history.push(path);
    yield put(Creators.getMarketProductGroupRequest({ id: data?.productGrouping?._id }));
    yield put(Creators.copyMarketProductGroupSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.copyMarketProductGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* deleteMarketProductGroupRequest({ id }) {
  try {
    yield call(deleteMarketProductGroup, { id });
    yield put(Creators.deleteMarketProductGroupSuccess());
    history.push(ROUTE.MARKET_PRODUCT_GROUP_LIST.path);
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteMarketProductGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getProductsOfProductGroupRequest({ id }) {
  try {
    const data = yield call(getProductsOfProductGroup, { id });
    yield put(Creators.getProductsOfProductGroupSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getProductsOfProductGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* importProductsOfProductGroupRequest({ loadedFile }) {
  try {
    const {
      signedUrl,
      fileName,
    } = yield call(getSignedProductsOfProductGroupsImportUrl);
    yield call(uploadToS3SignedUrl, {
      signedUrl,
      data: loadedFile,
    });
    const data = yield call(importProductsOfProductGroup, { fileName });
    yield put(Creators.importProductsOfProductGroupSuccess({ data }));
    yield put(ToastCreators.success({
      message: t('YOUR_REQUEST_HAS_BEEN_CREATED'),
      toastOptions: { autoClose: TOAST_AUTO_CLOSE_IN_MS },
    }));
  }
  catch (error) {
    yield put(Creators.importProductsOfProductGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetMarketProductGroupRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_GROUP_REQUEST, getMarketProductGroupRequest);
}

export function* watchUpdateMarketProductGroupRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_GROUP_REQUEST, updateMarketProductGroupRequest);
}

export function* watchCopyMarketProductGroupRequest() {
  yield takeLatest(Types.COPY_MARKET_PRODUCT_GROUP_REQUEST, copyMarketProductGroupRequest);
}

export function* watchDeleteMarketProductGroupRequest() {
  yield takeLatest(Types.DELETE_MARKET_PRODUCT_GROUP_REQUEST, deleteMarketProductGroupRequest);
}

export function* watchGetProductsOfProductGroupRequest() {
  yield takeLatest(Types.GET_PRODUCTS_OF_PRODUCT_GROUP_REQUEST, getProductsOfProductGroupRequest);
}

export function* watchImportProductsOfProductGroupRequest() {
  yield takeLatest(Types.IMPORT_PRODUCTS_OF_PRODUCT_GROUP_REQUEST, importProductsOfProductGroupRequest);
}

export default function* marketProductGroupDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductGroupRequest),
      fork(watchUpdateMarketProductGroupRequest),
      fork(watchDeleteMarketProductGroupRequest),
      fork(watchCopyMarketProductGroupRequest),
      fork(watchGetProductsOfProductGroupRequest),
      fork(watchImportProductsOfProductGroupRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
