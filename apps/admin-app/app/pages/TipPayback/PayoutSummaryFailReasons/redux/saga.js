import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getSummaryFailReasons as getSummaryFailReasonsApi } from '@shared/api/tipPayback';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getSummaryFailReasons({
  id, personName, sort, pageNo, pageSize, person,
  taxNum,
}) {
  try {
    const { data } = yield call(getSummaryFailReasonsApi, {
      id,
      personName,
      sort,
      pageNo,
      pageSize,
      person,
      taxNum,
    });
    yield put(Creators.getSummaryFailReasonsSuccess({ data }));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
    yield put(Creators.getSummaryFailReasonsFailure({ error }));
  }
}

function* watchGetSummaryFailReasonsRequest() {
  yield takeLatest(Types.GET_SUMMARY_FAIL_REASONS_REQUEST, getSummaryFailReasons);
}

export default function* payoutSummaryFailReasonsPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSummaryFailReasonsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
