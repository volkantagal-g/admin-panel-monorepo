import { all, call, cancel, cancelled, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getPermitDetailForDetailModal as getPermitDetailForDetailModalApi } from '@shared/api/employee';
import { Creators, Types } from './actions';

export function* getPermitDetail({ permitId }) {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const { permit, history, isSupervisor, hasPermission } = yield call(getPermitDetailForDetailModalApi, { permitId, cancelSource });
    yield put(Creators.getPermitDetailSuccess({
      permit,
      history,
      isSupervisor,
      hasPermission,
    }));
  }
  catch (error) {
    yield put(Creators.getPermitDetailFailure({ error }));
  }
  finally {
    if (yield cancelled()) {
      yield call(cancelSource.cancel);
    }
  }
}

export function* watchPermitDetailRequest() {
  yield takeLatest(Types.GET_PERMIT_DETAIL_REQUEST, getPermitDetail);
}

export default function* permitDetailModalRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPermitDetailRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
