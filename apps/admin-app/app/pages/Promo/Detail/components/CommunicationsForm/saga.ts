import { call, put, select, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { AICommunicationsSlice } from '@app/pages/Promo/Detail/components/CommunicationsForm/slice';
import { generateComms, getCommsStatus } from '@shared/api/aiContentGeneration';
import { AICommunicationsDetails } from '@app/pages/Promo/types';
import { updateCommsStatus } from '@shared/api/promo';

function* watchGetAICommunicationsStatusRequest() {
  try {
    const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const data: AICommunicationsDetails = yield call(getCommsStatus, { id });
    yield put(PromoDetailSlice.actions.updateAICommunicationsStatus(data));
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    yield put(AICommunicationsSlice.actions.getAICommunicationsStatusResolve());
  }
}

function* watchGenerateAICommunicationsRequest(
  {
    payload: {
      isCommsEnabled,
      assets,
      description,
    },
  }: ReturnType<typeof AICommunicationsSlice.actions.generateAICommunicationsRequest>,
) {
  try {
    const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const promoCode: string = yield select(PromoDetailSlice.selectors.promoCode);
    const domains: number[] = yield select(PromoDetailSlice.selectors.domainTypes);
    const countryId: MongoIDType = yield select(PromoDetailSlice.selectors.country);

    if (!isCommsEnabled) {
      yield call(updateCommsStatus, { id, body: { isCommsEnabled } });
    }
    else {
      yield call(updateCommsStatus, { id, body: { isCommsEnabled } });
      yield call(generateComms, { id, promoCode, description, assets, domains, countryId });
    }
    yield put(AICommunicationsSlice.actions.getAICommunicationsStatusRequest());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
  finally {
    yield put(AICommunicationsSlice.actions.generateAICommunicationsResolve());
  }
}

export function* aiCommunicationsSaga() {
  yield takeLatest(AICommunicationsSlice.actions.getAICommunicationsStatusRequest.type, watchGetAICommunicationsStatusRequest);
  yield takeLatest(AICommunicationsSlice.actions.generateAICommunicationsRequest.type, watchGenerateAICommunicationsRequest);
}
