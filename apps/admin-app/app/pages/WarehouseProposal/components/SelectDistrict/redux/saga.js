import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getDistricts as getDistrictsApi } from '@shared/api/warehouseProposal';

function* getDistrictsRequest({ city }) {
  try {
    if (city) {
      const { districts } = yield call(getDistrictsApi, { city });
      yield put(Creators.getDistrictsSuccess({ data: districts }));
    }
    else {
      yield put(Creators.getDistrictsFailure({ data: [] }));
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetDistrictsRequest() {
  yield takeLatest(Types.GET_DISTRICTS_REQUEST, getDistrictsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetDistrictsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
