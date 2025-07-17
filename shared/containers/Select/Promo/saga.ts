import { call, put, takeEvery } from 'redux-saga/effects';

import { getPromosByIds, getPromosByPromoCode } from '@shared/api/promo';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { SelectPromoSlice } from './slice';
import { PromoTagType } from '@app/pages/Promo/types';
import { GetPromosByIdResponse } from '@app/pages/Promo/Detail/components/LinkedPromotions/slice';

function* watchGetPromosByPromoCodeRequest(action: ReturnType<typeof SelectPromoSlice.actions.getPromosByPromoCodeRequest>) {
  const { searchString, excludedOptions, isParentPromo, slice, isMasterPromo } = action.payload;
  try {
    const data: { promosByPromoCode: PromoTagType[] } = yield call(
      getPromosByPromoCode,
      searchString,
      undefined,
      excludedOptions,
      isParentPromo,
      isMasterPromo,
    );
    yield put(SelectPromoSlice.actions.getPromosByPromoCodeSuccess([data.promosByPromoCode, { slice }]));
  }
  catch (error) {
    yield put(SelectPromoSlice.actions.getPromosByPromoCodeFailure({ slice }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPromosByIdsRequest(
  action: ReturnType<typeof SelectPromoSlice.actions.getPromosByIdsRequest>,
) {
  const { promoIds, slice } = action.payload;
  try {
    if (!promoIds || promoIds.length === 0) {
      yield put(SelectPromoSlice.actions.getPromosByIdsSuccess([[], { slice }]));
      return;
    }
    const { promosByIds }: { promosByIds: GetPromosByIdResponse[] } = yield call(getPromosByIds, { promoIds });
    yield put(SelectPromoSlice.actions.getPromosByIdsSuccess([promosByIds, { slice }]));
  }
  catch (error) {
    yield put(SelectPromoSlice.actions.getPromosByIdsFailure({ slice }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* selectPromoSaga() {
  yield takeEvery(SelectPromoSlice.actions.getPromosByPromoCodeRequest.type, watchGetPromosByPromoCodeRequest);
  yield takeEvery(SelectPromoSlice.actions.getPromosByIdsRequest.type, watchGetPromosByIdsRequest);
}
