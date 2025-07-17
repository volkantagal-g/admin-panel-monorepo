import { all, takeLatest, call, cancel, fork, put, take, select } from 'redux-saga/effects';
import axios from 'axios';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as MentorshipRequestMatchesCreators } from '@app/pages/Mentorship/components/Table/MyMatches/redux/actions';
import {
  filterMentorshipRequests as filterMentorshipRequestsApi,
  acceptMentorshipRequest as acceptMentorshipRequestApi,
  withdrawMentorshipRequest as withdrawMentorshipRequestApi,
  declineMentorshipRequest as declineMentorshipRequestApi,
} from '@shared/api/mentorship';
import { filterMentorshipRequestsSelector } from './selectors';

function* filterMentorshipRequestsRequest({ body }) {
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
    const filtersData = yield select(filterMentorshipRequestsSelector.getFilters);
    const paginationData = yield select(filterMentorshipRequestsSelector.getPaginationData);
    const { requestStatus: requestStatuses } = { ...filtersData, ...filters };

    const requestBody = {
      cancelSource,
      ...rest,
      ...(requestStatuses ? { requestStatuses } : undefined),
      limit: limit || paginationData.limit,
      ...(_nextPageCursor ? { nextPageCursor: _nextPageCursor } : undefined),
      ...(_previousPageCursor ? { previousPageCursor: _previousPageCursor } : undefined),
    };

    const { requests, nextPageCursor, previousPageCursor } = yield call(filterMentorshipRequestsApi, requestBody);
    yield put(Creators.filterMentorshipRequestsSuccess({ data: requests, nextPageCursor, previousPageCursor }));
  }
  catch (error) {
    yield put(Creators.filterMentorshipRequestsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchFilterMentorshipRequestsRequest() {
  yield takeLatest(Types.FILTER_MENTORSHIP_REQUESTS_REQUEST, filterMentorshipRequestsRequest);
}

function* acceptMentorshipRequest({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const { request: { _id: courseId } } = body;
    const { requests } = yield call(acceptMentorshipRequestApi, { courseId, cancelSource });
    yield put(Creators.acceptMentorshipSuccess({ data: requests }));
    yield put(Creators.filterMentorshipRequestsRequest({ body: {} }));
    yield put(MentorshipRequestMatchesCreators.filterMentorshipRequestMatchesRequest({ body: {} }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.acceptMentorshipFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchAcceptMentorshipRequest() {
  yield takeLatest(Types.ACCEPT_MENTORSHIP_REQUEST, acceptMentorshipRequest);
}

function* withdrawMentorshipRequest({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const { request: { _id: courseId }, withdrawReason } = body;
    const requestBody = { courseId, withdrawReason, cancelSource };
    const data = yield call(withdrawMentorshipRequestApi, requestBody);
    yield put(Creators.filterMentorshipRequestsRequest({ body: {} }));
    yield put(Creators.withdrawMentorshipSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.withdrawMentorshipFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchWithdrawMentorshipRequest() {
  yield takeLatest(Types.WITHDRAW_MENTORSHIP_REQUEST, withdrawMentorshipRequest);
}

function* declineMentorshipRequest({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const { request: { _id: courseId }, declineReason } = body;
    const requestBody = { courseId, declineReason, cancelSource };
    const data = yield call(declineMentorshipRequestApi, requestBody);
    yield put(Creators.filterMentorshipRequestsRequest({ body: {} }));
    yield put(Creators.declineMentorshipSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.declineMentorshipFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDeclineMentorshipRequest() {
  yield takeLatest(Types.DECLINE_MENTORSHIP_REQUEST, declineMentorshipRequest);
}

export default function* mentorshipRequestStatusRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFilterMentorshipRequestsRequest),
      fork(watchAcceptMentorshipRequest),
      fork(watchWithdrawMentorshipRequest),
      fork(watchDeclineMentorshipRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
