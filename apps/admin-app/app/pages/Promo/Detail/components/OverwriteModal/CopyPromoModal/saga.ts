import { call, put, select, takeLatest } from 'redux-saga/effects';

import { CopyPromoSlice } from '@app/pages/Promo/Detail/components/OverwriteModal/CopyPromoModal/slice';
import { createToastError } from '@app/pages/Promo/utils';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { copyPromo } from '@shared/api/promo';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Promo } from '@app/pages/Promo/types';

function* watchOverwriteRequest({ payload: sourceId }: ReturnType<typeof CopyPromoSlice.actions.overwriteRequest>) {
  try {
    const targetId: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const response: Partial<Promo> = yield call(copyPromo, { targetId, sourceId });
    yield put(CopyPromoSlice.actions.overwriteSuccess());
    yield put(ToastCreators.success());
    yield put(PromoDetailSlice.actions.updatePromoPartial(response));
  }
  catch (error) {
    yield put(createToastError(error));
    yield put(CopyPromoSlice.actions.overwriteFailure());
  }
}

export function* copyPromoSaga() {
  yield takeLatest(CopyPromoSlice.actions.overwriteRequest.type, watchOverwriteRequest);
}
