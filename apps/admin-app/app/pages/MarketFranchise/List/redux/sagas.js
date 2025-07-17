import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getMarketFranchises } from '@shared/api/marketFranchise';
import { Types, Creators } from './actions';

function* marketFranchisesRequest({
  name,
  cities,
  domainTypes,
  franchiseTypes,
  isActivated,
  limit,
  offset,
}) {
  try {
    const { franchises, totalCount } = yield call(getMarketFranchises, {
      name,
      cities,
      domainTypes,
      franchiseTypes,
      isActivated,
      limit,
      offset,
      populate: ['warehouse', 'owner'],
    });
    yield put(Creators.getMarketFranchisesSuccess({ data: franchises, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getMarketFranchisesFailure({ error }));
  }
}

function* watchMarketFranchisesRequest() {
  yield takeLatest(Types.GET_MARKET_FRANCHISES_REQUEST, marketFranchisesRequest);
}

export default function* marketFranchisesRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchMarketFranchisesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
