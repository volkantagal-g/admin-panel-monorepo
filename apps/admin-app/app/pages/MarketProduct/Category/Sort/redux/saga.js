import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { getCategoryOrders, updateCategoryOrderBulk } from '@shared/api/marketProductCategory';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* updateCategoryOrderBulkRequest({ body, domainType }) {
  try {
    const data = yield call(updateCategoryOrderBulk, { body, domainType });
    yield put(Creators.updateCategoryOrderBulkSuccess({ data }));
    yield getCategoryOrdersRequest({ domainType });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateCategoryOrderBulkFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getCategoryOrdersRequest({ domainType, showInactives, isListable }) {
  try {
    const data = yield call(getCategoryOrders, { domainType, showInactives, isListable });
    yield put(Creators.getCategoryOrdersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getCategoryOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateCategoryOrderBulkRequest() {
  yield takeLatest(Types.UPDATE_CATEGORY_ORDER_BULK_REQUEST, updateCategoryOrderBulkRequest);
}
function* watchGetCategoryOrdersRequest() {
  yield takeLatest(Types.GET_CATEGORY_ORDERS_REQUEST, getCategoryOrdersRequest);
}

export default function* marketProductCategorySortListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUpdateCategoryOrderBulkRequest),
      fork(watchGetCategoryOrdersRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
