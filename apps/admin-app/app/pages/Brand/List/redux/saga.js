import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getBrands } from '@shared/api/brand';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* getBrandsRequest({ limit, offset, name, status }) {
  try {
    const data = yield call(getBrands, { limit, offset, name, status });
    yield put(Creators.getBrandsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getBrandsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetBrandsRequest() {
  yield takeLatest(Types.GET_BRANDS_REQUEST, getBrandsRequest);
}

export default function* brandsRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetBrandsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
