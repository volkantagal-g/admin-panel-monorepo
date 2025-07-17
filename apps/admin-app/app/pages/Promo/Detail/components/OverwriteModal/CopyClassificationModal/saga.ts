import { call, put, select, takeLatest } from 'redux-saga/effects';

import { createToastError } from '@app/pages/Promo/utils';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { copyClassification } from '@shared/api/promo';
import { CopyClassificationSlice } from '@app/pages/Promo/Detail/components/OverwriteModal/CopyClassificationModal/slice';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Promo } from '@app/pages/Promo/types';

function* watchOverwriteRequest({ payload: sourceId }: ReturnType<typeof CopyClassificationSlice.actions.overwriteRequest>) {
  try {
    const targetId: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const response: Partial<Promo> = yield call(copyClassification, { targetId, sourceId });
    yield put(CopyClassificationSlice.actions.overwriteSuccess());
    yield put(ToastCreators.success());
    yield put(PromoDetailSlice.actions.updatePromoPartial(response));
  }
  catch (error) {
    yield put(createToastError(error));
    yield put(CopyClassificationSlice.actions.overwriteFailure());
  }
}

export function* copyClassificationSaga() {
  yield takeLatest(CopyClassificationSlice.actions.overwriteRequest.type, watchOverwriteRequest);
}
