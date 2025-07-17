import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getBusyReasons, filterCouriers } from '@shared/api/marketCouriers';
import { GETIR_VOYAGER_DOMAIN_TYPE } from '@shared/shared/constants';
import { Types, Creators } from './actions';

function* couriersRequest({ warehouseIds, status, lastBusyOptionIds }) {
  const data = {};
  if (warehouseIds && warehouseIds.length > 0) {
    data.warehouseIds = warehouseIds;
  }

  if (lastBusyOptionIds && lastBusyOptionIds.length > 0) {
    data.lastBusyOptionIds = lastBusyOptionIds;
  }

  try {
    const { couriers } = yield call(filterCouriers, {
      domainTypes: [String(GETIR_VOYAGER_DOMAIN_TYPE)],
      populate: ['lastBusyOption'],
      ...data,
    });
    yield put(Creators.getCouriersSuccess({ couriers, filter: status }));
  }
  catch (error) {
    yield put(Creators.getCouriersFailure({ error }));
  }
}

function* busyReasonsRequest() {
  try {
    const { reasons } = yield call(getBusyReasons);
    yield put(Creators.getBusyReasonsSuccess({ reasons }));
  }
  catch (error) {
    yield put(Creators.getBusyReasonsFailure({ error }));
  }
}

function* watchCouriersRequest() {
  yield takeLatest(Types.GET_COURIERS_REQUEST, couriersRequest);
}

function* watchBusyReasonsRequest() {
  yield takeLatest(Types.GET_BUSY_REASONS_REQUEST, busyReasonsRequest);
}

export default function* warehousesRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchCouriersRequest), fork(watchBusyReasonsRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
