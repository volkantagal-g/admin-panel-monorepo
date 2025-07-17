import { all, call, fork, cancel, put, take, takeLatest, select } from 'redux-saga/effects';
import { pickBy } from 'lodash';

import { getTransactions, getTransactionDetail } from '@shared/api/payment';
import { getFilters, getPagination, getSortOptions } from './selectors';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getTransactionDetailCardRequest({ id }) {
  try {
    const { data } = yield call(getTransactionDetail, { id });
    yield put(Creators.getTransactionDetailCardSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTransactionDetailCardFailure({ error }));
  }
}

function* watchGetTransactionDetailCardRequest() {
  yield takeLatest(Types.GET_TRANSACTION_DETAIL_CARD_REQUEST, getTransactionDetailCardRequest);
}

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

    const axiosConfig = { timeout: 2000 };

    const data = yield call(getTransactions, ({ ...requestBody, axiosConfig }));
    yield put(Creators.getTransactionsSuccess({ data, totalCount: data.totalCount }));
  }
  catch (error) {
    yield put(Creators.getTransactionsFailure({ error }));

    if (!error?.message?.startsWith('timeout')) {
      yield put(ToastCreators.error({ error }));
    }
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

export default function* transactionEventDetailPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetTransactionDetailCardRequest),
      fork(watchGetTransactionsRequest),
      fork(watchSetPagination),
      fork(watchSetSortOptions),
      fork(watchSubmitFilters),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
