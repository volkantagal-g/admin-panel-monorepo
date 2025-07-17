import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { filterCourierPlans, deleteCourierPlan } from '@shared/api/e2eCourierPlan';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* courierPlansRequest({
  name,
  startDate,
  endDate,
  limit,
  offset,
}) {
  try {
    const { records, totalCount } = yield call(filterCourierPlans, {
      name,
      startDate,
      endDate,
      limit,
      offset,
    });
    yield put(Creators.getCourierPlansSuccess({ records, totalCount }));
  }
  catch (error) {
    yield put(Creators.getCourierPlansFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCourierPlansRequest() {
  yield takeLatest(Types.GET_COURIER_PLANS_REQUEST, courierPlansRequest);
}

function* deleteCourierPlanRequest({ id }) {
  try {
    yield call(deleteCourierPlan, { id });
    yield put(Creators.deleteCourierPlanSuccess());
    yield put(ToastCreators.success());
    window.location.reload();
  }
  catch (error) {
    yield put(Creators.deleteCourierPlanFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchDeleteCourierPlanRequest() {
  yield takeLatest(Types.DELETE_COURIER_PLAN_REQUEST, deleteCourierPlanRequest);
}

export default function* courierPlansRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCourierPlansRequest),
      fork(watchDeleteCourierPlanRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
