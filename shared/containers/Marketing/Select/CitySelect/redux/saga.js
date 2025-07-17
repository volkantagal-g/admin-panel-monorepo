import { all, cancel, take } from 'redux-saga/effects';

import { Types } from './actions';

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
