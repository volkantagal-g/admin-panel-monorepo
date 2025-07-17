import { call, put, select, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { DiscountCodeBulkEditUpdateSlice } from '@app/pages/DiscountCode/BulkEdit/slice';
import {
  GetDiscountCodesActionTypesResponse,
  UpdateDiscountCodesRequestPayload,
} from '@app/pages/DiscountCode/BulkEdit/types';
import { getDiscountCodesActionTypes, MessageResponse, updateDiscountCodes } from '@shared/api/promo/v2';
import { prepareUpdateDiscountCodesRequest } from '@app/pages/DiscountCode/BulkEdit/constants';

function* watchUpsertCodes(
  { payload: { codes, shouldFetchActionTypes } }: ReturnType<typeof DiscountCodeBulkEditUpdateSlice.actions.upsertCodes>,
) {
  if (!shouldFetchActionTypes) {
    return;
  }
  try {
    const response: GetDiscountCodesActionTypesResponse[] = yield call(getDiscountCodesActionTypes, codes);
    yield put(DiscountCodeBulkEditUpdateSlice.actions.getActionTypesSuccess(response));
  }
  catch (error: any) {
    yield put(ToastCreators.error({ message: error?.response?.data?.message || 'An error occurred' }));
    yield put(DiscountCodeBulkEditUpdateSlice.actions.getActionTypesFailure());
  }
}

function* watchUpdateRequest(
  action: ReturnType<typeof DiscountCodeBulkEditUpdateSlice.actions.updateRequest>,
) {
  try {
    const codes: string[] | null = yield select(DiscountCodeBulkEditUpdateSlice.selectors.codes);
    if (!codes) {
      yield put(DiscountCodeBulkEditUpdateSlice.actions.updateRequestFailure());
      return;
    }
    const request: UpdateDiscountCodesRequestPayload = yield call(prepareUpdateDiscountCodesRequest, codes, action.payload);
    const response: MessageResponse = yield call(updateDiscountCodes, request);
    yield put(DiscountCodeBulkEditUpdateSlice.actions.updateRequestSuccess());
    yield put(ToastCreators.success({ message: response.message, toastOptions: { autoClose: false } }));
    yield put(DiscountCodeBulkEditUpdateSlice.actions.toggleModal());
  }
  catch (error: any) {
    yield put(ToastCreators.error({ message: error?.response?.data?.message || 'An error occurred' }));
    yield put(DiscountCodeBulkEditUpdateSlice.actions.updateRequestFailure());
  }
}

export function* discountCodeBulkEditUpdateSaga() {
  yield takeLatest(DiscountCodeBulkEditUpdateSlice.actions.upsertCodes.type, watchUpsertCodes);
  yield takeLatest(DiscountCodeBulkEditUpdateSlice.actions.updateRequest.type, watchUpdateRequest);
}
