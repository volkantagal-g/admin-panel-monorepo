import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getBrand, updateBrand, activateBrand, deactivateBrand } from '@shared/api/brand';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getBrandRequest({ id }) {
  try {
    const data = yield call(getBrand, { id });
    yield put(Creators.getBrandSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getBrandFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateBrandRequest({ id, updateData }) {
  try {
    yield call(updateBrand, { id, updateData });
    yield put(Creators.updateBrandSuccess());
    yield put(Creators.getBrandRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateBrandFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* activateBrandRequest({ id }) {
  try {
    yield call(activateBrand, { id });
    yield put(Creators.activateBrandSuccess());
    yield put(Creators.getBrandRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.activateBrandFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* deactivateBrandRequest({ id }) {
  try {
    yield call(deactivateBrand, { id });
    yield put(Creators.deactivateBrandSuccess());
    yield put(Creators.getBrandRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deactivateBrandFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetBrandRequest() {
  yield takeLatest(Types.GET_BRAND_REQUEST, getBrandRequest);
}

export function* watchUpdateBrandRequest() {
  yield takeLatest(Types.UPDATE_BRAND_REQUEST, updateBrandRequest);
}

export function* watchActivateBrandRequest() {
  yield takeLatest(Types.ACTIVATE_BRAND_REQUEST, activateBrandRequest);
}

export function* watchDeactivateBrandRequest() {
  yield takeLatest(Types.DEACTIVATE_BRAND_REQUEST, deactivateBrandRequest);
}

export default function* brandDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetBrandRequest),
      fork(watchUpdateBrandRequest),
      fork(watchActivateBrandRequest),
      fork(watchDeactivateBrandRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
