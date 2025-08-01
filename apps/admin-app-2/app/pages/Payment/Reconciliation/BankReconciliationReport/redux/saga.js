import { call, put, takeLatest, take, all, fork, cancel, select } from 'redux-saga/effects';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { exportExcel } from '@shared/utils/common';
import { handleTranslateData, handleTranslateDriveData } from '../utils';
import {
  getReconciliations,
  getReconciliationsExport,
  getTransactionReconciliations,
  refundsTransactionV2,
  getDriveExport,
  manualRefund,
} from '@shared/api/reconciliation';
import { excelColumns, excelFileName } from '../components/OrderTab/components/Table/config';
import { excelColumns as driveExcelColumns, excelFileName as driveExcelFileName } from '../components/TransactionTab/components/Table/config';
import { getOrderFilters, getOrderPagination, getTransactionFilters, getTransactionPagination } from './selectors';
import { t as i18t } from '@shared/i18n';

function* getReconciliationsRequest() {
  const filters = yield select(getOrderFilters);
  const pagination = yield select(getOrderPagination.pagination);

  try {
    const data = yield call(getReconciliations, { ...filters, ...pagination });
    yield put(Creators.setSelectedRows({ selectedRows: [] })); // reset checkboxes
    yield put(Creators.getReconciliationsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReconciliationsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetReconciliationsRequest() {
  yield takeLatest(Types.GET_RECONCILIATIONS_REQUEST, getReconciliationsRequest);
}

function* refundsTransactionRequest({ orderIds, basketIds }) {
  try {
    const data = yield call(refundsTransactionV2, { orderIds, basketIds });
    yield put(Creators.refundsTransactionSuccess({ data })); // refund request
    yield put(Creators.getReconciliationsRequest()); // refetch reconciliation data
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.refundsTransactionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchRefundsTransactionRequest() {
  yield takeLatest(Types.REFUNDS_TRANSACTION_REQUEST, refundsTransactionRequest);
}

function* manualRefundRequest({ eventDetailsToSend }) {
  try {
    const results = yield all(
      eventDetailsToSend.map(eventDetail => call(function* callManualRefundApi() {
        try {
          const data = yield call(manualRefund, { eventDetail });
          return { success: true, data };
        }
        catch (error) {
          return { success: false, error };
        }
      })),
    );

    const allSucceeded = results.every(r => r.success);
    const anySucceeded = results.some(r => r.success);

    if (allSucceeded) {
      yield put(Creators.manualRefundSuccess({ data: results.map(r => r.data) }));
      yield put(Creators.getReconciliationsRequest());
      yield put(ToastCreators.success());
    }
    else if (anySucceeded) {
      yield put(Creators.manualRefundSuccess({ data: results.filter(r => r.success).map(r => r.data) }));
      yield put(Creators.getReconciliationsRequest());
      yield put(ToastCreators.error({ error: i18t('bankReconciliationReportPage:MANUAL_REFUND_ERROR_SOME') }));
    }
    else {
      yield put(Creators.manualRefundFailure({ error: results.map(r => r.error) }));
      yield put(ToastCreators.error({ error: i18t('bankReconciliationReportPage:MANUAL_REFUND_ERROR_ALL') }));
    }
  }
  catch (error) {
    yield put(Creators.manualRefundFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchManualRefundRequest() {
  yield takeLatest(Types.MANUAL_REFUND_REQUEST, manualRefundRequest);
}

function* exportCsvRequest({
  orderIds,
  transactionIds,
  checkoutStartDate,
  checkoutEndDate,
  reconciliationCheckStartDate,
  reconciliationCheckEndDate,
  domainTypes,
  sourceOfStatements,
  externalPaymentTokens,
  isRefundable,
  refundStatus,
  orderStatus,
  basketIds,
  t,
}) {
  try {
    const data = yield call(getReconciliationsExport, {
      orderIds,
      transactionIds,
      checkoutStartDate,
      checkoutEndDate,
      reconciliationCheckStartDate,
      reconciliationCheckEndDate,
      domainTypes,
      sourceOfStatements,
      externalPaymentTokens,
      isRefundable,
      refundStatus,
      orderStatus,
      basketIds,
    });
    const translatedData = handleTranslateData(data?.reconciliations, t);
    exportExcel(translatedData, excelFileName, excelColumns(t));
    yield put(Creators.exportCsvSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportCsvFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportCsvRequest() {
  yield takeLatest(Types.EXPORT_CSV_REQUEST, exportCsvRequest);
}

function* getTransactionReconciliationsRequest() {
  const filters = yield select(getTransactionFilters);
  const pagination = yield select(getTransactionPagination.pagination);
  try {
    const data = yield call(getTransactionReconciliations, { ...filters, ...pagination });
    yield put(Creators.getTransactionReconciliationsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTransactionReconciliationsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetTransactionReconciliationsRequest() {
  yield takeLatest(Types.GET_TRANSACTION_RECONCILIATIONS_REQUEST, getTransactionReconciliationsRequest);
}

function* handleSubmitOrderFilters() {
  const currentPagination = yield select(getOrderPagination.pagination);
  yield put(Creators.setOrderPagination({ ...currentPagination, page: 1 }));
}

function* watchSubmitOrderFilters() {
  yield takeLatest(Types.SUBMIT_ORDER_FILTERS, handleSubmitOrderFilters);
}

function* handleSetOrderPagination() {
  yield put(Creators.getReconciliationsRequest());
}

function* watchSetOrderPagination() {
  yield takeLatest(Types.SET_ORDER_PAGINATION, handleSetOrderPagination);
}

function* driveExportCsvRequest({
  rentId,
  originalTransactionId,
  checkStartDate,
  checkEndDate,
  transactionStartDate,
  transactionEndDate,
  isReconciled,
  t,
}) {
  try {
    const data = yield call(getDriveExport, {
      rentId,
      originalTransactionId,
      checkStartDate,
      checkEndDate,
      transactionStartDate,
      transactionEndDate,
      isReconciled,
    });
    const translatedData = handleTranslateDriveData(data?.data, t);
    exportExcel(translatedData, driveExcelFileName, driveExcelColumns(t));
    yield put(Creators.driveExportCsvSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.driveExportCsvFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDriveExportCsvRequest() {
  yield takeLatest(Types.DRIVE_EXPORT_CSV_REQUEST, driveExportCsvRequest);
}

function* handleSubmitTransactionFilters() {
  const currentPagination = yield select(getTransactionPagination.pagination);
  yield put(Creators.setTransactionPagination({ ...currentPagination, page: 1 }));
}

function* watchSubmitTransactionFilters() {
  yield takeLatest(Types.SUBMIT_TRANSACTION_FILTERS, handleSubmitTransactionFilters);
}

function* handleSetTransactionPagination() {
  yield put(Creators.getTransactionReconciliationsRequest());
}

function* watchSetTransactionPagination() {
  yield takeLatest(Types.SET_TRANSACTION_PAGINATION, handleSetTransactionPagination);
}

export default function* bankReconciliationReportRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetReconciliationsRequest),
      fork(watchRefundsTransactionRequest),
      fork(watchManualRefundRequest),
      fork(watchExportCsvRequest),
      fork(watchGetTransactionReconciliationsRequest),
      fork(watchDriveExportCsvRequest),
      fork(watchSubmitOrderFilters),
      fork(watchSetOrderPagination),
      fork(watchSetTransactionPagination),
      fork(watchSubmitTransactionFilters),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
