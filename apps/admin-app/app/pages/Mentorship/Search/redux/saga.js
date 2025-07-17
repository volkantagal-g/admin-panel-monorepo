import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { searchMentorshipCourses as searchMentorshipCoursesApi } from '@shared/api/mentorship';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import { searchMentorshipCoursesSelector } from './selectors';

function* searchMentorshipCoursesRequest({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const {
      filters,
      limit,
      nextPageCursor: _nextPageCursor,
      previousPageCursor: _previousPageCursor,
      ...rest
    } = body;
    const paginationData = yield select(searchMentorshipCoursesSelector.getPaginationData);
    const filtersData = yield select(searchMentorshipCoursesSelector.getFilters);
    const { mentors, topics, languages, jobFamilyId } = { ...filters, ...filtersData };

    const requestBody = {
      cancelSource,
      ...rest,
      isActive: true,
      ...(mentors?.length ? { mentors } : undefined),
      ...(topics?.length ? { topics } : undefined),
      ...(languages?.length ? { languages } : undefined),
      ...(jobFamilyId ? { jobFamilyId } : undefined),
      limit: limit || paginationData.limit,
      ...(_nextPageCursor ? { nextPageCursor: _nextPageCursor } : undefined),
      ...(_previousPageCursor ? { previousPageCursor: _previousPageCursor } : undefined),
    };

    const { courses, nextPageCursor, previousPageCursor } = yield call(searchMentorshipCoursesApi, requestBody);
    yield put(Creators.searchMentorshipCoursesSuccess({ data: courses, nextPageCursor, previousPageCursor }));
  }
  catch (error) {
    yield put(Creators.searchMentorshipCoursesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchSearchMentorshipCoursesRequest() {
  yield takeLatest(Types.SEARCH_MENTORSHIP_COURSES_REQUEST, searchMentorshipCoursesRequest);
}

export default function* searchMentorshipCoursesRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchSearchMentorshipCoursesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
