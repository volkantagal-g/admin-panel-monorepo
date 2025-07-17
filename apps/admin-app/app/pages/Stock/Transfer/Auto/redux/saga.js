import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getAutoStockTransfers, getMarketProductMasterCategoriesOld } from '@shared/api/stock';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getStockTransferAutoRequest({ data }) {
  try {
    const response = yield call(getAutoStockTransfers, { data });
    yield put(Creators.getStockTransferAutoSuccess({ data: response }));
    yield put(ToastCreators.success({ message: response.success }));
  }
  catch (error) {
    yield put(Creators.getStockTransferAutoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* getMarketProductMasterCategoriesOldRequest({ isSubCategory, limit, offset }) {
  try {
    const data = yield call(getMarketProductMasterCategoriesOld, { isSubCategory, limit, offset });
    yield put(Creators.getMarketProductMasterCategoriesOldSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductMasterCategoriesOldFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchStockTransferAutoRequest() {
  yield takeLatest(Types.GET_STOCK_TRANSFER_AUTO_REQUEST, getStockTransferAutoRequest);
}

export function* watchGetMarketProductMasterCategoriesOldRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_REQUEST, getMarketProductMasterCategoriesOldRequest);
}

export default function* StockTransferAutoRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchStockTransferAutoRequest),
      fork(watchGetMarketProductMasterCategoriesOldRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
