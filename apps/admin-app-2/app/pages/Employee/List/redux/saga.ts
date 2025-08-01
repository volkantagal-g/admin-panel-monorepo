import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import { ACTIVE_GETIRIANS_TAB, NON_ACTIVE_GETIRIANS_TAB } from '@app/pages/Employee/List/constants';
import {
  getFilteredActiveEmployees as getFilteredActiveEmployeesAPI,
  getFilteredNoNActiveEmployees as getFilteredNoNActiveEmployeesAPI,
  getEmployeesExcelDownload as getEmployeesExcelDownloadAPI,
  getFormerEmployeesExcelDownload as getFormerEmployeesExcelDownloadAPI,
  getEmployeesLimitedExcelDownload as getEmployeesLimitedExcelDownloadAPI,
  getFormerEmployeesLimitedExcelDownload as getFormerEmployeesLimitedExcelDownloadAPI,
  getEmployeesEducationsExcelDownload as getEmployeesEducationsExcelDownloadAPI,
  getFormerEmployeesEducationsExcelDownload as getFormerEmployeesEducationsExcelDownloadAPI,
} from '@shared/api/employee';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLimitAndOffset } from '@shared/utils/common';
import { IFilters } from '../types';
import { IEmployee } from '../../types';
import { Types, Creators } from './actions';
import { filterSelector } from './selectors';

const getFiltersObject = (filters: IFilters) => ({
  ...(filters.searchTerm && filters.searchTerm.length >= 1 && { searchTerm: filters.searchTerm }),
  ...(filters.department && { departmentIds: [filters.department] }),
  ...(filters.subDepartments?.firstLevelSub && { subDepartments: filters.subDepartments }),
  ...(filters.lineManager && { lineManagerIds: [filters.lineManager] }),
  ...(filters.businessCountry && { businessCountryCode: filters.businessCountry }),
  ...(filters.businessUnit && { businessUnitIds: [filters.businessUnit] }),
  ...(filters.mainWorkLocation && { locationIds: [filters.mainWorkLocation] }),
  ...(filters.positionLevel && { positionLevels: [filters.positionLevel] }),
  ...(filters.pagination && { ...getLimitAndOffset(filters.pagination) }),
});

function* filteredEmployeesCommon(): Generator {
  const filters = (yield select(filterSelector.getFilters)) as IFilters;

  if (filters?.activeTabKey === ACTIVE_GETIRIANS_TAB) {
    yield put(Creators.getFilteredActiveEmployeesRequest({}));
  }
  else if (filters?.activeTabKey === NON_ACTIVE_GETIRIANS_TAB) {
    yield put(Creators.getFilteredNoNActiveEmployeesRequest({}));
  }
}

function* getFilteredActiveEmployees(): Generator {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const filters = (yield select(filterSelector.getFilters)) as unknown as IFilters;
    const filtersObj = getFiltersObject(filters);
    const {
      employees,
      totalCount,
    } = (yield call(getFilteredActiveEmployeesAPI, { cancelSource, ...filtersObj })) as { employees: IEmployee[], totalCount: number };
    yield put(Creators.getFilteredActiveEmployeesSuccess({ data: employees, totalCount }));
  }
  catch (error) {
    yield put(Creators.getFilteredActiveEmployeesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getFilteredNoNActiveEmployees() {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const filters = (yield select(filterSelector.getFilters)) as unknown as IFilters;
    const filtersObj = getFiltersObject(filters);
    const {
      employees,
      totalCount,
    } = (yield call(getFilteredNoNActiveEmployeesAPI, { cancelSource, ...filtersObj })) as { employees: IEmployee[], totalCount: number };
    yield put(Creators.getFilteredNoNActiveEmployeesSuccess({ data: employees, totalCount }));
  }
  catch (error) {
    yield put(Creators.getFilteredNoNActiveEmployeesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* employeesExcelDownload() {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const { url } = (yield call(getEmployeesExcelDownloadAPI, { cancelSource })) as { url: string };
    if (url) {
      // @ts-ignore
      window.open(url, '_blank').focus();
    }
  }
  catch (error) {
    yield put(Creators.getFilteredNoNActiveEmployeesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* formerEmployeesExcelDownload() {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const { url } = (yield call(getFormerEmployeesExcelDownloadAPI, { cancelSource })) as { url: string };
    if (url) {
      // @ts-ignore
      window.open(url, '_blank').focus();
    }
  }
  catch (error) {
    yield put(Creators.getFilteredNoNActiveEmployeesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* employeesLimitedExcelDownload() {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const { url } = (yield call(getEmployeesLimitedExcelDownloadAPI, { cancelSource })) as { url: string };
    if (url) {
      // @ts-ignore
      window.open(url, '_blank').focus();
    }
  }
  catch (error) {
    yield put(Creators.getFilteredNoNActiveEmployeesFailure({ error }));
  }
}

function* formerEmployeesLimitedExcelDownload() {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const { url } = (yield call(getFormerEmployeesLimitedExcelDownloadAPI, { cancelSource })) as { url: string };
    if (url) {
      // @ts-ignore
      window.open(url, '_blank').focus();
    }
  }
  catch (error) {
    yield put(Creators.getFilteredNoNActiveEmployeesFailure({ error }));
  }
}

function* employeesEducationsExcelDownload() {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const { url } = (yield call(getEmployeesEducationsExcelDownloadAPI, { cancelSource })) as { url: string };
    if (url) {
      // @ts-ignore
      window.open(url, '_blank').focus();
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* formerEmployeesEducationsExcelDownload() {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    const { url } = (yield call(getFormerEmployeesEducationsExcelDownloadAPI, { cancelSource })) as { url: string };
    if (url) {
      // @ts-ignore
      window.open(url, '_blank').focus();
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFilteredActiveEmployeesRequest() {
  yield takeLatest(Types.GET_FILTERED_ACTIVE_EMPLOYEES_REQUEST, getFilteredActiveEmployees);
}

function* watchGetFilteredNoNActiveEmployeesRequest() {
  yield takeLatest(Types.GET_FILTERED_NO_N_ACTIVE_EMPLOYEES_REQUEST, getFilteredNoNActiveEmployees);
}
function* watchGetFilteredEmployeesCommonRequest() {
  yield takeLatest(Types.GET_FILTERED_EMPLOYEES_COMMON_REQUEST, filteredEmployeesCommon);
}

function* getEmployeesExcelDownloadRequest() {
  yield takeLatest(Types.GET_EMPLOYEES_EXCEL_DOWNLOAD_REQUEST, employeesExcelDownload);
}
function* getFormerEmployeesExcelDownloadRequest() {
  yield takeLatest(Types.GET_FORMER_EMPLOYEES_EXCEL_DOWNLOAD_REQUEST, formerEmployeesExcelDownload);
}

function* getEmployeesLimitedExcelDownloadRequest() {
  yield takeLatest(Types.GET_EMPLOYEES_LIMITED_EXCEL_DOWNLOAD_REQUEST, employeesLimitedExcelDownload);
}
function* getFormerEmployeesLimitedExcelDownloadRequest() {
  yield takeLatest(Types.GET_FORMER_EMPLOYEES_LIMITED_EXCEL_DOWNLOAD_REQUEST, formerEmployeesLimitedExcelDownload);
}

function* getEmployeesEducationsExcelDownloadRequest() {
  yield takeLatest(Types.GET_EMPLOYEES_EDUCATIONS_EXCEL_DOWNLOAD_REQUEST, employeesEducationsExcelDownload);
}
function* getFormerEmployeesEducationsExcelDownloadRequest() {
  yield takeLatest(Types.GET_FORMER_EMPLOYEES_EDUCATIONS_EXCEL_DOWNLOAD_REQUEST, formerEmployeesEducationsExcelDownload);
}

export default function* employeeListPageRootSaga(): Generator {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks: unknown = yield all([
      fork(watchGetFilteredActiveEmployeesRequest),
      fork(watchGetFilteredNoNActiveEmployeesRequest),
      fork(watchGetFilteredEmployeesCommonRequest),
      fork(getEmployeesExcelDownloadRequest),
      fork(getFormerEmployeesExcelDownloadRequest),
      fork(getEmployeesLimitedExcelDownloadRequest),
      fork(getFormerEmployeesLimitedExcelDownloadRequest),
      fork(getEmployeesEducationsExcelDownloadRequest),
      fork(getFormerEmployeesEducationsExcelDownloadRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    // @ts-ignore
    yield all(backgroundTasks.map(task => cancel(task)));
  }
}
