import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getMarketProducts } from '@shared/api/marketing';
import { createMap } from '@shared/utils/common';

export function* getMarketProductsRequest({ filters }) {
  try {
    const data = yield call(getMarketProducts, { filters });
    yield put(Creators.getMarketProductsSuccess({ data }));
    yield put(Creators.setMarketProductsMap({ data: createMap(data) }));
  }
  catch (error) {
    yield put(Creators.getMarketProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMarketProductsRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCTS_REQUEST, getMarketProductsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetMarketProductsRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
