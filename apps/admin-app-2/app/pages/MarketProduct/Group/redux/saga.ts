import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getRankingScenarioNames } from '@shared/api/marketRanking';

export function* getRankingScenarioNamesRequest(): SagaIterator {
  try {
    const data = yield call(getRankingScenarioNames);
    yield put(Creators.getRankingScenarioNamesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRankingScenarioNamesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetRankingScenarioNamesRequest(): SagaIterator {
  yield takeLatest(Types.GET_RANKING_SCENARIO_NAMES_REQUEST, getRankingScenarioNamesRequest);
}

export default function* initProductGroupCommon(): SagaIterator {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetRankingScenarioNamesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
