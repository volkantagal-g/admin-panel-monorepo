import {
  all,
  call,
  cancel,
  debounce,
  fork,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  getReturns,
  getReturnDetail,
  getReturnStatusesReq,
  postReturnRespond,
} from '@shared/api/returns';
import { getShopsByName } from '@shared/api/artisanOrderActive';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { filtersSelector } from './selectors';

function* getReturnRequest() {
  try {
    const { page, ...body } = yield select(filtersSelector.getFilters);
    const params = { page: page - 1 };
    const res = yield call(getReturns, { params, body });
    yield put(Creators.getReturnRequestSuccess({ data: res }));
  }
  catch (error) {
    yield put(Creators.getReturnRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* returnDetailRequest({ returnId }) {
  try {
    const returnDetail = yield call(getReturnDetail, { returnId });
    yield put(
      Creators.getReturnDetailRequestSuccess({ data: { ...returnDetail } }),
    );
  }
  catch (error) {
    yield put(Creators.getReturnDetailRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* returnRespondRequest({
  returnId,
  respondType,
  successCallback,
  failCallback,
}) {
  try {
    const respond = yield call(postReturnRespond, { params: { returnId, respondType } });
    yield put(
      Creators.postReturnRespondRequestSuccess({ data: { ...respond } }),
    );
    yield put(ToastCreators.success());
    successCallback();
  }
  catch (error) {
    yield put(Creators.postReturnRespondRequestFailure({ error }));
    yield put(ToastCreators.error({ error }));
    failCallback();
  }
}

function* getReturnStatuses({ onSuccess }) {
  try {
    const data = yield call(getReturnStatusesReq);
    onSuccess?.(data);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* searchShops({ keyword, onSuccess, onFinished }) {
  try {
    const result = yield call(getShopsByName, { name: keyword });
    onSuccess?.(result);
  }
  finally {
    onFinished?.();
  }
}

function* watchGetReturnStatuses() {
  yield takeLatest(Types.GET_RETURN_STATUSES_REQUEST, getReturnStatuses);
}

function* watchReturnRespondRequest() {
  yield takeLatest(Types.POST_RETURN_RESPOND_REQUEST, returnRespondRequest);
}

function* watchReturnDetailRequest() {
  yield takeLatest(Types.GET_RETURN_DETAIL_REQUEST, returnDetailRequest);
}

function* watchReturnRequest() {
  yield takeLatest(Types.GET_RETURN_REQUEST, getReturnRequest);
}

function* watchSearchShops() {
  yield debounce(300, Types.SEARCH_SHOPS, searchShops);
}

export default function* returnRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchReturnRequest),
      fork(watchReturnDetailRequest),
      fork(watchReturnRespondRequest),
      fork(watchGetReturnStatuses),
      fork(watchSearchShops),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
