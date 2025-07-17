import { call, put, select, takeLatest } from 'redux-saga/effects';

import moment from 'moment';

import { GeneralInfoSlice } from '@app/pages/Promo/Detail/components/GeneralInfoForm/slice';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { updateGeneralInfo } from '@shared/api/promo';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { isArraysEqual } from '@app/pages/Promo/Detail/utils';
import { t } from '@shared/i18n';
import { PromoDomains } from '@app/pages/Promo/types';

function* watchUpdate(
  { payload: body }: ReturnType<typeof GeneralInfoSlice.actions.update>,
) {
  try {
    const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const domainTypes: PromoDomains[] = yield select(PromoDetailSlice.selectors.domainTypes);
    const warehouses: MongoIDType[] = yield select(PromoDetailSlice.selectors.warehouses);
    const isP3Enabled: boolean = yield select(PromoDetailSlice.selectors.p3Enabled);
    const { timezones: [{ timezone }] } = yield select(getSelectedCountryV2);
    const validFrom = moment.tz(body.validFrom, timezone).valueOf();
    const validUntil = moment.tz(body.validUntil, timezone).valueOf();
    const payload = {
      ...body,
      promoCode: body.promoCode?.trim(),
      validFrom,
      validUntil,
    };
    yield call(updateGeneralInfo, { id, body: payload });
    yield put(PromoDetailSlice.actions.updatePromoPartial({
      ...body,
      validFrom: body.validFrom.toISOString(),
      validUntil: body.validUntil.toISOString(),
      promoCode: body.promoCode?.trim(),
    }));

    if ((!isArraysEqual(domainTypes, body.domainTypes) || !isArraysEqual(warehouses, body.warehouses)) && isP3Enabled) {
      yield put(ToastCreators.pending({
        message: t('SEGMENT.REGENERATE_MANUALLY'),
        toastOptions: { autoClose: false },
      }));
    }
    yield put(ToastCreators.success());
    yield put(GeneralInfoSlice.actions.updateSuccess());
  }
  catch (error: any) {
    const errorTranslationKey = error?.response?.data?.message;
    const errorMessage = errorTranslationKey ? t(`promoPage:MESSAGE.${errorTranslationKey}`) : null;
    yield put(ToastCreators.error({ message: errorMessage, ...(!errorMessage && { error }) }));
    yield put(GeneralInfoSlice.actions.updateError());
  }
}

export function* generalInfoSaga() {
  yield takeLatest(GeneralInfoSlice.actions.update.type, watchUpdate);
}
