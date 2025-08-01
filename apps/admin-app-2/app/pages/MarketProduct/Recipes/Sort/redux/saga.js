import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getRecipeOrders, updateRecipeOrdersBulk } from '@shared/api/recipes';

function* updateRecipeOrderBulkRequest({ body, domainType, showInactives, countryCode }) {
  try {
    const data = yield call(updateRecipeOrdersBulk, { body, domainType });
    yield put(Creators.updateRecipeOrderBulkSuccess({ data }));
    yield getRecipeOrdersRequest({ domainType, showInactives, countryCode });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateRecipeOrderBulkFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getRecipeOrdersRequest({ domainType, showInactives, countryCode }) {
  try {
    const data = yield call(getRecipeOrders, { domainType, showInactives, countryCode });
    yield put(Creators.getRecipeOrdersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRecipeOrdersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateRecipeOrderBulkRequest() {
  yield takeLatest(Types.UPDATE_RECIPE_ORDER_BULK_REQUEST, updateRecipeOrderBulkRequest);
}
function* watchGetRecipeOrdersRequest() {
  yield takeLatest(Types.GET_RECIPE_ORDERS_REQUEST, getRecipeOrdersRequest);
}

export default function* marketProductCategorySortListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchUpdateRecipeOrderBulkRequest),
      fork(watchGetRecipeOrdersRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
