import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { deleteSlotPlans as deleteSlotPlansApi } from '@shared/api/slotPlanManagement';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

export function* deleteSlotPlans({ minDate, maxDate, employeeType, warehouseIds }) {
  try {
    const { data } = yield call(deleteSlotPlansApi, { minDate, maxDate, employeeType, warehouseIds });
    yield put(Creators.deleteSlotPlansSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteSlotPlansFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchDeleteSlotPlansRequest() {
  yield takeLatest(Types.DELETE_SLOT_PLANS_REQUEST, deleteSlotPlans);
}

export default function* slotPlanManagementPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchDeleteSlotPlansRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
