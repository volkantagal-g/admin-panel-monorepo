import { call, put, takeLatest } from 'redux-saga/effects';

import history from '@shared/utils/history';
import { createPromo } from '@shared/api/promo';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';
import { CreatePromoResponse, NewPromotionSlice } from '@app/pages/Promo/New/redux/slice';

function* watchCreatePromoRequest(action: ReturnType<typeof NewPromotionSlice.actions.createPromoRequest>) {
  try {
    const { createPromoV2: { _id } }: CreatePromoResponse = yield call(createPromo, action.payload);
    yield call(history.push, ROUTE.PROMO_DETAIL.path.replace(':id', _id));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    yield put(NewPromotionSlice.actions.createPromoResolve());
  }
}

export function* newPromotionsSaga() {
  yield takeLatest(NewPromotionSlice.actions.createPromoRequest.type, watchCreatePromoRequest);
}
