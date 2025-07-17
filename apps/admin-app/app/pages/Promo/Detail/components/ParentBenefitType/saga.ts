import { call, put, select, takeLatest } from 'redux-saga/effects';

import { ParentBenefitTypeSlice } from '@app/pages/Promo/Detail/components/ParentBenefitType/slice';
import { GetChildrenProductsResponse } from '@app/pages/Promo/Detail/components/ParentBenefitType/types';
import { getParentPromoProducts, MessageResponse, upsertChildrenProducts } from '@shared/api/promo/v2';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { downloadParentPromoProducts } from '@app/pages/Promo/Detail/components/ParentBenefitType/constants';
import { t } from '@shared/i18n';

function* watchGetParentPromoProducts() {
  try {
    const promoId: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const response: GetChildrenProductsResponse[] = yield call(getParentPromoProducts, promoId);
    yield call(downloadParentPromoProducts, response, promoId);
    yield put(ToastCreators.success({ message: t('promoPage:PARENT_PROMO_PRODUCTS_DOWNLOADED_SUCCESSFULLY') }));
  }
  catch (error: any) {
    yield put(ToastCreators.error({ message: error?.response?.data?.message || 'An error occurred' }));
  }
  finally {
    yield put(ParentBenefitTypeSlice.actions.setIsPending(false));
  }
}

function* watchUpsertChildrenProducts(
  action: ReturnType<typeof ParentBenefitTypeSlice.actions.upsertChildrenProducts>,
) {
  try {
    const promoId: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const response: MessageResponse = yield call(upsertChildrenProducts, promoId, action.payload);
    yield put(ToastCreators.success({ message: response.message }));
  }
  catch (error: any) {
    yield put(ToastCreators.error({ message: error?.response?.data?.message || 'An error occurred' }));
  }
  finally {
    yield put(ParentBenefitTypeSlice.actions.setIsEditing(false));
    yield put(ParentBenefitTypeSlice.actions.setIsPending(false));
  }
}

export function* parentBenefitTypeSaga() {
  yield takeLatest(ParentBenefitTypeSlice.actions.getParentPromoProducts.type, watchGetParentPromoProducts);
  yield takeLatest(ParentBenefitTypeSlice.actions.upsertChildrenProducts.type, watchUpsertChildrenProducts);
}
