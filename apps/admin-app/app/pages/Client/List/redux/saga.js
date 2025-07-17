import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { search } from '@shared/api/client';

function* searchClientsRequest({ name, email, gsm }) {
  try {
    const { clients } = yield call(search, { name, email, gsm });
    yield put(Creators.searchClientsSuccess({ clients }));
  }
  catch (error) {
    yield put(Creators.searchClientsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchSearchClientsRequestt() {
  yield takeLatest(Types.SEARCH_CLIENTS_REQUEST, searchClientsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchSearchClientsRequestt),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
