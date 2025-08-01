import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import history from '@shared/utils/history';
import { createMarketProduct } from '@shared/api/marketProduct';
import { Types, Creators } from 'pages/MarketProduct/containers/NewProductButton/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

export function* createMarketProductRequest({ body }) {
  try {
    const data = yield call(createMarketProduct, { body });
    yield put(ToastCreators.success());
    const marketProductId = _.get(data, '_id', '');
    const path = ROUTE.MARKET_PRODUCT_DETAIL.path.replace(':id', marketProductId);
    history.push(path);
    yield put(Creators.createMarketProductSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createMarketProductFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateMarketProductRequest() {
  yield takeLatest(Types.CREATE_MARKET_PRODUCT_REQUEST, createMarketProductRequest);
}

export default function* root() {
  while (yield take(Types.OPEN_MODAL)) {
    const backgroundTasks = yield all([
      fork(watchCreateMarketProductRequest),
    ]);

    yield take(Types.CREATE_MARKET_PRODUCT_SUCCESS);
    yield cancel(backgroundTasks);
    yield put(Creators.closeModal());
  }
}
