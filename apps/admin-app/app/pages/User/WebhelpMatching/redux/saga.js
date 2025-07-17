import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  getFilteredUsersForWebhelpMatching as getFilteredUsersForWebhelpMatchingAPI,
  updateUsersWebhelpIdByEmails as updateUsersWebhelpIdByEmailsAPI,
  removeWebhelpIdFromUser as removeWebhelpIdFromUserAPI,
} from '@shared/api/user';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import history from '@shared/utils/history';
import { Types, Creators } from './actions';

function* getUsers({ searchTerm, webhelpId, limit, offset }) {
  try {
    const reqBody = {
      limit,
      offset,
      searchTerm,
      webhelpId,
    };
    const data = yield call(getFilteredUsersForWebhelpMatchingAPI, reqBody);
    yield put(Creators.getUsersSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getUsersFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateUsersWebhelpIdRequest({ updateData }) {
  try {
    const reqBody = { updateData };
    yield call(updateUsersWebhelpIdByEmailsAPI, reqBody);
    yield put(Creators.updateUsersWebhelpIdSuccess());
    yield put(ToastCreators.success());
    history.go(0);
  }
  catch (error) {
    yield put(Creators.updateUsersWebhelpIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* removeWebhelpIdFromUser({ id }) {
  try {
    const reqBody = { id };
    yield call(removeWebhelpIdFromUserAPI, reqBody);
    yield put(Creators.removeWebhelpIdFromUserSuccess());
    yield put(ToastCreators.success());
    history.go(0);
  }
  catch (error) {
    yield put(Creators.removeWebhelpIdFromUserFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetUsersRequest() {
  yield takeLatest(Types.GET_USERS_REQUEST, getUsers);
}

function* watchUpdateUsersWebhelpIdRequest() {
  yield takeLatest(Types.UPDATE_USERS_WEBHELP_ID_REQUEST, updateUsersWebhelpIdRequest);
}

function* watchRemoveWebhelpIdFromUserRequest() {
  yield takeLatest(Types.REMOVE_WEBHELP_ID_FROM_USER_REQUEST, removeWebhelpIdFromUser);
}

export default function* userWebhelpMatchingSagaRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetUsersRequest),
      fork(watchUpdateUsersWebhelpIdRequest),
      fork(watchRemoveWebhelpIdFromUserRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
