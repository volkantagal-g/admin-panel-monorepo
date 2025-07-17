import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getRestaurantsByName } from '@shared/api/marketing';

export function* getRestaurantsRequest({ searchString }) {
  try {
    const data = yield call(getRestaurantsByName, searchString);
    yield put(Creators.getRestaurantsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRestaurantsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRestaurantsRequest() {
  yield takeLatest(Types.GET_RESTAURANTS_REQUEST, getRestaurantsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetRestaurantsRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
