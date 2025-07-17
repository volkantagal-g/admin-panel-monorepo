import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getMarketProductGroups } from '@shared/api/marketProductGroup';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getMarketProductGroupsRequest({ limit, offset, queryText, filterOptions }) {
  try {
    const data = yield call(getMarketProductGroups, { limit, offset, queryText, filterOptions });
    yield put(Creators.getMarketProductGroupsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductGroupsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMarketProductGroupsRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_GROUPS_REQUEST, getMarketProductGroupsRequest);
}

export default function* marketProductGroupListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductGroupsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
