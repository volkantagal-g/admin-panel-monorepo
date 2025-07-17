import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createConnectedContent } from '@shared/api/marketing';
import { Creators, Types } from '@shared/containers/Marketing/ConnectedContentModal/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export default function* root() {
  function* createConnectedContentRequest({ formBody }) {
    try {
      const { data } = yield call(createConnectedContent, { formBody });
      yield put(Creators.createConnectedContentSuccess({ content: data }));
    }
    catch (error) {
      yield put(Creators.createConnectedContentFailure({ error }));
      yield put(ToastCreators.error({ error }));
    }
  }

  function* watchCreateConnectedContentRequest() {
    yield takeLatest(Types.CREATE_CONNECTED_CONTENT_REQUEST, createConnectedContentRequest);
  }

  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateConnectedContentRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
