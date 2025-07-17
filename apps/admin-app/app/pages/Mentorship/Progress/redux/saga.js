import { all, takeLatest, call, cancel, fork, put, take, select } from 'redux-saga/effects';
import axios from 'axios';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as TodoCreators } from '../components/TodoList/redux/actions';
import { Creators as SessionNotesCreators } from '../components/SessionNotes/redux/actions';
import {
  getMentorshipRequestDetail as getMentorshipRequestDetailApi,
  updateMentorshipRequestDetail as updateMentorshipRequestDetailApi,
  filterMentorshipTodos as getMentorshipTodosApi,
  addNewMentorshipTodo as addNewMentorshipTodoApi,
  updateMentorshipTodo as updateMentorshipTodoApi,
  filterMentorshipSessionNotes as getMentorshipSessionNotesApi,
  addNewMentorshipSessionNote as addNewMentorshipSessionNoteApi,
  updateMentorshipSessionNote as updateMentorshipSessionNoteApi,
  getMentorshipUserOfCurrentUser as getMentorshipUserOfCurrentUserApi,
} from '@shared/api/mentorship';
import { getMentorshipSessionNotesSelector, getMentorshipTodosSelector } from './selectors';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

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

function* getMentorshipRequestDetail({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const { id, mentorshipUserId } = body;

    const data = yield call(getMentorshipRequestDetailApi, { id, cancelSource });
    if (data?.mentee?._id !== mentorshipUserId && data?.mentor?._id !== mentorshipUserId) {
      history.push(ROUTE.MENTORSHIP_PROFILE.path);
    }
    else {
      yield put(Creators.getMentorshipRequestDetailSuccess({ data }));
    }
  }
  catch (error) {
    yield put(Creators.getMentorshipRequestDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMentorshipRequestDetailRequest() {
  yield takeLatest(Types.GET_MENTORSHIP_REQUEST_DETAIL_REQUEST, getMentorshipRequestDetail);
}

function* updateMentorshipRequestDetail({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const data = yield call(updateMentorshipRequestDetailApi, { ...body, cancelSource });
    yield put(Creators.updateMentorshipRequestDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.updateMentorshipRequestDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateMentorshipRequestDetailRequest() {
  yield takeLatest(Types.UPDATE_MENTORSHIP_REQUEST_DETAIL_REQUEST, updateMentorshipRequestDetail);
}

function* getMentorshipTodosRequest({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();

    const { todos } = yield call(getMentorshipTodosApi, { ...body, cancelSource });
    yield put(Creators.getMentorshipTodosSuccess({ data: todos }));
  }
  catch (error) {
    yield put(Creators.getMentorshipTodosFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMentorshipTodosRequest() {
  yield takeLatest(Types.GET_MENTORSHIP_TODOS_REQUEST, getMentorshipTodosRequest);
}

export function* addOrUpdateMentorshipTodoRequest({ body }) {
  try {
    const { isUpdate, isCompleted, ...restOfBody } = body;
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const requestBody = { ...restOfBody, cancelSource };
    let data;
    if (isUpdate) {
      data = yield call(updateMentorshipTodoApi, requestBody);
    }
    else {
      data = yield call(addNewMentorshipTodoApi, requestBody);
    }
    yield put(TodoCreators.closeModal());
    yield put(Creators.addOrUpdateMentorshipTodoSuccess({ data }));
    const todos = yield select(getMentorshipTodosSelector.getData);
    const updatedTodos = todos.some(todo => todo._id === data._id)
      ? todos.map(todo => (data._id === todo._id ? data : todo))
      : [...todos, data];
    yield put(Creators.getMentorshipTodosSuccess({ data: updatedTodos }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.addOrUpdateMentorshipTodoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchAddOrUpdateMentorshipTodoRequest() {
  yield takeLatest(Types.ADD_OR_UPDATE_MENTORSHIP_TODO_REQUEST, addOrUpdateMentorshipTodoRequest);
}

export function* getMentorshipSessionNotesRequest({ body }) {
  try {
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const requestBody = { ...body, cancelSource };
    const { sessionNotes } = yield call(getMentorshipSessionNotesApi, requestBody);
    yield put(Creators.getMentorshipSessionNotesSuccess({ data: sessionNotes }));
  }
  catch (error) {
    yield put(Creators.getMentorshipSessionNotesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetMentorshipSessionNotesRequest() {
  yield takeLatest(Types.GET_MENTORSHIP_SESSION_NOTES_REQUEST, getMentorshipSessionNotesRequest);
}

export function* addOrUpdateMentorshipSessionNoteRequest({ body }) {
  try {
    const { isUpdate, ...restOfBody } = body;
    const { CancelToken } = axios;
    const cancelSource = CancelToken.source();
    const requestBody = { ...restOfBody, cancelSource };
    let data;
    if (isUpdate) {
      data = yield call(updateMentorshipSessionNoteApi, requestBody);
    }
    else {
      data = yield call(addNewMentorshipSessionNoteApi, requestBody);
    }
    yield put(SessionNotesCreators.closeModal());
    yield put(Creators.addOrUpdateMentorshipSessionNoteSuccess({ data }));
    const sessionNotes = yield select(getMentorshipSessionNotesSelector.getData);
    const updatedSessionNotes = sessionNotes.some(sessionNote => sessionNote._id === data._id)
      ? sessionNotes.map(sessionNote => (data._id === sessionNote._id ? data : sessionNote))
      : [...sessionNotes, data];
    yield put(Creators.getMentorshipSessionNotesSuccess({ data: updatedSessionNotes }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.addOrUpdateMentorshipSessionNoteFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchAddOrUpdateMentorshipSessionNoteRequest() {
  yield takeLatest(Types.ADD_OR_UPDATE_MENTORSHIP_SESSION_NOTE_REQUEST, addOrUpdateMentorshipSessionNoteRequest);
}

export default function* mentorshipRequestDetailRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMentorshipUserOfCurrentUserRequest),
      fork(watchGetMentorshipRequestDetailRequest),
      fork(watchUpdateMentorshipRequestDetailRequest),
      fork(watchGetMentorshipTodosRequest),
      fork(watchAddOrUpdateMentorshipTodoRequest),
      fork(watchGetMentorshipSessionNotesRequest),
      fork(watchAddOrUpdateMentorshipSessionNoteRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
