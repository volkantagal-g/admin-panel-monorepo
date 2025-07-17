import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getArtisanVerticals } from '@shared/api/marketing';

function* getArtisanVerticalsRequest() {
  try {
    const { data } = yield call(getArtisanVerticals);
    yield put(Creators.getArtisanVerticalsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getArtisanVerticalsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetArtisanVerticalsRequest() {
  yield takeLatest(Types.GET_ARTISAN_VERTICALS_REQUEST, getArtisanVerticalsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetArtisanVerticalsRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
