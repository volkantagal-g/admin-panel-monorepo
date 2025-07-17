import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getSummaryDetails as getSummaryDetailsApi } from '@shared/api/tipPayback';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getSummaryDetails({
  id,
  pageNo,
  pageSize,
  personName,
  payoutStatus,
  sort,
  person,
  taxNum,
}) {
  try {
    const data = yield call(getSummaryDetailsApi, {
      id,
      pageNo,
      pageSize,
      personName,
      payoutStatus,
      sort,
      person,
      taxNum,
    });
    yield put(Creators.getSummaryDetailsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSummaryDetailsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetSummaryDetailsRequest() {
  yield takeLatest(Types.GET_SUMMARY_DETAILS_REQUEST, getSummaryDetails);
}

export default function* payoutSummaryDetailsPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetSummaryDetailsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
