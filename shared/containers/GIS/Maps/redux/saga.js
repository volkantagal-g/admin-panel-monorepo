import { all, cancel, take } from 'redux-saga/effects';

import { Types } from './actions';

export default function* gisMapsRoot() {
  while (yield take(Types.INIT_MAPS)) {
    const backgroundTasks = yield all([
    ]);
    yield take(Types.DESTROY_MAPS);
    yield cancel(backgroundTasks);
  }
}
