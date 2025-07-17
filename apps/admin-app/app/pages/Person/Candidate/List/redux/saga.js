import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import moment from 'moment';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  filterPersonCandidateList,
  updateAssignee as updateAssigneeApi,
  getCandidateActionHistory,
  getPersonCandidateReport as apiGetPersonCandidateReport,
} from '@shared/api/person';
import { Types, Creators } from './actions';
import { getLangKey } from '@shared/i18n';

function* getPersonCandidateList({
  franchise,
  warehouse,
  status,
  workerType,
  startDate,
  endDate,
  assignees,
  uniqueIdentifier,
  limit,
  offset,
}) {
  try {
    const { records, totalCount } = yield call(filterPersonCandidateList, {
      franchise,
      warehouse,
      status,
      workerType,
      startDate,
      endDate,
      assignees,
      uniqueIdentifier,
      limit,
      offset,
    });
    yield put(Creators.getPersonCandidateListSuccess({ data: records, total: totalCount }));
  }
  catch (error) {
    yield put(Creators.getPersonCandidateListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchPersonCandidateListRequest() {
  yield takeLatest(Types.GET_PERSON_CANDIDATE_LIST_REQUEST, getPersonCandidateList);
}

function* updateAssignee({
  candidateId,
  franchise,
  warehouse,
  status,
  workerType,
  startDate,
  endDate,
  assignees,
  uniqueIdentifier,
  limit,
  offset,
}) {
  try {
    yield call(updateAssigneeApi, { candidateId });
    yield put(Creators.updateAssigneeSuccess());
    yield put(ToastCreators.success());
    yield put(
      Creators.getPersonCandidateListRequest({
        franchise,
        warehouse,
        status,
        workerType,
        startDate,
        endDate,
        assignees,
        uniqueIdentifier,
        limit,
        offset,
      }),
    );
  }
  catch (error) {
    yield put(Creators.updateAssigneeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateAssigneeRequest() {
  yield takeLatest(Types.UPDATE_ASSIGNEE_REQUEST, updateAssignee);
}

function* getPersonCandidateActionHistory({ candidate }) {
  try {
    const data = yield call(getCandidateActionHistory, { candidateId: candidate._id });
    yield put(Creators.getPersonCandidateActionHistorySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPersonCandidateActionHistoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPersonCandidateActionHistoryRequest() {
  yield takeLatest(Types.GET_PERSON_CANDIDATE_ACTION_HISTORY_REQUEST, getPersonCandidateActionHistory);
}

function* getPersonCandidateListReport(argsExport) {
  try {
    const data = yield call(apiGetPersonCandidateReport, {
      ...argsExport,
      lang: getLangKey(),
      utcOffset: moment().utcOffset(),
    });
    window.open(data.url);
    yield put(Creators.getPersonCandidateListReportSuccess());
  }
  catch (error) {
    yield put(Creators.getPersonCandidateListReportFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchPersonCandidateListReportRequest() {
  yield takeLatest(Types.GET_PERSON_CANDIDATE_LIST_REPORT_REQUEST, getPersonCandidateListReport);
}

export default function* personCandidateListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPersonCandidateListRequest),
      fork(watchUpdateAssigneeRequest),
      fork(watchGetPersonCandidateActionHistoryRequest),
      fork(watchPersonCandidateListReportRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
