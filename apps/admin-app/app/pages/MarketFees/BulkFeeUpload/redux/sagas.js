import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLangKey } from '@shared/i18n';
import { bulkFeeUpdate } from '@shared/api/fee';
import { bulkUpdateBasketAmounts } from '@shared/api/basketConfig';

export function* marketFeesBulkUploadRequest({ fees, onSuccess }) {
  try {
    const data = yield call(bulkFeeUpdate, fees);
    yield put(ToastCreators.success());
    yield put(Creators.marketFeesBulkUploadSuccess({ data }));
    if (onSuccess) {
      onSuccess();
    }
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data', '');
    yield put(ToastCreators.error({ message: errorMessage?.[getLangKey()] || error }));
    yield put(Creators.marketFeesBulkUploadFailure({ error }));
  }
}

export function* basketAmountBulkUploadRequest({ basketAmounts, onSuccess }) {
  try {
    const data = yield call(bulkUpdateBasketAmounts, basketAmounts);
    yield put(ToastCreators.success());
    yield put(Creators.basketAmountBulkUploadSuccess({ data }));
    if (onSuccess) {
      onSuccess();
    }
  }
  catch (error) {
    const errorMessage = _.get(error, 'response.data', '');
    yield put(ToastCreators.error({ message: errorMessage?.[getLangKey()] || error }));
    yield put(Creators.basketAmountBulkUploadFailure({ error }));
  }
}

export function* watchmarketFeesBulkUploadRequest() {
  yield takeLatest(Types.MARKET_FEES_BULK_UPLOAD_REQUEST, marketFeesBulkUploadRequest);
}
export function* watchBasketAmountBulkUploadRequest() {
  yield takeLatest(Types.BASKET_AMOUNT_BULK_UPLOAD_REQUEST, basketAmountBulkUploadRequest);
}

export default function* bulkFeeUploadRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchmarketFeesBulkUploadRequest),
      fork(watchBasketAmountBulkUploadRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
