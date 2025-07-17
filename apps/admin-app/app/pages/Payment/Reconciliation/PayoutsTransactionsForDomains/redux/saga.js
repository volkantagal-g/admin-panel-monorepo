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

import {
  getFoodPayoutDetailedReportsApi,
  getTipPayoutDetailedReportsApi,
  getLocalPayoutDetailedReportsApi,
  getWaterPayoutDetailedReportsApi,
  exportFoodPayoutDetailedReportsApi,
  exportTipPayoutDetailedReportsApi,
  exportLocalPayoutDetailedReportsApi,
  exportWaterPayoutDetailedReportsApi,
} from '@shared/api/payoutsForDomains';
import { exportExcel } from '@shared/utils/common';

import { Types, Creators } from './actions';
import {
  domainTabSelector,
  filterSelector,
  paginationSelector,
} from './selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { INIT_FILTERS, excelFileName } from '../constants';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';
import { columns } from '../components/Table/config';

export function* getPayoutDetailedReportsRequest() {
  try {
    const filters = (yield select(filterSelector.getFilter));
    const pagination = yield select(paginationSelector.getPagination);

    const domainApis = {
      Food: getFoodPayoutDetailedReportsApi,
      Tip: getTipPayoutDetailedReportsApi,
      Local: getLocalPayoutDetailedReportsApi,
      Water: getWaterPayoutDetailedReportsApi,
    };
    const params = {
      createdDateStart: filters.date && filters.date.length > 0 && filters.date[0].utc().toDate(),
      createdDateEnd: filters.date && filters.date.length > 0 && filters.date[1].utc().toDate(),
      activityId: filters.activityId,
      iban: filters.iban,
      payoutStatus: filters.payoutStatus,
      ...pagination,
    };

    const selectedDomain = yield select(domainTabSelector.getDomain);
    const selectedApi = domainApis[selectedDomain || 'Food'];
    const { data } = yield call(selectedApi, { ...removeEmptyFieldsFromParams(params) });
    yield put(Creators.getPayoutDetailedReportsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPayoutDetailedReportsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* handleSubmitFilters() {
  const currentPagination = yield select(paginationSelector.getPagination);
  yield put(
    Creators.setPagination({
      pageSize: currentPagination.pageSize,
      pageNumber: 1,
    }),
  );
}

function* handleSetPagination() {
  yield put(Creators.getPayoutDetailedReportsRequest());
}

export function* handleDomainTabChange() {
  // reset listed data when tab change
  yield put(Creators.getPayoutDetailedReportsSuccess({ data: {} }));
  yield put(
    Creators.submitFilters({
      filters: {
        date: INIT_FILTERS.date,
        activityId: INIT_FILTERS.activityId,
        iban: INIT_FILTERS.iban,
        payoutStatus: INIT_FILTERS.payoutStatus,
      },
    }),
  );
}

function* exportCsvRequest({ t }) {
  try {
    const filters = yield select(filterSelector.getFilter);

    const domainApis = {
      Food: exportFoodPayoutDetailedReportsApi,
      Tip: exportTipPayoutDetailedReportsApi,
      Local: exportLocalPayoutDetailedReportsApi,
      Water: exportWaterPayoutDetailedReportsApi,
    };
    const params = {
      createdDateStart: filters.date && filters.date.length > 0 && filters.date[0].utc().toDate(),
      createdDateEnd: filters.date && filters.date.length > 0 && filters.date[1].utc().toDate(),
      activityId: filters.activityId,
      iban: filters.iban,
      payoutStatus: filters.payoutStatus,
    };

    const selectedDomain = yield select(domainTabSelector.getDomain);
    const selectedApi = domainApis[selectedDomain || 'Food'];
    const { data } = yield call(selectedApi, { ...removeEmptyFieldsFromParams(params) });
    exportExcel(data?.data?.payoutDetailedReports, excelFileName, columns(t));
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

function* watchHandleSubmitFilters() {
  yield takeLatest(Types.SUBMIT_FILTERS, handleSubmitFilters);
}

function* watchGetPayoutDetailedReports() {
  yield takeLatest(
    Types.GET_PAYOUT_DETAILED_REPORTS_REQUEST,
    getPayoutDetailedReportsRequest,
  );
}

function* watchHandleDomainTab() {
  yield takeLatest(Types.HANDLE_DOMAIN_TAB, handleDomainTabChange);
}

function* watchSetPagination() {
  yield takeLatest(Types.SET_PAGINATION, handleSetPagination);
}

export default function* psayoutsTransactionsForDomainsPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchHandleSubmitFilters),
      fork(watchGetPayoutDetailedReports),
      fork(watchHandleDomainTab),
      fork(watchSetPagination),
      fork(watchExportCsvRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
