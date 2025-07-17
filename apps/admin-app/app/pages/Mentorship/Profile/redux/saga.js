import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { isString } from 'lodash';

import {
  createMentorshipUser as createMentorshipUserApi,
  updateMentorshipUser as updateMentorshipUserApi,
  getMentorshipUser as getMentorshipUserApi,
} from '@shared/api/mentorship';
import { getEmployeeOfCurrentUser as getEmployeeOfCurrentUserApi } from '@shared/api/employee';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { topicsSelectOptionMapper } from '../../components/Select/Topic';

const getModifiedDataFromApi = data => {
  const { _id, employeeId, bio, topicsInterested, topicsToTeach, isMentor, languages, picURL } = data;

  let modifiedTopicsInterested;
  if (topicsInterested?.length) {
    modifiedTopicsInterested = topicsInterested?.map(topicsSelectOptionMapper);
  }

  let modifiedTopicsToTeach;
  if (topicsToTeach?.length) {
    modifiedTopicsToTeach = topicsToTeach?.map(topicsSelectOptionMapper);
  }

  return ({
    _id,
    employeeId,
    bio,
    topicsInterested: modifiedTopicsInterested,
    topicsToTeach: modifiedTopicsToTeach,
    isMentor,
    languages,
    picURL,
  });
};

const getModifiedDataForApi = data => {
  const { topicsInterested, topicsToTeach, ...rest } = data;
  return ({
    topicsInterested: topicsInterested?.map(topic => (isString(topic) ? topic : topic.value)),
    topicsToTeach: topicsToTeach?.map(topic => (isString(topic) ? topic : topic.value)),
    ...rest,
  });
};

function* getEmployeeOfCurrentUser() {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const data = yield call(getEmployeeOfCurrentUserApi, { cancelSource });
    if (data?._id) {
      yield put(Creators.getMentorshipUserRequest({ employeeId: data._id }));
    }
    yield put(Creators.getEmployeeOfCurrentUserSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getEmployeeOfCurrentUserFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetEmployeeOfCurrentUserRequest() {
  yield takeLatest(Types.GET_EMPLOYEE_OF_CURRENT_USER_REQUEST, getEmployeeOfCurrentUser);
}

function* getMentorshipUser({ id, employeeId }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const requestBody = {
      ...(id ? { id } : undefined),
      ...(employeeId ? { employeeId } : undefined),
      cancelSource,
    };

    const data = yield call(getMentorshipUserApi, requestBody);
    yield put(Creators.getMentorshipUserSuccess({ data: getModifiedDataFromApi(data) }));
  }
  catch (error) {
    yield put(Creators.getMentorshipUserFailure({ error }));
  }
}

function* watchGetMentorshipUserRequest() {
  yield takeLatest(Types.GET_MENTORSHIP_USER_REQUEST, getMentorshipUser);
}

function* createOrUpdateMentorshipUser({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const { isEdit, _id, employeeId, ...rest } = body;
    let data;
    if (isEdit) {
      data = yield call(updateMentorshipUserApi, { ...getModifiedDataForApi(rest), cancelSource });
    }
    else {
      data = yield call(createMentorshipUserApi, { ...rest, cancelSource });
    }
    yield put(Creators.createOrUpdateMentorshipUserSuccess({ data: getModifiedDataFromApi(data) }));
  }
  catch (error) {
    yield put(Creators.createOrUpdateMentorshipUserFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateOrUpdateMentorshipUserRequest() {
  yield takeLatest(Types.CREATE_OR_UPDATE_MENTORSHIP_USER_REQUEST, createOrUpdateMentorshipUser);
}

export default function* createOrUpdateMentorshipUserPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetEmployeeOfCurrentUserRequest),
      fork(watchGetMentorshipUserRequest),
      fork(watchCreateOrUpdateMentorshipUserRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
