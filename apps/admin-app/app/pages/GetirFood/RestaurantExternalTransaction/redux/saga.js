import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';

import {
  createRestaurantExternalTransaction,
  validateBulkExternalTransactionExcel,
  importBulkExternalTransactionExcel,
  getS3SignedUrl,
  getExternalTransactionReport,
  getOrderFinancialsByOrderId,
  getDeferredPaymentDateOptionsByPartnerId,
} from '@shared/api/foodRestaurantExternalTransaction';
import { getRestaurantById } from '@shared/api/foodRestaurant';
import { uploadToS3SignedUrl } from '@shared/api/public';
import { t } from '@shared/i18n';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { extractErrorMessages, extractSingleTransactionErrorsMessages } from '../utils';
import { VerticalToNameMap } from '@app/pages/GetirFood/WithholdingTaxReports/shared/config';
import { VerticalType } from '@app/pages/GetirFood/WithholdingTaxReports/shared/constants';

const AUTO_CLOSE_DURATION_MS = 5000;

function* createExternalTransactionRequest({ params }) {
  try {
    yield call(createRestaurantExternalTransaction, { params });
    yield put(Creators.createExternalTransactionSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createExternalTransactionFailure({ error }));
    const errorMessages = error?.response?.data?.errors;
    if (errorMessages) {
      const message = extractSingleTransactionErrorsMessages(errorMessages);
      yield put(ToastCreators.error({ message, toastOptions: { autoClose: AUTO_CLOSE_DURATION_MS } }));
    }
    else {
      yield put(ToastCreators.error({ error, message: error.response.data.message }));
    }
  }
}

function* watchCreateExternalTransactionRequest() {
  yield takeLatest(Types.CREATE_EXTERNAL_TRANSACTION_REQUEST, createExternalTransactionRequest);
}

function* validateBulkExternalTransactionExcelRequest({ file, manualType, onSuccess }) {
  try {
    const fileName = `${uuidv4()}_${file.name}`;
    const { signedUrl } = yield call(getS3SignedUrl, { fileName });
    yield call(uploadToS3SignedUrl, { signedUrl, data: file.base64File });
    const data = yield call(validateBulkExternalTransactionExcel, { fileName, manualType });
    yield put(Creators.validateBulkExternalTransactionExcelSuccess());
    onSuccess({ fileName, amount: data.totalAmount, restaurantCount: data.shopCount });
  }
  catch (error) {
    yield put(Creators.validateBulkExternalTransactionExcelFailure({ error }));
    const errorMessages = error?.response?.data?.errorMessages;
    if (errorMessages) {
      const message = extractErrorMessages(errorMessages);
      yield put(ToastCreators.error({ message, toastOptions: { autoClose: AUTO_CLOSE_DURATION_MS } }));
    }
    else {
      yield put(ToastCreators.error({ error, message: error.response.data.message }));
    }
  }
}

function* watchValidateBulkExternalTransactionExcelRequest() {
  yield takeLatest(Types.VALIDATE_BULK_EXTERNAL_TRANSACTION_EXCEL_REQUEST, validateBulkExternalTransactionExcelRequest);
}

function* importBulkExternalTransactionExcelRequest({ fileName, manualType, selectedDeferredPaymentDateOption }) {
  try {
    yield call(importBulkExternalTransactionExcel, { fileName, manualType, selectedDeferredPaymentDateOption });
    yield put(Creators.importBulkExternalTransactionExcelSuccess());
    yield put(ToastCreators.success({
      message: t('foodRestaurantExternalTransaction:BULK_TRANSACTION.SUCCESS_MESSAGE'),
      toastOptions: { autoClose: AUTO_CLOSE_DURATION_MS },
    }));
  }
  catch (error) {
    yield put(Creators.importBulkExternalTransactionExcelFailure({ error }));
    yield put(ToastCreators.error({ error, message: error.response.data.message }));
  }
}

function* watchImportBulkExternalTransactionExcelRequest() {
  yield takeLatest(Types.IMPORT_BULK_EXTERNAL_TRANSACTION_EXCEL_REQUEST, importBulkExternalTransactionExcelRequest);
}

function* getExternalTransactionReportRequest({ params }) {
  try {
    yield call(getExternalTransactionReport, { params });
    yield put(Creators.getExternalTransactionReportSuccess());
    yield put(ToastCreators.success({ message: t('global:PREPARING_REPORT') }));
  }
  catch (error) {
    yield put(Creators.getExternalTransactionReportFailure({ error }));
    yield put(ToastCreators.error({ error, message: error.response.data.message }));
  }
}

function* watchGetExternalTransactionReportRequest() {
  yield takeLatest(Types.GET_EXTERNAL_TRANSACTION_REPORT_REQUEST, getExternalTransactionReportRequest);
}

function* getOrderFinancialsByOrderIdRequest({ orderId }) {
  try {
    const data = yield call(getOrderFinancialsByOrderId, { orderId });
    yield put(Creators.getOrderFinancialsByOrderIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getOrderFinancialsByOrderIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchOrderFinancialsByOrderId() {
  yield takeLatest(Types.GET_ORDER_FINANCIALS_BY_ORDER_ID_REQUEST, getOrderFinancialsByOrderIdRequest);
}

function* getRestaurantByIdRequestSaga({ restaurantId }) {
  try {
    const data = yield call(getRestaurantById, { restaurantId });
    yield put(Creators.getRestaurantByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getRestaurantByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetRestaurantByIdRequest() {
  yield takeLatest(Types.GET_RESTAURANT_BY_ID_REQUEST, getRestaurantByIdRequestSaga);
}

function* getDeferredPaymentDateOptionsRequest({ partnerId }) {
  try {
    const data = yield call(getDeferredPaymentDateOptionsByPartnerId, { partnerId, vertical: VerticalToNameMap[VerticalType.Food] });
    yield put(Creators.getDeferredPaymentDateOptionsSuccess({ data: data?.possibleDeferredPaymentDates }));
  }
  catch (error) {
    yield put(Creators.getDeferredPaymentDateOptionsFailure({ error }));
  }
}

function* watchGetDeferredPaymentDateOptionsRequest() {
  yield takeLatest(Types.GET_DEFERRED_PAYMENT_DATE_OPTIONS_REQUEST, getDeferredPaymentDateOptionsRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateExternalTransactionRequest),
      fork(watchValidateBulkExternalTransactionExcelRequest),
      fork(watchImportBulkExternalTransactionExcelRequest),
      fork(watchGetExternalTransactionReportRequest),
      fork(watchOrderFinancialsByOrderId),
      fork(watchGetRestaurantByIdRequest),
      fork(watchGetDeferredPaymentDateOptionsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
