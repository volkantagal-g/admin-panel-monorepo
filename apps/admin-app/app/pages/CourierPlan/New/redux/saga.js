import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import { createCourierPlanProcess } from '@shared/api/e2eCourierPlan';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';
import { getNewCourierPlanRequestParams } from '../../utils';

function* createCourierPlanRequest({ requestBody }) {
  try {
    const body = getNewCourierPlanRequestParams(requestBody);
    const data = yield call(createCourierPlanProcess, body);
    const planId = get(data, '_id', '');
    const path = ROUTE.E2E_COURIER_PLAN_PROCEED.path.replace(':id', planId);
    history.push(path);
    yield put(Creators.createCourierPlanSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createCourierPlanFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateCourierPlanRequest() {
  yield takeLatest(Types.CREATE_COURIER_PLAN_REQUEST, createCourierPlanRequest);
}

export default function* courierPlanRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([fork(watchCreateCourierPlanRequest)]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
