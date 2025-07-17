import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getFilteredPromos } from '@shared/api/promo';
import { Creators, Types } from './actions';

function* getPromosRequest({
  promoCode,
  startDate,
  endDate,
  status,
  discountReason,
  domainTypes,
  promoUsageType,
  promoTarget,
  limit,
  page,
}) {
  try {
    const { promos, totalCount } = yield call(getFilteredPromos, {
      promoCode,
      startDate,
      endDate,
      status,
      discountReason,
      domainTypes,
      promoUsageType,
      promoTarget,
      limit,
      page,
    });
    yield put(Creators.getPromosSuccess({ promos, totalCount }));
  }
  catch (error) {
    yield put(Creators.getPromosFailure({ error }));
  }
}

function* watchPromosRequest() {
  yield takeLatest(Types.GET_PROMOS_REQUEST, getPromosRequest);
}

export default function* promosRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPromosRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
