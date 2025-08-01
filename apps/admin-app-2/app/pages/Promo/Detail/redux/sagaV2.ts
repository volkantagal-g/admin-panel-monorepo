import { call, put, select, takeLatest } from 'redux-saga/effects';

import { getChildPromosV2, getPromoById, updateStatusV2 } from '@shared/api/promo';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { ChildPromo, Promo, PromoStatus } from '../../types';
import { createToastError } from '@app/pages/Promo/utils';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

function* watchGetPromoByIdRequest(action: ReturnType<typeof PromoDetailSlice.actions.getPromoByIdRequest>) {
  try {
    const response: { promo: Promo } = yield call(getPromoById, { id: action.payload.id });
    yield put(PromoDetailSlice.actions.getPromoByIdSuccess(response));
  }
  catch (error) {
    yield put(PromoDetailSlice.actions.getPromoByIdFailure(error as string));
    yield put(createToastError(error));
  }
}

export function* watchChildrenOfParentPromoRequest() {
  try {
    const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);

    const data: ChildPromo[] = yield call(getChildPromosV2, {
      parentId: id,
      status: undefined,
    });
    yield put(PromoDetailSlice.actions.setChildren(data));
  }
  catch (error) {
    yield put(createToastError(error));
  }
}

function* watchToggleStatusRequest() {
  try {
    const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const status: PromoStatus = yield select(PromoDetailSlice.selectors.status);
    const newStatus = status === PromoStatus.Active ? PromoStatus.Inactive : PromoStatus.Active;
    yield call(updateStatusV2, { id, status: newStatus });
    yield put(PromoDetailSlice.actions.toggleStatusSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(PromoDetailSlice.actions.toggleStatusFailure());
    yield put(createToastError(error));
  }
}

export function* promoDetailSaga() {
  yield takeLatest(PromoDetailSlice.actions.getPromoByIdRequest.type, watchGetPromoByIdRequest);
  yield takeLatest(PromoDetailSlice.actions.getChildrenOfParentPromoRequest.type, watchChildrenOfParentPromoRequest);
  yield takeLatest(PromoDetailSlice.actions.toggleStatusRequest.type, watchToggleStatusRequest);
}
