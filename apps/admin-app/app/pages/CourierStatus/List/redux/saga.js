import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { filterCourierStatusAndBusy as filterCourierStatusAndBusyApi } from '@shared/api/courier';
import { vehicleStatusAndBusyRequestParams } from '@app/pages/CourierStatus/List/utils';
import { COURIER_BUSY_AND_STATUS_DASHBOARD } from '@app/pages/CourierStatus/List/constants';
import { Types, Creators } from './actions';

export function* courierStatusAndBusyRequest({ domains, status, warehouse, reason, timeSpent, currentPage, rowsPerPage }) {
  try {
    const params = vehicleStatusAndBusyRequestParams({
      domains,
      status,
      warehouse,
      reason,
      timeSpent,
      currentPage,
      rowsPerPage,
      fields: COURIER_BUSY_AND_STATUS_DASHBOARD,
    });
    const response = yield call(filterCourierStatusAndBusyApi, params);
    yield put(Creators.filterCourierSuccess({ data: response }));
  }
  catch (error) {
    yield put(Creators.filterCourierFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCourierStatusAndBusyRequest() {
  yield takeLatest(Types.FILTER_COURIER_REQUEST, courierStatusAndBusyRequest);
}

export default function* courierStatusAndBusyListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCourierStatusAndBusyRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
