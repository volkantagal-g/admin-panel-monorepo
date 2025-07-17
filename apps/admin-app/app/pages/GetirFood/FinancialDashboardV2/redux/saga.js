import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { t } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import {
  getFinancialDashboardPayoutDetail,
  getFinancialDashboardBankBalances,
  getPaymentDetailsSummary,
  exportFailedPaybacksToExcel,
} from '@shared/api/foodFinancialDashboardV2';
import { paymentDetailsSummarySelector } from './selectors';
import { getPaymentDetailsSummaryAPIPayload } from '../utils';

function* getDailyFinancialDashboardRequest({ payoutDate }) {
  try {
    const data = yield call(getFinancialDashboardPayoutDetail, { payoutDate });
    yield put(Creators.getFinancialDashboardPayoutDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFinancialDashboardPayoutDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDailyFinancialDashboardRequest() {
  yield takeLatest(Types.GET_FINANCIAL_DASHBOARD_PAYOUT_DETAIL_REQUEST, getDailyFinancialDashboardRequest);
}

function* getBankBalancesRequest() {
  try {
    const data = yield call(getFinancialDashboardBankBalances);

    yield put(Creators.getFinancialDashboardBankBalancesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFinancialDashboardBankBalancesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetBankBalancesRequest() {
  yield takeLatest(Types.GET_FINANCIAL_DASHBOARD_BANK_BALANCES_REQUEST, getBankBalancesRequest);
}

function* getPaymentDetailsSummaryRequest() {
  try {
    const paymentDetailsSummaryFilters = yield select(paymentDetailsSummarySelector.getPaymentDetailsSummaryFilters);
    const { data } = yield call(getPaymentDetailsSummary, getPaymentDetailsSummaryAPIPayload(paymentDetailsSummaryFilters));

    yield put(Creators.getPaymentDetailsSummarySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPaymentDetailsSummaryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPaymentDetailsSummaryRequest() {
  yield takeLatest(Types.GET_PAYMENT_DETAILS_SUMMARY_REQUEST, getPaymentDetailsSummaryRequest);
}

function* exportFailedPaybacksToExcelRequest({ reportDate }) {
  try {
    const data = yield call(exportFailedPaybacksToExcel, { reportDate });
    yield put(ToastCreators.success({ message: t('global:PREPARING_REPORT') }));
    yield put(Creators.exportFailedPaybacksToExcelSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.exportFailedPaybacksToExcelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportFailedPaybacksToExcelRequest() {
  yield takeLatest(Types.EXPORT_FAILED_PAYBACKS_TO_EXCEL_REQUEST, exportFailedPaybacksToExcelRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDailyFinancialDashboardRequest),
      fork(watchGetBankBalancesRequest),
      fork(watchGetPaymentDetailsSummaryRequest),
      fork(watchExportFailedPaybacksToExcelRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
