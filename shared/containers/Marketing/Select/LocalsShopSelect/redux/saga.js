import { all, call, cancel, fork, put, take, takeLatest, takeEvery } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getArtisanShopDetailsByIdArray, getLocalsShopsByName } from '@shared/api/marketing';

function* getLocalsShopsRequest({ name }) {
  try {
    const data = yield call(getLocalsShopsByName, { name });
    yield put(Creators.getLocalsShopsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLocalsShopsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getLocalsShopDetailByIdRequest({ name }) {
  try {
    const data = yield call(getLocalsShopsByName, { name });
    yield put(Creators.getLocalsShopDetailByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLocalsShopDetailByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getLocalsShopDetailsByIdArrayRequest({ shopIds, onSuccess }) {
  try {
    const data = yield call(getArtisanShopDetailsByIdArray, { shopIds });
    if (onSuccess) {
      onSuccess(data);
    }
    yield put(Creators.getLocalsShopDetailsByIdArraySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getLocalsShopDetailsByIdArrayFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetLocalShopsRequest() {
  yield takeLatest(Types.GET_LOCALS_SHOPS_REQUEST, getLocalsShopsRequest);
}

function* watchGetLocalShopDetailByIdRequest() {
  yield takeLatest(Types.GET_LOCALS_SHOP_DETAIL_BY_ID_REQUEST, getLocalsShopDetailByIdRequest);
}

function* watchGetLocalsShopDetailsByIdArrayRequest() {
  yield takeEvery(Types.GET_LOCALS_SHOP_DETAILS_BY_ID_ARRAY_REQUEST, getLocalsShopDetailsByIdArrayRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetLocalShopsRequest),
      fork(watchGetLocalShopDetailByIdRequest),
      fork(watchGetLocalsShopDetailsByIdArrayRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
