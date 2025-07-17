import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getEarningsApi, getVoyagerEarningsApi } from '@shared/api/franchiseFinancial';
import { Types, Creators } from './actions';

function* getEarnings({ financialMonths, warehouses, franchises }) {
  try {
    const response = yield call(getEarningsApi, { financialMonths, warehouses, franchises });
    yield put(Creators.getEarningsSuccess({ data: response.franchise_financials, warehouses: response.warehouses }));
  }
  catch (error) {
    yield put(Creators.getEarningsFailure({ error }));
  }
}

function* getVoyagerEarnings({ financialMonths, franchises, warehouses }) {
  try {
    const response = yield call(getVoyagerEarningsApi, { financialMonths, warehouses, franchises });
    yield put(Creators.getVoyagerEarningsSuccess({ data: response.franchise_financials, warehouses: response.warehouses }));
  }
  catch (error) {
    yield put(Creators.getVoyagerEarningsFailure({ error }));
  }
}

function* watchEarningsRequest() {
  yield takeLatest(Types.GET_EARNINGS_REQUEST, getEarnings);
}

function* watchVoyagerEarningsRequest() {
  yield takeLatest(Types.GET_VOYAGER_EARNINGS_REQUEST, getVoyagerEarnings);
}

export default function* franchiseEarningsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchEarningsRequest),
      fork(watchVoyagerEarningsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
