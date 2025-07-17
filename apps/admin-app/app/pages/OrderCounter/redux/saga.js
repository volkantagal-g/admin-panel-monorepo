import { all, call, cancel, delay, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { getOrderCountsForGlobal, getOrderCountsForCountry } from '@shared/api/orderCounter';

import { Types, Creators } from './actions';
import { filtersSelector } from './selectors';

function* getTotalOrderCountsData() {
  const orderType = yield select(filtersSelector.getOrderType);
  let getTotalOrderCountsDataRequest;

  if (orderType === 'global') {
    getTotalOrderCountsDataRequest = getOrderCountsForGlobal;
  }
  else {
    getTotalOrderCountsDataRequest = getOrderCountsForCountry;
  }

  try {
    const { totalOrderCount } = yield call(getTotalOrderCountsDataRequest);
    yield put(Creators.getTotalOrderCountsDataSuccess({ data: totalOrderCount }));
    while (true) {
      yield delay(60000); // Wait for 1 minute
      yield getTotalOrderCountsData();
    }
  }
  catch (error) {
    yield put(Creators.getTotalOrderCountsDataFailure({ error }));
  }
}

function* watchGetTotalOrderCountsDataRequest() {
  yield takeLatest(Types.GET_TOTAL_ORDER_COUNTS_DATA_REQUEST, getTotalOrderCountsData);
}

export default function* counterPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTotalOrderCountsDataRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
