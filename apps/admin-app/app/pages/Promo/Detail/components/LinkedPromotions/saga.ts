import { call, put, select, takeLatest } from 'redux-saga/effects';

import { LinkedPromotionsSlice } from '@app/pages/Promo/Detail/components/LinkedPromotions/slice';
import { updateLinkedPromo } from '@shared/api/promo';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { t } from '@shared/i18n';

function* watchUpdateLinkedPromotionsRequest(action: ReturnType<typeof LinkedPromotionsSlice.actions.updateLinkedPromotionsRequest>) {
  try {
    const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    yield call(updateLinkedPromo, {
      id,
      linkedPromoId: action.payload ?? null,
    });
    yield put(ToastCreators.success());
    yield put(LinkedPromotionsSlice.actions.updateLinkedPromotionsSuccess());
    yield put(PromoDetailSlice.actions.updatePromoPartial({ linkedPromos: action.payload ? [action.payload] : [] }));
  }
  catch (error:any) {
    const errorTranslationKey = error?.response?.data?.message;
    const errorMessage = errorTranslationKey ? t(`promoPage:MESSAGE.${errorTranslationKey}`) : null;
    yield put(ToastCreators.error({ message: errorMessage, ...(!errorMessage && { error }) }));
    yield put(LinkedPromotionsSlice.actions.updateLinkedPromotionsFail());
  }
}

export function* linkedPromotionsSaga() {
  yield takeLatest(LinkedPromotionsSlice.actions.updateLinkedPromotionsRequest.type, watchUpdateLinkedPromotionsRequest);
}
