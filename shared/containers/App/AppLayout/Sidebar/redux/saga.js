import { all, cancel, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { getFavoritePages, updateFavoritePages } from '@shared/api/user';

function* getFavoritePagesRequest() {
  try {
    const data = yield call(getFavoritePages);
    yield put(Creators.getFavoritePagesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFavoritePagesFailure({ error }));
  }
}

function* watchGetFavoritePagesRequest() {
  yield takeLatest(Types.GET_FAVORITE_PAGES_REQUEST, getFavoritePagesRequest);
}

function* updateFavoritePagesRequest({ favoritePages }) {
  try {
    yield call(updateFavoritePages, { favoritePages });
  }
  catch (error) {
    yield put(Creators.updateFavoritePagesFailure({ error }));
  }

  yield put(Creators.getFavoritePagesRequest());
}

function* watchUpdateFavoritePagesRequest() {
  yield takeLatest(Types.UPDATE_FAVORITE_PAGES_REQUEST, updateFavoritePagesRequest);
}

export default function* root() {
  while (yield take(Types.INIT_SIDEBAR)) {
    const backgroundTasks = yield all([
      fork(watchGetFavoritePagesRequest),
      fork(watchUpdateFavoritePagesRequest),
    ]);
    yield take(Types.DESTROY_SIDEBAR);
    yield cancel(backgroundTasks);
  }
}
