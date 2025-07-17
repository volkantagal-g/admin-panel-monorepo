import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  ActivateChildPromosResponse,
  AddChildrenResponse,
  ChildrenPromosSlice,
  DeactivateChildPromosResponse,
  TableChangePayload,
} from '@app/pages/Promo/Detail/components/ChildPromos/slice';
import { activateChildPromos, addChildrenPromo, deactivateChildPromos, removeChildrenPromo } from '@shared/api/promo';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { t } from '@shared/i18n';
import { BulkOpMessage, ChildPromo } from '@app/pages/Promo/types';
import { watchChildrenOfParentPromoRequest } from '@app/pages/Promo/Detail/redux/sagaV2';
import { createToastError, sortByCreatedAt } from '@app/pages/Promo/utils';
import { selectFilteredPromos } from '@app/pages/Promo/Detail/components/ChildPromos/selectors';

function* watchAddSelectedPromos() {
  try {
    const promoIds: MongoIDType[] = yield select(ChildrenPromosSlice.selectors.addRemoveSelected);
    const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    const { addChildrenPromos }: AddChildrenResponse = yield call(addChildrenPromo, { id, promoIds });
    yield put(ChildrenPromosSlice.actions.displayBulkResultTable(addChildrenPromos));
    yield put(ChildrenPromosSlice.actions.changeTable({ fetch: true }));
    if (!addChildrenPromos.some(promo => promo.message === BulkOpMessage.Success)) {
      yield put(ToastCreators.error({ message: t('promoPage:MESSAGE.NO_PROMO_WAS_ADDED_ERROR') }));
    }
    else {
      yield put(ToastCreators.success({ message: t('promoPage:CHILD_PROMOS.CHILDREN_PROMOS_ADDED_SUCCESSFULLY') }));
    }
  }
  catch (error) {
    yield put(createToastError(error));
  }
  finally {
    yield put(ChildrenPromosSlice.actions.resolveAddRemovePromos());
  }
}

function* watchRemoveSelectedPromos(
  { payload }: ReturnType<typeof ChildrenPromosSlice.actions.removeSelectedPromos>,
) {
  try {
    const promoIds: MongoIDType[] = payload === 'modal' ?
      yield select(ChildrenPromosSlice.selectors.addRemoveSelected) : yield select(ChildrenPromosSlice.selectors.selected);
    const id: MongoIDType = yield select(PromoDetailSlice.selectors.promoId);
    if (payload === 'table') {
      yield put(ChildrenPromosSlice.actions.setTableLoading(true));
    }
    yield call(removeChildrenPromo, { id, promoIds });
    yield put(ToastCreators.success({ message: t('promoPage:CHILD_PROMOS.CHILDREN_PROMOS_REMOVED_SUCCESSFULLY') }));
    if (payload === 'table') {
      yield put(ChildrenPromosSlice.actions.setTableLoading(false));
    }
    yield put(ChildrenPromosSlice.actions.changeTable({ fetch: true }));
  }
  catch (error) {
    yield put(createToastError(error));
  }
  finally {
    yield put(ChildrenPromosSlice.actions.resolveAddRemovePromos());
    if (payload === 'table') {
      yield put(ChildrenPromosSlice.actions.setTableLoading(false));
    }
  }
}

function* watchChangeTable(
  action: ReturnType<typeof ChildrenPromosSlice.actions.changeTable>,
) {
  try {
    const tableParams: TableChangePayload = yield select(ChildrenPromosSlice.selectors.getTableParams);
    const page = (tableParams.current ?? 0) - 1;
    const limit = (tableParams.pageSize ?? 0);

    if (action.payload.fetch) {
      yield call(watchChildrenOfParentPromoRequest);
    }
    const data: ChildPromo[] = yield select(selectFilteredPromos);
    yield put(ChildrenPromosSlice.actions.setData(data.sort(sortByCreatedAt).slice(page * limit, (page + 1) * limit)));
  }
  catch (error) {
    yield put(createToastError(error));
    yield put(ChildrenPromosSlice.actions.setData(null));
  }
}

function* watchActivateChildPromosRequest() {
  try {
    const promoIds: MongoIDType[] = yield select(ChildrenPromosSlice.selectors.selected);
    const response: ActivateChildPromosResponse = yield call(activateChildPromos, { body: { promoIds } });
    yield put(ChildrenPromosSlice.actions.displayBulkResultTable(response.activateChildPromos));
    yield put(ChildrenPromosSlice.actions.changeTable({ fetch: true }));
  }
  catch (error) {
    yield put(createToastError(error));
  }
  finally {
    yield put(ChildrenPromosSlice.actions.activateChildPromosResolve());
  }
}

function* watchDeactivateChildPromosRequest() {
  try {
    const promoIds: MongoIDType[] = yield select(ChildrenPromosSlice.selectors.selected);
    const response: DeactivateChildPromosResponse = yield call(deactivateChildPromos, { body: { promoIds } });
    yield put(ChildrenPromosSlice.actions.displayBulkResultTable(response.deactivateChildPromos));
    yield put(ChildrenPromosSlice.actions.changeTable({ fetch: true }));
  }
  catch (error) {
    yield put(createToastError(error));
  }
  finally {
    yield put(ChildrenPromosSlice.actions.deactivateChildPromosResolve());
  }
}

export function* childrenPromosSaga() {
  yield takeLatest(ChildrenPromosSlice.actions.addSelectedPromos.type, watchAddSelectedPromos);
  yield takeLatest(ChildrenPromosSlice.actions.removeSelectedPromos.type, watchRemoveSelectedPromos);
  yield takeLatest(ChildrenPromosSlice.actions.changeTable.type, watchChangeTable);
  yield takeLatest(ChildrenPromosSlice.actions.activateChildPromosRequest.type, watchActivateChildPromosRequest);
  yield takeLatest(ChildrenPromosSlice.actions.deactivateChildPromosRequest.type, watchDeactivateChildPromosRequest);
}
