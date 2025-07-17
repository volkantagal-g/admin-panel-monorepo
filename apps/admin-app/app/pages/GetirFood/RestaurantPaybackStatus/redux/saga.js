import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';

import {
  getCurrentStatus,
  changePaybackStatus,
  changeAllRestaurantsPaybackStatus,
  changePartialRestaurantsPaybackStatus,
  validatePartialRestaurantsPaybackStatus,
} from '@shared/api/foodRestaurantPaybackStatus';
import { getS3SignedUrl } from '@shared/api/foodRestaurantExternalTransaction';
import { uploadToS3SignedUrl } from '@shared/api/public';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { extractErrorMessages } from '../utils';
import { Types, Creators } from './actions';

const AUTO_CLOSE_DURATION_MS = 5000;

function* getCurrentStatusRequest({ restaurantId }) {
  try {
    const data = yield call(getCurrentStatus, { restaurantId });
    yield put(Creators.getCurrentStatusSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCurrentStatusFailure({ error }));
    yield put(ToastCreators.error({ error, message: error.response.data.ErrorMessage }));
  }
}

function* watchGetCurrentStatusRequest() {
  yield takeLatest(Types.GET_CURRENT_STATUS_REQUEST, getCurrentStatusRequest);
}

function* changePaybackStatusRequest({ data }) {
  try {
    yield call(changePaybackStatus, { data });
    yield put(Creators.changePaybackStatusSuccess());
    yield put(ToastCreators.success());
    yield put(Creators.getCurrentStatusRequest({ restaurantId: data.restaurantId }));
  }
  catch (error) {
    yield put(Creators.changePaybackStatusFailure({ error }));
    yield put(ToastCreators.error({ error, message: error.response.data.message }));
  }
}

function* watchChangePaybackStatusRequest() {
  yield takeLatest(Types.CHANGE_PAYBACK_STATUS_REQUEST, changePaybackStatusRequest);
}

function* changeAllRestaurantsPaybackStatusRequest({ data }) {
  try {
    yield call(changeAllRestaurantsPaybackStatus, { data });
    yield put(Creators.changeAllRestaurantsPaybackStatusSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.changeAllRestaurantsPaybackStatusFailure({ error }));
    yield put(ToastCreators.error({ error, message: error.response.data.message }));
  }
}

function* watchChangeAllRestaurantsPaybackStatusRequest() {
  yield takeLatest(Types.CHANGE_ALL_RESTAURANTS_PAYBACK_STATUS_REQUEST, changeAllRestaurantsPaybackStatusRequest);
}

function* changePartialRestaurantsPaybackStatusRequest({ data }) {
  try {
    yield call(changePartialRestaurantsPaybackStatus, { data });
    const { message } = yield put(Creators.changePartialRestaurantsPaybackStatusSuccess());
    yield put(ToastCreators.success({ message }));
  }
  catch (error) {
    yield put(Creators.changePartialRestaurantsPaybackStatusFailure({ error }));
    yield put(ToastCreators.error({ error, message: error.response.data.message }));
  }
}

function* watchChangePartialRestaurantsPaybackStatusRequest() {
  yield takeLatest(Types.CHANGE_PARTIAL_RESTAURANTS_PAYBACK_STATUS_REQUEST, changePartialRestaurantsPaybackStatusRequest);
}

function* validatePartialRestaurantsPaybackStatusRequest({ file, onSuccess, onError }) {
  try {
    const fileName = `${uuidv4()}_${file.name}`;
    const { signedUrl } = yield call(getS3SignedUrl, { fileName });
    yield call(uploadToS3SignedUrl, { signedUrl, data: file.base64File });
    const { shopCount } = yield call(validatePartialRestaurantsPaybackStatus, { fileName });
    yield put(Creators.validatePartialRestaurantsPaybackStatusSuccess());
    onSuccess({ shopCount, fileName });
  }
  catch (error) {
    yield put(Creators.validatePartialRestaurantsPaybackStatusFailure({ error }));
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

function* watchValidatePartialRestaurantsPaybackStatusRequest() {
  yield takeLatest(Types.VALIDATE_PARTIAL_RESTAURANTS_PAYBACK_STATUS_REQUEST, validatePartialRestaurantsPaybackStatusRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCurrentStatusRequest),
      fork(watchChangePaybackStatusRequest),
      fork(watchChangeAllRestaurantsPaybackStatusRequest),
      fork(watchChangePartialRestaurantsPaybackStatusRequest),
      fork(watchValidatePartialRestaurantsPaybackStatusRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
