import { all, cancel, take } from 'redux-saga/effects';

import { Types } from './actions';

export default function* mentorshipTodoRootSaga() {
  while (yield take(Types.OPEN_MODAL)) {
    const backgroundTasks = yield all([
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
