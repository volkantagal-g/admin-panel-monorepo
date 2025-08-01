import { call, put, select, takeLatest } from 'redux-saga/effects';

import { AddParentPromosResponse, ParentPromosSlice, TableChangePayload } from '@app/pages/Promo/Detail/components/ParentPromos/slice';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { t } from '@shared/i18n';
import { addParentPromos, getParentPromos, removeParentPromos } from '@shared/api/promo';
import { createToastError, sortByCreatedAt } from '@app/pages/Promo/utils';
import { BulkOpMessage, ParentPromo } from '@app/pages/Promo/types';
import { selectFilteredPromos } from '@app/pages/Promo/Detail/components/ParentPromos/selectors';

function* watchAddSelectedPromos() {
  try {
    const promoIds: MongoIDType[] = yield select(ParentPromosSlice.selectors.addRemoveSelected);
    const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const response: AddParentPromosResponse = yield call(addParentPromos, { id, promoIds });
    yield put(ParentPromosSlice.actions.displayBulkResultTable(response.addParentPromos));
    yield put(ParentPromosSlice.actions.changeTable({ fetch: true }));
    if (!response.addParentPromos.some(promo => promo.message === BulkOpMessage.Success)) {
      yield put(ToastCreators.error({ message: t('promoPage:MESSAGE.NO_PROMO_WAS_ADDED_ERROR') }));
    }
    else {
      yield put(ToastCreators.success({ message: t('promoPage:PARENT_PROMOS.PARENT_PROMOS_ADDED_SUCCESSFULLY') }));
    }
  }
  catch (error) {
    yield put(createToastError(error));
  }
  finally {
    yield put(ParentPromosSlice.actions.resolveAddRemovePromos());
  }
}

function* watchRemoveSelectedPromos(
  { payload }: ReturnType<typeof ParentPromosSlice.actions.removeSelectedPromos>,
) {
  try {
    const promoIds: MongoIDType[] = payload === 'modal' ?
      yield select(ParentPromosSlice.selectors.addRemoveSelected) :
      yield select(ParentPromosSlice.selectors.selected);
    const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    if (payload === 'table') {
      yield put(ParentPromosSlice.actions.setTableLoading(true));
    }
    yield call(removeParentPromos, { id, promoIds });
    yield put(ToastCreators.success({ message: t('promoPage:PARENT_PROMOS.PARENT_PROMOS_REMOVED_SUCCESSFULLY') }));
    if (payload === 'table') {
      yield put(ParentPromosSlice.actions.setTableLoading(false));
    }
    yield put(ParentPromosSlice.actions.changeTable({ fetch: true }));
  }
  catch (error) {
    yield put(createToastError(error));
  }
  finally {
    yield put(ParentPromosSlice.actions.resolveAddRemovePromos());
  }
}

function* watchGetParentsRequest() {
  try {
    const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const response: { getParentPromos: ParentPromo[] } = yield call(getParentPromos, { id });
    yield put(PromoDetailSlice.actions.setParents(response.getParentPromos));
  }
  catch (error) {
    yield put(createToastError(error));
  }
  finally {
    yield put(ParentPromosSlice.actions.getParentsResolve());
  }
}

function* watchChangeTable(
  action: ReturnType<typeof ParentPromosSlice.actions.changeTable>,
) {
  try {
    const tableParams: TableChangePayload = yield select(ParentPromosSlice.selectors.getTableParams);
    const page = (tableParams.current ?? 0) - 1;
    const limit = (tableParams.pageSize ?? 0);

    if (action.payload.fetch) {
      const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
      const response: { getParentPromos: ParentPromo[] } = yield call(getParentPromos, { id });
      yield put(PromoDetailSlice.actions.setParents(response.getParentPromos));
    }
    const data: ParentPromo[] = yield select(selectFilteredPromos);
    yield put(ParentPromosSlice.actions.setData(data.sort(sortByCreatedAt).slice(page * limit, (page + 1) * limit)));
  }
  catch (error) {
    yield put(createToastError(error));
    yield put(ParentPromosSlice.actions.setData(null));
  }
}

export function* parentPromosSaga() {
  yield takeLatest(ParentPromosSlice.actions.addSelectedPromos.type, watchAddSelectedPromos);
  yield takeLatest(ParentPromosSlice.actions.removeSelectedPromos.type, watchRemoveSelectedPromos);
  yield takeLatest(ParentPromosSlice.actions.getParentsRequest.type, watchGetParentsRequest);
  yield takeLatest(ParentPromosSlice.actions.changeTable.type, watchChangeTable);
}
