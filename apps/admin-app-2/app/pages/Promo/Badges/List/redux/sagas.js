import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { deletePromoBadge, getFilteredBadges, managePromoBadge } from '@shared/api/promo';
import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* getPromoBadgesByFiltersRequest({ name, promoMechanic, page, limit }) {
  try {
    const filtersData = { name, promoMechanic, page, limit };
    const { promoBadges, totalCount } = yield call(getFilteredBadges, filtersData);

    yield put(Creators.getPromoBadgesByFiltersSuccess({ promoBadges, totalCount }));
  }
  catch (error) {
    yield put(Creators.getPromoBadgesByFiltersFailure({ error }));
  }
}

function* managePromoBadgeRequest({ body }) {
  try {
    const data = yield call(managePromoBadge, { body });
    yield put(Creators.getPromoBadgesByFiltersRequest({ page: 0, limit: 10 }));
    yield put(Creators.managePromoBadgeSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.managePromoBadgeFailure({ error }));
  }
}
function* deletePromoBadgeRequest({ id }) {
  try {
    yield call(deletePromoBadge, { id });
    yield put(Creators.deletePromoBadgeSuccess({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deletePromoBadgeFailure({ error }));
  }
}

function* watchManagePromoBadgeRequest() {
  yield takeLatest(Types.MANAGE_PROMO_BADGE_REQUEST, managePromoBadgeRequest);
}

function* watchPromoBadgesByFiltersRequest() {
  yield takeLatest(Types.GET_PROMO_BADGES_BY_FILTERS_REQUEST, getPromoBadgesByFiltersRequest);
}

function* watchDeletePromoBadgeRequest() {
  yield takeLatest(Types.DELETE_PROMO_BADGE_REQUEST, deletePromoBadgeRequest);
}

export default function* promosRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPromoBadgesByFiltersRequest),
      fork(watchManagePromoBadgeRequest),
      fork(watchDeletePromoBadgeRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
