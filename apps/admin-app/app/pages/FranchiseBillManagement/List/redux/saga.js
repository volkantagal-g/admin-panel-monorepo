import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import {
  getFranchiseBillList as getFranchiseBillListApi,
  exportFranchiseBillList as exportFranchiseBillListApi,
} from '@shared/api/franchiseBillManagement';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getFranchiseBillManagementListRequest({
  franchiseId,
  warehouseIds,
  domainTypes,
  lastReadDateRange,
  limit,
  offset,
}) {
  try {
    const { data, count } = yield call(getFranchiseBillListApi, {
      franchiseId,
      warehouseIds,
      domainTypes,
      lastReadDateRange,
      limit,
      offset,
    });
    yield put(Creators.getFranchiseBillManagementListSuccess({ data, total: count }));
  }
  catch (error) {
    yield put(Creators.getFranchiseBillManagementListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportFranchiseBillListRequest({ lang, domainTypes, franchiseId, warehouseIds, lastReadDateRange }) {
  try {
    const { url } = yield call(exportFranchiseBillListApi, {
      lang,
      domainTypes,
      franchiseId,
      warehouseIds,
      lastReadDateRange,
    });
    yield window.open(url);
    yield put(Creators.exportFranchiseBillListSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.exportFranchiseBillListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchFranchiseBillManagementListRequest() {
  yield takeLatest(Types.GET_FRANCHISE_BILL_MANAGEMENT_LIST_REQUEST, getFranchiseBillManagementListRequest);
}

function* watchExportFranchiseBillListRequest() {
  yield takeLatest(Types.EXPORT_FRANCHISE_BILL_LIST_REQUEST, exportFranchiseBillListRequest);
}

export default function* franchiseBillManagementListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFranchiseBillManagementListRequest),
      fork(watchExportFranchiseBillListRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
