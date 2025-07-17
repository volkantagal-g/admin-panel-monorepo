import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { getCitiesSelector, getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getCourierStatusCountsWithCourierPlanV2 } from '@shared/api/businessMonitoring';
import { downloadAllWarehousesCourierStatusData } from '@app/pages/LiveMonitoring/CourierLiveMonitoring/utils';

function* getCourierStatusCountsRequest({ data }) {
  try {
    const reqObj = {};
    if (data.selectedCity) {
      reqObj.selectedCity = data.selectedCity;
      reqObj.onlyCityData = true;
    }
    const courierStatusData = yield call(getCourierStatusCountsWithCourierPlanV2, reqObj);
    yield put(Creators.getCourierStatusCountsSuccess({ data: courierStatusData }));
  }
  catch (error) {
    yield put(Creators.getCourierStatusCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* downloadCourierStatusCountsForAllWarehousesCSVRequest({ t }) {
  try {
    const courierStatusData = yield call(getCourierStatusCountsWithCourierPlanV2);
    const cities = yield select(getCitiesSelector.getData);
    const filteredWarehouses = yield select(getFilteredWarehousesSelector.getData);

    downloadAllWarehousesCourierStatusData({
      cities,
      filteredWarehouses,
      courierStatusData,
      t,
    });

    yield put(Creators.downloadCourierStatusCountsForAllWarehousesCSVSuccess());
  }
  catch (error) {
    yield put(Creators.downloadCourierStatusCountsForAllWarehousesCSVFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCourierStatusCountsRequest() {
  yield takeLatest(Types.GET_COURIER_STATUS_COUNTS_REQUEST, getCourierStatusCountsRequest);
}

function* watchDownloadCourierStatusCountsForAllWarehousesCSVRequest() {
  yield takeLatest(Types.DOWNLOAD_COURIER_STATUS_COUNTS_FOR_ALL_WAREHOUSES_CSV_REQUEST, downloadCourierStatusCountsForAllWarehousesCSVRequest);
}

export default function* courierLiveMonitoringRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCourierStatusCountsRequest),
      fork(watchDownloadCourierStatusCountsForAllWarehousesCSVRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
