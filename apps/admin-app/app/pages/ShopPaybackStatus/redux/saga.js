import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';

import {
  getShopCurrentPaybackStatus,
  updateShopPaybackStatus,
  updateAllShopsPaybackStatus,
  updatePartialShopsPaybackStatus,
  validatePartialShopsPaybackStatus,
} from '@shared/api/shopPaybackStatus';
import { getS3SignedUrl } from '@shared/api/localsShopExternalTransaction';
import { uploadToS3SignedUrl } from '@shared/api/public';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { extractErrorMessages } from '@app/pages/GetirFood/RestaurantPaybackStatus/utils';
import { Types, Creators } from './actions';

const AUTO_CLOSE_DURATION_MS = 5000;

function* getShopCurrentPaybackStatusRequest({ partnerId }) {
  try {
    const { data } = yield call(getShopCurrentPaybackStatus, { partnerId });
    yield put(Creators.getShopCurrentPaybackStatusSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getShopCurrentPaybackStatusFailure({ error }));
    yield put(ToastCreators.error({ error, message: error.response.data.ErrorMessage }));
  }
}

function* watchGetShopCurrentPaybackStatusRequest() {
  yield takeLatest(Types.GET_SHOP_CURRENT_PAYBACK_STATUS_REQUEST, getShopCurrentPaybackStatusRequest);
}

function* updateShopPaybackStatusRequest({ partnerId, data }) {
  try {
    yield call(updateShopPaybackStatus, { partnerId, data });
    yield put(Creators.updateShopPaybackStatusSuccess());
    yield put(ToastCreators.success());
    yield put(Creators.getShopCurrentPaybackStatusRequest({ partnerId }));
  }
  catch (error) {
    yield put(Creators.updateShopPaybackStatusFailure({ error }));
    yield put(ToastCreators.error({ error, message: error.response.data.message }));
  }
}

function* watchUpdateShopPaybackStatusRequest() {
  yield takeLatest(Types.UPDATE_SHOP_PAYBACK_STATUS_REQUEST, updateShopPaybackStatusRequest);
}

function* updateAllShopsPaybackStatusRequest({ data }) {
  try {
    yield call(updateAllShopsPaybackStatus, { data });
    yield put(Creators.updateAllShopsPaybackStatusSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateAllShopsPaybackStatusFailure({ error }));
    yield put(ToastCreators.error({ error, message: error.response.data.message }));
  }
}

function* watchUpdateAllShopsPaybackStatusRequest() {
  yield takeLatest(Types.UPDATE_ALL_SHOPS_PAYBACK_STATUS_REQUEST, updateAllShopsPaybackStatusRequest);
}

function* updatePartialShopsPaybackStatusRequest({ data }) {
  try {
    yield call(updatePartialShopsPaybackStatus, { data });
    yield put(Creators.updatePartialShopsPaybackStatusSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updatePartialShopsPaybackStatusFailure({ error }));
    yield put(ToastCreators.error({ error, message: error.response.data.message }));
  }
}

function* watchUpdatePartialShopsPaybackStatusRequest() {
  yield takeLatest(Types.UPDATE_PARTIAL_SHOPS_PAYBACK_STATUS_REQUEST, updatePartialShopsPaybackStatusRequest);
}

function* validatePartialShopsPaybackStatusRequest({ file, onSuccess, onError }) {
  try {
    const fileName = `${uuidv4()}_${file.name}`;
    const { signedUrl } = yield call(getS3SignedUrl, { fileName });
    yield call(uploadToS3SignedUrl, { signedUrl, data: file.base64File });
    const { data: validationData } = yield call(validatePartialShopsPaybackStatus, { fileName });
    yield put(Creators.validatePartialShopsPaybackStatusSuccess());
    onSuccess({ shopCount: validationData.shopCount, fileName: validationData.fileName });
  }
  catch (error) {
    yield put(Creators.validatePartialShopsPaybackStatusFailure({ error }));
    const errorMessages = error?.response?.data?.errorMessages;
    if (errorMessages) {
      const message = extractErrorMessages(errorMessages);
      yield put(ToastCreators.error({ message, toastOptions: { autoClose: AUTO_CLOSE_DURATION_MS } }));
    }
    else {
      yield put(ToastCreators.error({ error, message: error.response.data.message }));
    }
    onError();
  }
}

function* watchValidatePartialShopsPaybackStatusRequest() {
  yield takeLatest(Types.VALIDATE_PARTIAL_SHOPS_PAYBACK_STATUS_REQUEST, validatePartialShopsPaybackStatusRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetShopCurrentPaybackStatusRequest),
      fork(watchUpdateShopPaybackStatusRequest),
      fork(watchUpdateAllShopsPaybackStatusRequest),
      fork(watchUpdatePartialShopsPaybackStatusRequest),
      fork(watchValidatePartialShopsPaybackStatusRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
