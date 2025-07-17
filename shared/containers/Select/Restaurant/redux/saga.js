import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getRestaurantsByName, getRestaurantById } from '@shared/api/foodRestaurant';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getRestaurantsByNameRequest({ searchString, includeDeletedRestaurants }) {
  try {
    const data = yield call(getRestaurantsByName, { name: searchString, includeDeletedRestaurants });
    yield put(Creators.getRestaurantsByNameSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRestaurantsByNameFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRestaurantsByNameRequest() {
  yield takeLatest(Types.GET_RESTAURANTS_BY_NAME_REQUEST, getRestaurantsByNameRequest);
}

function* getRestaurantByIdRequestSaga({ restaurantId }) {
  try {
    const { id, name } = yield call(getRestaurantById, { restaurantId });
    yield put(Creators.getRestaurantByIdSuccess({ data: [{ id, name }] }));
  }
  catch (error) {
    yield put(Creators.getRestaurantByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRestaurantByIdRequest() {
  yield takeLatest(Types.GET_RESTAURANT_BY_ID_REQUEST, getRestaurantByIdRequestSaga);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetRestaurantsByNameRequest),
      fork(watchGetRestaurantByIdRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
