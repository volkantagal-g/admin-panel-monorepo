import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getArtisanStoresByName } from '@shared/api/artisanShop';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getArtisanStoresByNameRequest({ searchString }) {
  try {
    const data = yield call(getArtisanStoresByName, searchString);
    yield put(Creators.getArtisanStoresByNameSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getArtisanStoresByNameFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetArtisanStoresByNameRequest() {
  yield takeLatest(Types.GET_ARTISAN_STORES_BY_NAME_REQUEST, getArtisanStoresByNameRequest);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetArtisanStoresByNameRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
