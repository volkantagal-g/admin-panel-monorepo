import { call, put, select, takeLatest } from 'redux-saga/effects';

import { TermsAndConditionsSlice } from '@app/pages/Promo/Detail/components/TermsAndConditions/slice';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { updateTermsAndConditions } from '@shared/api/promo';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getInitialValues } from '@app/pages/Promo/Detail/components/TermsAndConditions/constants';

function* watchUpdate(
  { payload }: ReturnType<typeof TermsAndConditionsSlice.actions.update>,
) {
  try {
    const promoId: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    yield call(updateTermsAndConditions, { id: promoId, data: payload });
    yield put(PromoDetailSlice.actions.updatePromoPartial({ termsAndConditions: getInitialValues(payload) }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    yield put(TermsAndConditionsSlice.actions.resolveUpdate());
  }
}

export function* termsAndConditionsSaga() {
  yield takeLatest(TermsAndConditionsSlice.actions.update.type, watchUpdate);
}
