import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { EMPLOYMENT_STATUSES } from '@app/pages/Employee/constants';
import history from '@shared/utils/history';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getReportTypeById,
  updateReportType,
  getReportTags,
  getReportTypeReportTags,
  addReportTagsToReportType,
  removeReportTagsFromReportType,
  deleteReportType,
} from '@shared/api/report';
import { ROUTE } from '@app/routes';

import { Types, Creators } from './actions';
import { REPORT_TYPE_FORM_MODE } from '../../constants';
import { getCleanData } from '../../utils';
import { getLangKey } from '@shared/i18n';
import { getEmployeesFilter } from '@shared/api/employee';

function* getReportTypeByIdRequest({ id }) {
  try {
    const data = yield call(getReportTypeById, id);
    yield put(Creators.getReportTypeByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReportTypeByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchReportTypeByIdRequest() {
  yield takeLatest(Types.GET_REPORT_TYPE_BY_ID_REQUEST, getReportTypeByIdRequest);
}

function* updateReportTypeRequest({ data, prevTags, updateMessageMap }) {
  try {
    const [cleanData, addedTags, removedTags] = getCleanData(data, prevTags);

    const promises = [];
    // keep track of which requests send, so we can show messages
    let updateReportIndex = -1;
    let addReportTagsIndex = -1;
    let removeReportTagsIndex = -1;

    const { _id, ...reportTypeUpdatedFields } = cleanData;

    // no need to send some requests if the data is empty
    if (!isEmpty(reportTypeUpdatedFields)) {
      promises.push(updateReportType({ _id, ...reportTypeUpdatedFields }));
      updateReportIndex = promises.length - 1;
    }
    if (addedTags.length > 0) {
      promises.push(addReportTagsToReportType({ reportTypeId: _id, reportTagIds: addedTags }));
      addReportTagsIndex = promises.length - 1;
    }
    if (removedTags.length > 0) {
      promises.push(removeReportTagsFromReportType({ reportTypeId: _id, reportTagIds: removedTags }));
      removeReportTagsIndex = promises.length - 1;
    }

    if (promises.length > 0) {
      const responses = yield Promise.allSettled(promises);
      for (let resIndex = 0; resIndex < responses.length; resIndex += 1) {
        const response = responses[resIndex];
        let msgKey = '';
        if (resIndex === updateReportIndex) {
          msgKey = 'UPDATE_REPORT_TYPE';
        }
        else if (resIndex === addReportTagsIndex) {
          msgKey = 'ADD_TAGS';
        }
        else if (resIndex === removeReportTagsIndex) {
          msgKey = 'REMOVE_TAGS';
        }

        if (response.status === 'rejected') {
          const mainMessage = updateMessageMap.error[msgKey];
          const extraMessage = response?.reason?.response?.data?.[getLangKey()] || response?.reason?.message || 'Error';
          const message = `${mainMessage}\n${extraMessage}`;
          yield put(ToastCreators.error({ message, toastOptions: { autoClose: 4000 } }));
        }
        if (response.status === 'fulfilled') {
          const mainMessage = updateMessageMap.success[msgKey];
          yield put(ToastCreators.success({ message: mainMessage }));
        }
      }

      yield put(Creators.setUpdateRequestNotPending());
      yield put(Creators.getReportTypeByIdRequest({ id: _id }));
      yield put(Creators.getReportTypeReportTagsRequest({ id: _id }));
      // after update finished, make the form readonly
      yield put(Creators.setFormMode({ formMode: REPORT_TYPE_FORM_MODE.READONLY }));
    }
  }
  catch (error) {
    yield put(Creators.updateReportTypeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateReportTypeRequest() {
  yield takeLatest(Types.UPDATE_REPORT_TYPE_REQUEST, updateReportTypeRequest);
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

function* getReportTypeReportTagsRequest({ id }) {
  try {
    const data = yield call(getReportTypeReportTags, id);
    yield put(Creators.getReportTypeReportTagsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getReportTypeReportTagsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetReportTypeReportTagsRequest() {
  yield takeLatest(Types.GET_REPORT_TYPE_REPORT_TAGS_REQUEST, getReportTypeReportTagsRequest);
}

function* deleteReportTypeRequest({ id }) {
  try {
    const data = yield call(deleteReportType, id);
    yield put(Creators.deleteReportTypeSuccess({ data }));
    history.push(ROUTE.REPORT_TYPES.path);
  }
  catch (error) {
    yield put(Creators.deleteReportTypeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDeleteReportTypeRequest() {
  yield takeLatest(Types.DELETE_REPORT_TYPE_REQUEST, deleteReportTypeRequest);
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
      fork(watchReportTypeByIdRequest),
      fork(watchUpdateReportTypeRequest),
      fork(watchAllReportTagsRequest),
      fork(watchGetReportTypeReportTagsRequest),
      fork(watchDeleteReportTypeRequest),
      fork(watchGetAllEmployeesRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
