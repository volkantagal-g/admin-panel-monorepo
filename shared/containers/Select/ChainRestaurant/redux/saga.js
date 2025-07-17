import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { searchChainRestaurants } from '@shared/api/foodRestaurant';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getChainRestaurantsByNameRequest({ searchString }) {
  try {
    const data = yield call(searchChainRestaurants, { searchString });
    yield put(Creators.getChainRestaurantsByNameSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getChainRestaurantsByNameFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetChainRestaurantsByNameRequest() {
  yield takeLatest(Types.GET_CHAIN_RESTAURANTS_BY_NAME_REQUEST, getChainRestaurantsByNameRequest);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetChainRestaurantsByNameRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
