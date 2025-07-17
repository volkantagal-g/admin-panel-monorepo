import { all, takeLatest, call, cancel, fork, put, take, select } from 'redux-saga/effects';
import axios from 'axios';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getMentorshipUserOfCurrentUser as getMentorshipUserOfCurrentUserApi,
  getMentorshipMentorDetail as getMentorshipMentorDetailApi,
  filterMentorshipCourses as filterMentorshipCoursesApi,
  filterMentorshipRequests as filterMentorshipRequestsApi,
} from '@shared/api/mentorship';
import { convertSelectOptions } from '@shared/utils/common';
import { filterMentorshipCoursesSelector, getMentorshipUserOfCurrentUserSelector } from './selectors';

const getModifiedData = data => {
  const { _id, isMentor, bio, picURL, topicsToTeach, languages, employeeId } = data;

  let modifiedTopicsToTeach;
  if (topicsToTeach?.length) {
    modifiedTopicsToTeach = convertSelectOptions(topicsToTeach, { labelKey: 'name' });
  }

  return {
    _id,
    isMentor,
    bio,
    picURL,
    topicsToTeach: modifiedTopicsToTeach,
    languages,
    employeeId,
  };
};

function* getMentorshipUserOfCurrentUser() {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const data = yield call(getMentorshipUserOfCurrentUserApi, { cancelSource });
    yield put(Creators.getMentorshipUserOfCurrentUserSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMentorshipUserOfCurrentUserFailure({ error }));
  }
}

function* watchGetMentorshipUserOfCurrentUserRequest() {
  yield takeLatest(Types.GET_MENTORSHIP_USER_OF_CURRENT_USER_REQUEST, getMentorshipUserOfCurrentUser);
}

function* getMentorshipMentorDetail({ mentorId }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const data = yield call(getMentorshipMentorDetailApi, { mentorId, cancelSource });
    yield put(Creators.getMentorshipMentorDetailSuccess({ data: getModifiedData(data) }));
  }
  catch (error) {
    yield put(Creators.getMentorshipMentorDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMentorshipMentorDetailRequest() {
  yield takeLatest(Types.GET_MENTORSHIP_MENTOR_DETAIL_REQUEST, getMentorshipMentorDetail);
}

function* filterMentorshipCoursesRequest({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const {
      limit,
      nextPageCursor: _nextPageCursor,
      previousPageCursor: _previousPageCursor,
      ...rest
    } = body;
    const paginationData = yield select(filterMentorshipCoursesSelector.getPaginationData);

    const requestBody = {
      cancelSource,
      isActive: true,
      ...rest,
      limit: limit || paginationData.limit,
      ...(_nextPageCursor ? { nextPageCursor: _nextPageCursor } : undefined),
      ...(_previousPageCursor ? { previousPageCursor: _previousPageCursor } : undefined),
    };

    const { courses, nextPageCursor, previousPageCursor } = yield call(filterMentorshipCoursesApi, requestBody);
    const data = { courses };
    const user = yield select(getMentorshipUserOfCurrentUserSelector.getData);
    if (user?._id) {
      const reqBody = {
        cancelSource,
        mentorOrMenteeId: user._id,
        courses: courses?.map(({ _id }) => _id),
        fields: ['_id', 'course', 'requestStatus'],
        populateFields: [''],
      };
      const { requests } = yield call(filterMentorshipRequestsApi, reqBody);
      data.requests = requests;
    }

    yield put(Creators.filterMentorshipCoursesSuccess({ data, nextPageCursor, previousPageCursor }));
  }
  catch (error) {
    yield put(Creators.filterMentorshipCoursesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchFilterMentorshipCoursesRequest() {
  yield takeLatest(Types.FILTER_MENTORSHIP_COURSES_REQUEST, filterMentorshipCoursesRequest);
}

export default function* mentorshipMentorDetailRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMentorshipUserOfCurrentUserRequest),
      fork(watchGetMentorshipMentorDetailRequest),
      fork(watchFilterMentorshipCoursesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
