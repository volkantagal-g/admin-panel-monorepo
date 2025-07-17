import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getLocalsMerchantByName, getShopById } from '@shared/api/artisanShop';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getLocalsMerchantByNameRequest({ searchString }) {
  try {
    const data = yield call(getLocalsMerchantByName, searchString);
    yield put(Creators.getLocalsMerchantByNameSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLocalsMerchantByNameFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetLocalsMerchantByNameRequest() {
  yield takeLatest(Types.GET_LOCALS_MERCHANT_BY_NAME_REQUEST, getLocalsMerchantByNameRequest);
}

function* getShopByIdRequestSaga({ shopId }) {
  try {
    const { id, name } = yield call(getShopById, { shopId });
    yield put(Creators.getShopByIdSuccess({ data: [{ id, name }] }));
  }
  catch (error) {
    yield put(Creators.getShopByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetShopByIdRequest() {
  yield takeLatest(Types.GET_SHOP_BY_ID_REQUEST, getShopByIdRequestSaga);
}

export default function* pushNotificationRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetLocalsMerchantByNameRequest),
      fork(watchGetShopByIdRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
