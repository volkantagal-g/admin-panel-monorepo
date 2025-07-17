import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getAllVendorStatus, getBrands, getFirms, getVendorFilterCount, getVendorsFilter } from '@shared/api/water';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from '@app/pages/GetirWater/VendorFilter/redux/actions';
import prepareFiltersForRequestBody from '../utils/prepareFiltersForRequestBody';

function* getBrandsRequest() {
  try {
    const data = yield call(getBrands);
    const { payload } = data;
    yield put(Creators.getBrandsSuccess({ data: payload }));
  }
  catch (error) {
    yield put(Creators.getBrandsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getFirmsRequest() {
  try {
    const data = yield call(getFirms);
    const { payload: { firms } } = data;
    yield put(Creators.getFirmsSuccess({ data: firms }));
  }
  catch (error) {
    yield put(Creators.getFirmsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getFilterVendorsRequest({ data: filters }) {
  try {
    const { payload: { vendors } } = yield call(getVendorsFilter, { data: prepareFiltersForRequestBody(filters) });
    yield put(Creators.filterVendorsSuccess({ data: vendors }));
  }
  catch (error) {
    yield put(Creators.filterVendorsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getStatusRequest() {
  try {
    const data = yield call(getAllVendorStatus);
    const { payload: { statusList } } = data;
    yield put(Creators.getStatusSuccess({ data: statusList }));
  }
  catch (error) {
    yield put(Creators.getStatusFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getVendorFilterCountRequest({ data: filters }) {
  try {
    const { payload } = yield call(getVendorFilterCount, { data: prepareFiltersForRequestBody(filters) });
    yield put(Creators.getVendorFilterCountSuccess({ data: payload }));
  }
  catch (error) {
    yield put(Creators.getVendorFilterCountFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getExcelRequest({ data: filters }) {
  try {
    const { payload: { vendors } } = yield call(getVendorsFilter, { data: prepareFiltersForRequestBody(filters) });
    yield put(Creators.getExcelSuccess({ data: vendors }));
  }
  catch (error) {
    yield put(Creators.getExcelError({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchBrandsRequest() {
  yield takeLatest(Types.GET_BRANDS_REQUEST, getBrandsRequest);
}

function* watchFirmsRequest() {
  yield takeLatest(Types.GET_FIRMS_REQUEST, getFirmsRequest);
}

function* watchFilterVendorsRequest() {
  yield takeLatest(Types.FILTER_VENDORS_REQUEST, getFilterVendorsRequest);
}

function* watchStatusRequest() {
  yield takeLatest(Types.GET_STATUS_REQUEST, getStatusRequest);
}

function* watchVendorFilterCountRequest() {
  yield takeLatest(Types.GET_VENDOR_FILTER_COUNT_REQUEST, getVendorFilterCountRequest);
}

function* watchExcelRequest() {
  yield takeLatest(Types.GET_EXCEL_REQUEST, getExcelRequest);
}

export default function* waterOrderFilterRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchBrandsRequest),
      fork(watchFirmsRequest),
      fork(watchFilterVendorsRequest),
      fork(watchStatusRequest),
      fork(watchVendorFilterCountRequest),
      fork(watchExcelRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
