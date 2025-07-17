import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createBulkPromos, getFilteredPromos } from '@shared/api/promo';
import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { PromoStatus } from '@app/pages/Promo/types';

function* getMasterPromoIdsRequest({ promoCode }) {
  try {
    const { promos, totalCount } = yield call(getFilteredPromos, {
      isParent: true,
      limit: 10,
      page: 0,
      status: PromoStatus.Inactive,
      promoCode,
    });
    yield put(Creators.getMasterPromoIdsSuccess({ promos, totalCount }));
  }
  catch (error) {
    yield put(Creators.getMasterPromoIdsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createBulkPromosRequest({ parentId, bulkPromos }) {
  try {
    const { createBulkPromo } = yield call(createBulkPromos, { parentId, bulkPromos });
    yield put(Creators.createBulkPromosSuccess({ data: createBulkPromo }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createBulkPromosFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetMasterPromoIdsRequest() {
  yield takeLatest(Types.GET_MASTER_PROMO_IDS_REQUEST, getMasterPromoIdsRequest);
}

function* watchCreateBulkPromosRequest() {
  yield takeLatest(Types.CREATE_BULK_PROMOS_REQUEST, createBulkPromosRequest);
}

export default function* root() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetMasterPromoIdsRequest),
      fork(watchCreateBulkPromosRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
