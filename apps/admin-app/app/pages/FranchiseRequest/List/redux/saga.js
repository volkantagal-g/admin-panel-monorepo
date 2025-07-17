import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import moment from 'moment';

import {
  getFranchiseRequestList as getFranchiseRequestListApi,
  getFranchiseRequestEnums as getFranchiseRequestEnumsApi,
  getFranchiseRequestListReport as getFranchiseRequestListReportApi,
} from '@shared/api/franchiseRequest';
import { getDynamicFormColumns as getDynamicFormColumnsApi } from '@shared/api/dynamicForm';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getFranchiseRequestListColumns({ formName, formType }) {
  try {
    const data = yield call(getDynamicFormColumnsApi, { formName, formType });
    yield put(Creators.getFranchiseRequestListColumnsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseRequestListFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* getFranchiseRequestList({ startDate, endDate, limit, offset }) {
  try {
    const { requests, totalCount } = yield call(getFranchiseRequestListApi, {
      startDate,
      endDate,
      limit,
      offset,
    });

    yield put(Creators.getFranchiseRequestListSuccess({ data: requests, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getFranchiseRequestListFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* franchiseRequestListRequest() {
  yield takeLatest(Types.GET_FRANCHISE_REQUEST_LIST_REQUEST, getFranchiseRequestList);
}

function* getFranchiseRequestListReport({ startDate, endDate }) {
  try {
    const url = yield call(getFranchiseRequestListReportApi, {
      startDate,
      endDate,
      utcOffset: moment().utcOffset(),
    });
    window.open(url);
    yield put(Creators.getFranchiseRequestListReportSuccess());
  }
  catch (error) {
    yield put(Creators.getFranchiseRequestListReportFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* franchiseRequestListReportRequest() {
  yield takeLatest(Types.GET_FRANCHISE_REQUEST_LIST_REPORT_REQUEST, getFranchiseRequestListReport);
}

function* getFranchiseRequestEnums({ countryCode }) {
  try {
    const data = yield call(getFranchiseRequestEnumsApi, { countryCode });
    yield put(Creators.getFranchiseRequestEnumsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseRequestEnumsFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* franchiseRequestEnumsRequest() {
  yield takeLatest(Types.GET_FRANCHISE_REQUEST_ENUMS_REQUEST, getFranchiseRequestEnums);
}

function* franchiseRequestListColumnsRequest() {
  yield takeLatest(Types.GET_FRANCHISE_REQUEST_LIST_COLUMNS_REQUEST, getFranchiseRequestListColumns);
}

export default function* franchiseRequestListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(franchiseRequestListColumnsRequest),
      fork(franchiseRequestListRequest),
      fork(franchiseRequestEnumsRequest),
      fork(franchiseRequestListReportRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
