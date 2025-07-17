import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  filterMentorshipCourses as filterMentorshipCoursesApi,
  createMentorshipCourse as createMentorshipCourseApi,
  updateMentorshipCourse as updateMentorshipCourseApi,
  deleteMentorshipCourse as deleteMentorshipCourseApi,
} from '@shared/api/mentorship';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { filterMentorshipCoursesSelector } from './selectors';

export function* createOrUpdateMentorshipCourseRequest({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const { isUpdate, _id, topic, yearsOfExperience, detailsOfExperience, languages } = body;
    let data;
    if (isUpdate) {
      data = yield call(updateMentorshipCourseApi, { id: _id, yearsOfExperience, detailsOfExperience, languages, cancelSource });
    }
    else {
      data = yield call(createMentorshipCourseApi, { topic, yearsOfExperience, detailsOfExperience, languages, cancelSource });
    }
    yield put(Creators.filterMentorshipCoursesRequest({ body: { mentor: data?.mentor } }));
    yield put(Creators.closeModal());
    yield put(Creators.createOrUpdateMentorshipCourseSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createOrUpdateMentorshipCourseFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateOrUpdateMentorshipCourseRequest() {
  yield takeLatest(Types.CREATE_OR_UPDATE_MENTORSHIP_COURSE_REQUEST, createOrUpdateMentorshipCourseRequest);
}

export function* deleteMentorshipCourseRequest({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const requestBody = { ...body, cancelSource };
    const data = yield call(deleteMentorshipCourseApi, requestBody);
    yield put(Creators.filterMentorshipCoursesRequest({ body: { mentor: data?.mentor } }));
    yield put(Creators.deleteMentorshipCourseSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteMentorshipCourseFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchDeleteMentorshipCourseRequest() {
  yield takeLatest(Types.DELETE_MENTORSHIP_COURSE_REQUEST, deleteMentorshipCourseRequest);
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
    yield put(Creators.filterMentorshipCoursesSuccess({ data: courses, nextPageCursor, previousPageCursor }));
  }
  catch (error) {
    yield put(Creators.filterMentorshipCoursesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchFilterMentorshipCoursesRequest() {
  yield takeLatest(Types.FILTER_MENTORSHIP_COURSES_REQUEST, filterMentorshipCoursesRequest);
}

export default function* filterMentorshipCoursesRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFilterMentorshipCoursesRequest),
      fork(watchCreateOrUpdateMentorshipCourseRequest),
      fork(watchDeleteMentorshipCourseRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
