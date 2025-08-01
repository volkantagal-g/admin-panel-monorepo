import { all, call, fork, cancel, put, take, takeLatest, select } from 'redux-saga/effects';
import { pickBy } from 'lodash';

import { Types, Creators } from './actions';
import { getMerchants, getTransactions } from '@shared/api/payment';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getFilters, getPagination, getSortOptions } from './selectors';

function* getTransactionsRequest() {
  const filters = yield select(getFilters);
  const pagination = yield select(getPagination);
  const sort = yield select(getSortOptions);
  try {
    const {
      createdAt, merchantReference, transactionId, merchantId, eventId, shopperId,
      merchantKey, merchantIdByName, paymentProvider, paymentMethod, status, mixed, merchantOrderId,
      pspReference, deviceType,
    } = filters;
    const { currentPage, rowsPerPage } = pagination;
    const filterBody = {
      transactionId,
      merchantReference,
      merchantId: merchantId || merchantIdByName,
      paymentProvider,
      paymentMethod,
      status,
      mixed,
      merchantKey,
      eventId,
      shopperId,
      merchantOrderId,
      pspReference,
      deviceType,
      ...(createdAt && { startCreatedAt: createdAt[0] }),
      ...(createdAt && { endCreatedAt: createdAt[1] }),
    };
    const cleanFilter = pickBy(filterBody, value => {
      return value !== '';
    });
    const requestBody = {
      pageNumber: currentPage,
      pageSize: rowsPerPage,
      sort,
      filter: cleanFilter,
    };

    const data = yield call(getTransactions, ({ ...requestBody }));
    yield put(Creators.getTransactionsSuccess({ data, totalCount: data.totalCount }));
  }
  catch (error) {
    yield put(Creators.getTransactionsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* handleSetPagination() {
  yield put(Creators.getTransactionsRequest());
}

function* handleSetSortOptions() {
  yield put(Creators.getTransactionsRequest());
}

function* handleSubmitFilters() {
  const currentPagination = yield select(getPagination);
  yield put(Creators.setPagination({ ...currentPagination, currentPage: 1 }));
}

function* watchGetTransactionsRequest() {
  yield takeLatest(Types.GET_TRANSACTIONS_REQUEST, getTransactionsRequest);
}

function* watchSetPagination() {
  yield takeLatest(Types.SET_PAGINATION, handleSetPagination);
}

function* watchSetSortOptions() {
  yield takeLatest(Types.SET_SORT_OPTIONS, handleSetSortOptions);
}

function* watchSubmitFilters() {
  yield takeLatest(Types.SUBMIT_FILTERS, handleSubmitFilters);
}

function* getMerchantListRequest() {
  try {
    const data = yield call(getMerchants);
    yield put(Creators.getMerchantListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMerchantListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMerchantListRequest() {
  yield takeLatest(Types.GET_MERCHANT_LIST_REQUEST, getMerchantListRequest);
}

export default function* listPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTransactionsRequest),
      fork(watchSetPagination),
      fork(watchSetSortOptions),
      fork(watchSubmitFilters),
      fork(watchGetMerchantListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
