import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { createMarketProductGroup } from '@shared/api/marketProductGroup';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

export function* createMarketProductGroupRequest({ body }) {
  try {
    const data = yield call(createMarketProductGroup, { body });
    yield put(ToastCreators.success());
    const path = ROUTE.MARKET_PRODUCT_GROUP_DETAIL.path.replace(':id', data?.productGrouping?._id);
    history.push(path);
    yield put(Creators.createMarketProductGroupSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createMarketProductGroupFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateMarketProductGroupRequest() {
  yield takeLatest(Types.CREATE_MARKET_PRODUCT_GROUP_REQUEST, createMarketProductGroupRequest);
}

export default function* marketProductGroupNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateMarketProductGroupRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
