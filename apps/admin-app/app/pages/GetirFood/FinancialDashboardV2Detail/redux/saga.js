import {
  all,
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { t } from '@shared/i18n';
import history from '@shared/utils/history';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { getPaymentDetails, exportPaymentDetailExcel } from '@shared/api/foodFinancialDashboardV2';
import { paymentDetailsSelector } from './selectors';
import { TAB_ITEMS } from '../constants';
import { getPaymentDetailsAPIPayload } from '../utils';

function* getPaymentDetailsRequest(params) {
  const searchParams = new URLSearchParams(window.location.search);

  try {
    const { data } = yield call(getPaymentDetails, getPaymentDetailsAPIPayload(params));

    const isFirstRequestCompleted = yield select(paymentDetailsSelector.getIsFirstRequestCompleted);

    if (!isFirstRequestCompleted && data.chainRestaurantTotalCount > 0) {
      searchParams.set('activeTab', TAB_ITEMS.CHAIN);
    }

    yield put(Creators.getPaymentDetailsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPaymentDetailsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
  finally {
    yield call(history.replace, { search: searchParams.toString() });
  }
}

function* watchGetPaymentDetailsRequest() {
  yield takeLatest(
    Types.GET_PAYMENT_DETAILS_REQUEST,
    getPaymentDetailsRequest,
  );
}

function* exportPaymentDetailExcelRequest({ deferredPaymentDate, isChain, id }) {
  try {
    const data = yield call(exportPaymentDetailExcel, { deferredPaymentDate, isChain, id });
    yield put(ToastCreators.success({ message: t('global:PREPARING_REPORT') }));
    yield put(Creators.exportPaymentDetailExcelSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.exporPaymentDetailtExcelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportPaymentDetailExcelRequest() {
  yield takeLatest(Types.EXPORT_PAYMENT_DETAIL_EXCEL_REQUEST, exportPaymentDetailExcelRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPaymentDetailsRequest),
      fork(watchExportPaymentDetailExcelRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
