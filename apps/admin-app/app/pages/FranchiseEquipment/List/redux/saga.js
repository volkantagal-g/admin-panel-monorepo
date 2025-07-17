import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getFranchiseEquipmentList as getFranchiseEquipmentListApi } from '@shared/api/franchiseEquipment';

function* getFranchiseEquipmentList({ selectedWarehouses, selectedFranchises, isArchived }) {
  try {
    const data = yield call(getFranchiseEquipmentListApi, {
      selectedWarehouses,
      selectedFranchises,
      isArchived,
    });
    yield put(Creators.getFranchiseEquipmentListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFranchiseEquipmentListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* franchiseEquipmentListRequest() {
  yield takeLatest(Types.GET_FRANCHISE_EQUIPMENT_LIST_REQUEST, getFranchiseEquipmentList);
}

export default function* franchiseEquipmentListRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(franchiseEquipmentListRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
