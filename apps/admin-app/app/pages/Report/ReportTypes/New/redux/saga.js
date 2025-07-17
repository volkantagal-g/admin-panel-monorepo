import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createReportType, getReportTags } from '@shared/api/report';
import { ROUTE } from '@app/routes';

import { Types, Creators } from './actions';
import { getCleanData } from '../../utils';
import { getEmployeesFilter } from '@shared/api/employee';
import { EMPLOYMENT_STATUSES } from '@app/pages/Employee/constants';

function* createReportTypeRequest({ data }) {
  const [cleanData, addedTags] = getCleanData(data);
  const formattedReportData = cleanData;
  if (addedTags.length) {
    formattedReportData.reportTags = addedTags;
  }

  try {
    const newReportType = yield call(createReportType, formattedReportData);
    yield put(Creators.createReportTypeSuccess({ newReportType }));
    history.push(ROUTE.REPORT_TYPES_DETAIL.path.replace(':id', newReportType._id));
  }
  catch (error) {
    yield put(Creators.createReportTypeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateReportTypeRequest() {
  yield takeLatest(Types.CREATE_REPORT_TYPE_REQUEST, createReportTypeRequest);
}

function* getAllReportTagsRequest({ data: dataIn }) {
  try {
    const data = yield call(getReportTags, dataIn);
    yield put(Creators.getAllReportTagsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getAllReportTagsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAllReportTagsRequest() {
  yield takeLatest(Types.GET_ALL_REPORT_TAGS_REQUEST, getAllReportTagsRequest);
}

function* getAllEmployeesRequest() {
  try {
    const { employees } = yield call(getEmployeesFilter, { workEmail: [], employmentStatuses: [EMPLOYMENT_STATUSES.WORKING, EMPLOYMENT_STATUSES.ON_LEAVE] });
    yield put(Creators.getAllEmployeesSuccess({ data: employees }));
  }
  catch (error) {
    yield put(Creators.getAllEmployeesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetAllEmployeesRequest() {
  yield takeLatest(Types.GET_ALL_EMPLOYEES_REQUEST, getAllEmployeesRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateReportTypeRequest),
      fork(watchAllReportTagsRequest),
      fork(watchGetAllEmployeesRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
