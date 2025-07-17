import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getNeighborhoods as getNeighborhoodsApi } from '@shared/api/warehouseProposal';

function* getNeighborhoodsRequest({ district }) {
  try {
    if (district) {
      const { neighborhoods } = yield call(getNeighborhoodsApi, { district });
      yield put(Creators.getNeighborhoodsSuccess({ data: neighborhoods }));
    }
    else {
      yield put(Creators.getNeighborhoodsFailure({ data: [] }));
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetNeighborhoodsRequest() {
  yield takeLatest(Types.GET_NEIGHBORHOODS_REQUEST, getNeighborhoodsRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetNeighborhoodsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
