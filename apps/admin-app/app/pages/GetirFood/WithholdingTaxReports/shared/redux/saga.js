import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  getWithholdingTaxReports,
  getWithholdingTaxReportsSummary,
  getWithholdingTaxReportsSummaryExcel,
  getWithholdingTaxReportsExcel,
  getWithholdingTaxReportsByFilterType,
} from '@shared/api/withholdingTaxReports';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { t } from '@shared/i18n';

export const createVerticalSaga = (Types, Creators, vertical) => {
  function* getWithholdingTaxReportsRequest({ companyType, period, page, size, partnerId }) {
    try {
      const { data } = yield call(getWithholdingTaxReports, { companyType, period, page, size, partnerId, vertical });
      yield put(Creators.getWithholdingTaxReportsSuccess({ data }));
    }
    catch (error) {
      yield put(Creators.getWithholdingTaxReportsFailure({ error }));
    }
  }

  function* getWithholdingTaxReportsSummaryRequest({ period }) {
    try {
      const { data } = yield call(getWithholdingTaxReportsSummary, { period, vertical });
      yield put(Creators.getWithholdingTaxReportsSummarySuccess({ data }));
    }
    catch (error) {
      yield put(Creators.getWithholdingTaxReportsSummaryFailure({ error }));
    }
  }

  function* exportWithholdingTaxReportsSummaryExcelRequest({ period }) {
    try {
      const { data } = yield call(getWithholdingTaxReportsSummaryExcel, { period, vertical });
      yield put(Creators.exportWithholdingTaxReportsSummaryExcelSuccess({ data }));
      yield put(ToastCreators.success({ message: t('global:PREPARING_REPORT') }));
    }
    catch (error) {
      yield put(Creators.exportWithholdingTaxReportsSummaryExcelFailure({ error }));
      yield put(ToastCreators.error({ error }));
    }
  }

  function* exportWithholdingTaxReportsExcelRequest({ partnerId, period }) {
    try {
      const { data } = yield call(getWithholdingTaxReportsExcel, { partnerId, period, vertical });
      yield put(Creators.exportWithholdingTaxReportsExcelSuccess({ data }));
      yield put(ToastCreators.success({ message: t('global:PREPARING_REPORT') }));
    }
    catch (error) {
      yield put(Creators.exportWithholdingTaxReportsExcelFailure({ error }));
      yield put(ToastCreators.error({ error }));
    }
  }

  function* exportWithholdingTaxReportsByFilterTypeRequest({ fileType, filterType, period }) {
    try {
      const { data } = yield call(getWithholdingTaxReportsByFilterType, { fileType, filterType, period, vertical });
      yield put(Creators.exportWithholdingTaxReportsByFilterTypeSuccess({ data }));
      yield put(ToastCreators.success({ message: t('global:PREPARING_REPORT') }));
    }
    catch (error) {
      yield put(Creators.exportWithholdingTaxReportsByFilterTypeFailure({ error }));
      yield put(ToastCreators.error({ error }));
    }
  }

  function* watchGetWithholdingTaxReportsRequest() {
    yield takeLatest(Types.GET_WITHHOLDING_TAX_REPORTS_REQUEST, getWithholdingTaxReportsRequest);
  }

  function* watchGetWithholdingTaxReportsSummaryRequest() {
    yield takeLatest(Types.GET_WITHHOLDING_TAX_REPORTS_SUMMARY_REQUEST, getWithholdingTaxReportsSummaryRequest);
  }

  function* watchExportWithholdingTaxReportsSummaryExcelRequest() {
    yield takeLatest(Types.EXPORT_WITHHOLDING_TAX_REPORTS_SUMMARY_EXCEL_REQUEST, exportWithholdingTaxReportsSummaryExcelRequest);
  }

  function* watchExportWithholdingTaxReportsExcelRequest() {
    yield takeLatest(Types.EXPORT_WITHHOLDING_TAX_REPORTS_EXCEL_REQUEST, exportWithholdingTaxReportsExcelRequest);
  }

  function* watchExportWithholdingTaxReportsByFilterTypeRequest() {
    yield takeLatest(Types.EXPORT_WITHHOLDING_TAX_REPORTS_BY_FILTER_TYPE_REQUEST, exportWithholdingTaxReportsByFilterTypeRequest);
  }

  return function* withholdingTaxReportsRoot() {
    while (yield take(Types.INIT_PAGE)) {
      const backgroundTasks = yield all([
        fork(watchGetWithholdingTaxReportsRequest),
        fork(watchGetWithholdingTaxReportsSummaryRequest),
        fork(watchExportWithholdingTaxReportsSummaryExcelRequest),
        fork(watchExportWithholdingTaxReportsExcelRequest),
        fork(watchExportWithholdingTaxReportsByFilterTypeRequest),
      ]);
      yield take(Types.DESTROY_PAGE);
      yield cancel(backgroundTasks);
    }
  };
};
