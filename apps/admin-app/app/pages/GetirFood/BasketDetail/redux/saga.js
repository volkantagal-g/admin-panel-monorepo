import { all, call, delay, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getBasketOrderDetail } from '@shared/api/foodBasket';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from '@app/pages/GetirFood/BasketDetail/redux/actions';
import { getUserById } from '@shared/api/user';

const REFRESH_INTERVAL = 15 * 1000;

export function* refreshGetOrderDetail({ basketOrderId }) {
  try {
    const data = yield call(getBasketOrderDetail, { basketOrderId });
    yield put(Creators.getOrderDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderDetailFailure({ error }));
  }
}

export function* getOrderDetailRequest({ basketOrderId }) {
  while (true) {
    yield call(refreshGetOrderDetail, { basketOrderId });
    yield delay(REFRESH_INTERVAL);
  }
}

export function* watchGetOrderDetailRequest() {
  yield takeLatest(Types.GET_ORDER_DETAIL_REQUEST, getOrderDetailRequest);
}

export function* getUserByIdRequest({ id }) {
  try {
    const data = yield call(getUserById, { id });
    yield put(Creators.getUserByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getUserByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetUserByIdRequest() {
  yield takeLatest(Types.GET_USER_BY_ID_REQUEST, getUserByIdRequest);
}

export default function* orderDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const watchOrderRequest = fork(watchGetOrderDetailRequest);
    const backgroundTasks = yield all([
      watchOrderRequest,
      fork(watchGetUserByIdRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
