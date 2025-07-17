import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { cancelMarketBasket, getMarketBasketById } from '@shared/api/marketAdminPanel';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getMarketBasketRequest({ basketId }) {
  try {
    const basket = yield call(getMarketBasketById, { basketId });
    yield put(Creators.getMarketBasketSuccess({ data: basket }));
  }
  catch (error) {
    yield put(Creators.getMarketBasketFailure({ error }));
  }
}
function* cancelMarketBasketRequest({ basketId, onCancelSuccess }) {
  try {
    const response = yield call(cancelMarketBasket, { basketId });
    yield put(Creators.cancelMarketBasketSuccess({ data: response }));
    yield put(ToastCreators.success());
    if (onCancelSuccess) {
      onCancelSuccess();
    }
  }
  catch (error) {
    yield put(Creators.cancelMarketBasketFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMarketBasketRequest() {
  yield takeLatest(Types.GET_MARKET_BASKET_REQUEST, getMarketBasketRequest);
}
function* watchCancelMarketBasketRequest() {
  yield takeLatest(Types.CANCEL_MARKET_BASKET_REQUEST, cancelMarketBasketRequest);
}

export default function* marketBasketDetailPagePageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketBasketRequest),
      fork(watchCancelMarketBasketRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
