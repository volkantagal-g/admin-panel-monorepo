import { all, takeLatest, call, cancel, fork, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import history from '@shared/utils/history';
import { createBadge } from '@shared/api/marketProductBadge';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';

export function* createBadgeRequest({ body }) {
  try {
    const data = yield call(createBadge, { body });
    yield put(ToastCreators.success());
    const badgeId = _.get(data, '_id', '');
    const path = ROUTE.MARKET_PRODUCT_BADGE_DETAIL.path.replace(':id', badgeId);
    history.push(path);
    yield put(Creators.createBadgeSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createBadgeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateBadgeRequest() {
  yield takeLatest(Types.CREATE_BADGE_REQUEST, createBadgeRequest);
}

export default function* marketProductBadgeNewRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateBadgeRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
