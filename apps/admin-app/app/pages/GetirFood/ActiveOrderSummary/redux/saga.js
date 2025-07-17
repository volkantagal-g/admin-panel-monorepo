import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { getFoodOrdersStatistics, getFoodRestaurantStatistics } from '@shared/api/foodActiveOrderSummary';
import {
  Types,
  Creators,
} from '@app/pages/GetirFood/ActiveOrderSummary/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getOrderSummaryRequest({ cityId }) {
  try {
    const data = yield call(getFoodOrdersStatistics, { cityId });
    yield put(Creators.getOrderSummarySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderSummaryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRestaurantSummaryRequest({ cityId }) {
  try {
    const data = yield call(getFoodRestaurantStatistics, { cityId });
    yield put(Creators.getRestaurantSummarySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRestaurantSummaryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetOrderSummaryRequest() {
  yield takeLatest(Types.GET_ORDER_SUMMARY_REQUEST, getOrderSummaryRequest);
}

function* watchGetRestaurantSummaryRequest() {
  yield takeLatest(Types.GET_ORDER_SUMMARY_REQUEST, getRestaurantSummaryRequest);
}

export default function* orderSummaryRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetOrderSummaryRequest),
      fork(watchGetRestaurantSummaryRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
