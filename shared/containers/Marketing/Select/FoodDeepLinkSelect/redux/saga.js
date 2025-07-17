import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getFoodDeepLinkDetail, searchFoodDeepLink } from '@shared/api/marketing';

export function* getFoodDeepLinksRequest({ keyword }) {
  try {
    const data = yield call(searchFoodDeepLink, { keyword });
    yield put(Creators.getFoodDeepLinksSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFoodDeepLinksFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getFoodDeepLinkDetailRequest({ id }) {
  try {
    const data = yield call(getFoodDeepLinkDetail, { id });
    yield put(Creators.getFoodDeepLinkDetailSuccess({ data: { _id: id, title: data?.title } }));
  }
  catch (error) {
    yield put(Creators.getFoodDeepLinkDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFoodDeepLinksRequest() {
  yield takeLatest(Types.GET_FOOD_DEEP_LINKS_REQUEST, getFoodDeepLinksRequest);
}

function* watchGetFoodDeepLinkDetailRequest() {
  yield takeLatest(Types.GET_FOOD_DEEP_LINK_DETAIL_REQUEST, getFoodDeepLinkDetailRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetFoodDeepLinksRequest),
      fork(watchGetFoodDeepLinkDetailRequest),
    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
