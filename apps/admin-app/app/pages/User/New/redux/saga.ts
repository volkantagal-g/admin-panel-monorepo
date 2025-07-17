import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import { createUser } from '@shared/api/user';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLangKey } from '@shared/i18n';

function* createUserRequest({ body, afterSuccess }: { body: Partial<UserType>, afterSuccess: (userId: MongoIDType) => void }) {
  let userId = null;
  try {
    const data: UserType = yield call(createUser, { body });
    userId = data._id;
    yield put(Creators.createUserSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    const message = error.response.data.data?.[getLangKey()];
    yield put(Creators.createUserFailure({ error }));
    yield put(ToastCreators.error({ error, message }));
  }
  if (userId && afterSuccess) {
    yield call(afterSuccess, userId);
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(Types.CREATE_USER_REQUEST, createUserRequest);
}

export default function* userNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateUserRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
