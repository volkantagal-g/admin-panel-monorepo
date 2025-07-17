import { all, call, cancel, fork, put, take, takeLatest, delay } from 'redux-saga/effects';

import { t } from '@shared/i18n';
import { getMealCardReconciliationSummary, getMealCardReconciliationDetail, exportExcel } from '@shared/api/foodMealCardReconciliation';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

const EXPORT_EXCEL_DEBOUNCE_TIME_MS = 60000;

function* getMealCardReconciliationRequest({
  startDateEpoch,
  endDateEpoch,
  currentPage,
  pageSize,
  reconciliationMode,
  orderId,
}) {
  try {
    const [summary, detail] = yield all([
      call(getMealCardReconciliationSummary, { startDateEpoch, endDateEpoch }),
      call(getMealCardReconciliationDetail, {
        startDateEpoch,
        endDateEpoch,
        currentPage,
        pageSize,
        reconciliationMode,
        orderId,
      }),
    ]);
    yield put(Creators.getMealCardReconciliationSuccess({ data: { summary, detail } }));
  }
  catch (error) {
    yield put(Creators.getMealCardReconciliationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMealCardReconciliationRequest() {
  yield takeLatest(Types.GET_MEAL_CARD_RECONCILIATION_REQUEST, getMealCardReconciliationRequest);
}

function* exportExcelRequest({
  startDateEpoch,
  endDateEpoch,
  currentPage,
  pageSize,
  reconciliationMode,
  orderId,
}) {
  try {
    const data = yield call(exportExcel, {
      startDateEpoch,
      endDateEpoch,
      currentPage,
      pageSize,
      reconciliationMode,
      orderId,
    });
    yield put(ToastCreators.success({ message: t('global:PREPARING_REPORT') }));
    yield delay(EXPORT_EXCEL_DEBOUNCE_TIME_MS);
    yield put(Creators.exportExcelSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.exportExcelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportExcelRequest() {
  yield takeLatest(Types.EXPORT_EXCEL_REQUEST, exportExcelRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMealCardReconciliationRequest),
      fork(watchExportExcelRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
