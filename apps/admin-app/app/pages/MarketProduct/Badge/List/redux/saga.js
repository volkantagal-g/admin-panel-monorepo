import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getBadges, getMarketProductBadges, updateMarketProductBadgesBulk } from '@shared/api/marketProductBadge';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getBadgesRequest({ limit, offset }) {
  try {
    const data = yield call(getBadges, { limit, offset });
    yield put(Creators.getBadgesSuccess({ data }));
    if (data?.length) {
      yield put(Creators.setSelectedBadge({ badge: data[0] }));
    }
  }
  catch (error) {
    yield put(Creators.getBadgesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getMarketProductBadgesRequest({ badgeId }) {
  try {
    const data = yield call(getMarketProductBadges, { badgeId });
    yield put(Creators.getMarketProductBadgesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductBadgesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* updateMarketProductBadgesBulkRequest({ badgeId, productIds }) {
  try {
    const data = yield call(updateMarketProductBadgesBulk, { badgeId, productIds });
    yield put(Creators.updateMarketProductBadgesBulkSuccess({ data }));
    yield put(Creators.getMarketProductBadgesRequest({ badgeId }));
  }
  catch (error) {
    yield put(Creators.updateMarketProductBadgesBulkFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetBadgesRequest() {
  yield takeLatest(Types.GET_BADGES_REQUEST, getBadgesRequest);
}

export function* watchGetMarketProductBadgesRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_BADGES_REQUEST, getMarketProductBadgesRequest);
}

export function* watchUpdateMarketProductBadgesBulkRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_BADGES_BULK_REQUEST, updateMarketProductBadgesBulkRequest);
}

export default function* marketProductBadgeListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetBadgesRequest),
      fork(watchGetMarketProductBadgesRequest),
      fork(watchUpdateMarketProductBadgesBulkRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
