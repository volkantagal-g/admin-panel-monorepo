import { all, takeLatest, call, cancel, fork, put, take, select } from 'redux-saga/effects';
import axios from 'axios';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { filterMentorshipRequests as filterMentorshipRequestsApi } from '@shared/api/mentorship';
import { filterMentorshipRequestMatchesSelector } from './selectors';
import { MENTORSHIP_STATUSES } from '@app/pages/Mentorship/constants';

function* filterMentorshipRequestMatchesRequest({ body }) {
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
    const filtersData = yield select(filterMentorshipRequestMatchesSelector.getFilters);
    const paginationData = yield select(filterMentorshipRequestMatchesSelector.getPaginationData);
    const { mentorshipStatus: mentorshipStatuses = [MENTORSHIP_STATUSES.IN_PROGRESS, MENTORSHIP_STATUSES.FINISHED] } = { ...filters, ...filtersData };

    const requestBody = {
      cancelSource,
      ...rest,
      ...(mentorshipStatuses ? { mentorshipStatuses } : undefined),
      limit: limit || paginationData.limit,
      ...(_nextPageCursor ? { nextPageCursor: _nextPageCursor } : undefined),
      ...(_previousPageCursor ? { previousPageCursor: _previousPageCursor } : undefined),
    };

    const { requests, nextPageCursor, previousPageCursor } = yield call(filterMentorshipRequestsApi, requestBody);
    yield put(Creators.filterMentorshipRequestMatchesSuccess({ data: requests, nextPageCursor, previousPageCursor }));
  }
  catch (error) {
    yield put(Creators.filterMentorshipRequestMatchesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchFilterMentorshipRequestMatchesRequest() {
  yield takeLatest(Types.FILTER_MENTORSHIP_REQUEST_MATCHES_REQUEST, filterMentorshipRequestMatchesRequest);
}

export default function* mentorshipRequestMatchesStatusRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFilterMentorshipRequestMatchesRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
