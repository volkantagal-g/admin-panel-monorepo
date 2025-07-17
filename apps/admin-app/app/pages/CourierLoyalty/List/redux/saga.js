import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getCourierLoyalty as getCourierLoyaltyApi } from '@shared/api/courierGamification';

import { filterConfiguration } from '@app/pages/CourierLoyalty/List/utils';

import { Types, Creators } from './actions';

function* getCourierLoyalty({ courierId, performanceGroup, levelGroup, cityId, warehouseId, startDate, endDate, currentPage, rowsPerPage }) {
  try {
    const parameters = filterConfiguration({ courierId, performanceGroup, levelGroup, cityId, warehouseId, startDate, endDate, currentPage, rowsPerPage });
    const data = yield call(getCourierLoyaltyApi, parameters);
    yield put(Creators.getCourierLoyaltySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCourierLoyaltyFailure({ error }));
  }
}

function* watchGetCourierLoyaltyRequest() {
  yield takeLatest(Types.GET_COURIER_LOYALTY_REQUEST, getCourierLoyalty);
}

export default function* courierLoyaltyListPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetCourierLoyaltyRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
