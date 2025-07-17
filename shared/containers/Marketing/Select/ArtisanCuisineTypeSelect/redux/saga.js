import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getArtisanCuisineTypes } from '@shared/api/marketing';

function* getArtisanCuisineTypesRequest() {
  try {
    const data = yield call(getArtisanCuisineTypes);
    yield put(Creators.getArtisanCuisineTypesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getArtisanCuisineTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetArtisanCuisineTypesRequest() {
  yield takeLatest(Types.GET_ARTISAN_CUISINE_TYPES_REQUEST, getArtisanCuisineTypesRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetArtisanCuisineTypesRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
