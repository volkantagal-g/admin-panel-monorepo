import { all, takeLatest, call, cancel, fork, put, take, select } from 'redux-saga/effects';
import axios from 'axios';
import { get } from 'lodash';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getMentorshipUserOfCurrentUser as getMentorshipUserOfCurrentUserApi,
  getMentorshipCourseDetail as getMentorshipCourseDetailApi,
  filterMentorshipRequests as filterMentorshipRequestsApi,
} from '@shared/api/mentorship';
import { convertSelectOptions } from '@shared/utils/common';
import { getMentorshipUserOfCurrentUserSelector } from './selectors';

const getModifiedData = data => {
  const { _id, mentor, topic, yearsOfExperience, detailsOfExperience, languages, isActive } = data;

  let modifiedTopic;
  if (topic) {
    const fakeSelectOptions = convertSelectOptions([topic], { labelKey: 'name' });
    modifiedTopic = get(fakeSelectOptions, 0);
  }

  return {
    _id,
    mentor,
    topic: modifiedTopic,
    yearsOfExperience,
    detailsOfExperience,
    languages,
    isActive,
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

function* getMentorshipCourseDetail({ courseId }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const data = yield call(getMentorshipCourseDetailApi, { courseId, cancelSource });
    const user = yield select(getMentorshipUserOfCurrentUserSelector.getData);
    const response = { course: getModifiedData(data) };
    if (user?._id) {
      const reqBody = {
        cancelSource,
        mentorOrMenteeId: user._id,
        course: data._id,
        fields: ['_id', 'course', 'requestStatus'],
        populateFields: [''],
      };
      const { requests } = yield call(filterMentorshipRequestsApi, reqBody);
      response.requests = requests;
    }
    yield put(Creators.getMentorshipCourseDetailSuccess({ data: response }));
  }
  catch (error) {
    yield put(Creators.getMentorshipCourseDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMentorshipCourseDetailRequest() {
  yield takeLatest(Types.GET_MENTORSHIP_COURSE_DETAIL_REQUEST, getMentorshipCourseDetail);
}

export default function* mentorshipCourseDetailRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMentorshipUserOfCurrentUserRequest),
      fork(watchGetMentorshipCourseDetailRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
