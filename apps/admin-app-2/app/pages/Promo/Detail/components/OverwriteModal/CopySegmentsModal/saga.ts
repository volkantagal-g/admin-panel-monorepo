import { call, put, select, takeLatest } from 'redux-saga/effects';

import { createToastError } from '@app/pages/Promo/utils';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { copySegments } from '@shared/api/promo';
import { CopySegmentsSlice } from '@app/pages/Promo/Detail/components/OverwriteModal/CopySegmentsModal/slice';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Promo } from '../../../../types';

function* watchOverwriteRequest({ payload: sourceId }: ReturnType<typeof CopySegmentsSlice.actions.overwriteRequest>) {
  try {
    const targetId: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const response: Partial<Promo> = yield call(copySegments, { targetId, sourceId });
    yield put(CopySegmentsSlice.actions.overwriteSuccess());
    yield put(ToastCreators.success());
    yield put(PromoDetailSlice.actions.updatePromoPartial(response));
  }
  catch (error) {
    yield put(createToastError(error));
    yield put(CopySegmentsSlice.actions.overwriteFailure());
  }
}

export function* copySegmentsSaga() {
  yield takeLatest(CopySegmentsSlice.actions.overwriteRequest.type, watchOverwriteRequest);
}
