import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getDtsList } from '@shared/api/dts';

function* getDtsListRequest({ limit, offset, filters }) {
  try {
    const { records: data, totalCount } = yield call(getDtsList, { limit, offset, filters });
    yield put(Creators.getDtsListSuccess({ data, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getDtsListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* dtsListRequest() {
  yield takeLatest(Types.GET_DTS_LIST_REQUEST, getDtsListRequest);
}

export default function* dtsListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(dtsListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
