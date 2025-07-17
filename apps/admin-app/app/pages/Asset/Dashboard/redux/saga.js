import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getDeviceTypeStatistics, getDeviceStatusStatistics, getAssignmentStatusStatistics,
  getRentalStatistics, getMDMStatistics, getBrandsStatistics, getAssetOwnersStatistics,
} from '@shared/api/employee';

function* getDeviceTypeStatisticsRequest({ filters }) {
  try {
    const { data } = yield call(getDeviceTypeStatistics, { filters });
    yield put(Creators.getDeviceTypeStatisticsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDeviceTypeStatisticsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getDeviceStatusStatisticsRequest({ filters }) {
  try {
    const { data } = yield call(getDeviceStatusStatistics, { filters });
    yield put(Creators.getDeviceStatusStatisticsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getDeviceStatusStatisticsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getAssignmentStatusStatisticsRequest({ filters }) {
  try {
    const { data } = yield call(getAssignmentStatusStatistics, { filters });
    yield put(Creators.getAssignmentStatusStatisticsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAssignmentStatusStatisticsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRentalStatisticsRequest({ filters }) {
  try {
    const { data } = yield call(getRentalStatistics, { filters });
    yield put(Creators.getRentalStatisticsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRentalStatisticsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMDMStatisticsRequest({ filters }) {
  try {
    const { data } = yield call(getMDMStatistics, { filters });
    yield put(Creators.getMDMStatisticsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMDMStatisticsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getBrandsStatisticsRequest({ filters }) {
  try {
    const { data } = yield call(getBrandsStatistics, { filters });
    yield put(Creators.getBrandsStatisticsSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.getBrandsStatisticsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getAssetOwnersStatisticsRequest({ filters }) {
  try {
    const { data } = yield call(getAssetOwnersStatistics, { filters });
    yield put(Creators.getAssetOwnersStatisticsSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.getAssetOwnersStatisticsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDeviceTypeStatisticsRequest() {
  yield takeLatest(Types.GET_DEVICE_TYPE_STATISTICS_REQUEST, getDeviceTypeStatisticsRequest);
}

function* watchGetDeviceStatusStatisticsRequest() {
  yield takeLatest(Types.GET_DEVICE_STATUS_STATISTICS_REQUEST, getDeviceStatusStatisticsRequest);
}

function* watchGetAssignmentStatusStatisticsRequest() {
  yield takeLatest(Types.GET_ASSIGNMENT_STATUS_STATISTICS_REQUEST, getAssignmentStatusStatisticsRequest);
}

function* watchGetRentalStatisticsRequest() {
  yield takeLatest(Types.GET_RENTAL_STATISTICS_REQUEST, getRentalStatisticsRequest);
}

function* watchGetMDMStatisticsRequest() {
  yield takeLatest(Types.GET_MDM_STATISTICS_REQUEST, getMDMStatisticsRequest);
}

function* watchGetBrandsStatisticsRequest() {
  yield takeLatest(Types.GET_BRANDS_STATISTICS_REQUEST, getBrandsStatisticsRequest);
}

function* watchGetAssetOwnersStatisticsRequest() {
  yield takeLatest(Types.GET_ASSET_OWNERS_STATISTICS_REQUEST, getAssetOwnersStatisticsRequest);
}

export default function* assetDashboardRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDeviceTypeStatisticsRequest),
      fork(watchGetDeviceStatusStatisticsRequest),
      fork(watchGetAssignmentStatusStatisticsRequest),
      fork(watchGetRentalStatisticsRequest),
      fork(watchGetMDMStatisticsRequest),
      fork(watchGetBrandsStatisticsRequest),
      fork(watchGetAssetOwnersStatisticsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
