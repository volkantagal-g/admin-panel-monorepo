import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getQualityDepartmentEmployees } from '@shared/api/employee';
import { Types, Creators } from './actions';

function* qualityDepartmentPeopleRequest() {
  try {
    const { employees } = yield call(getQualityDepartmentEmployees);
    yield put(Creators.getQualityDepartmentPeopleSuccess({ data: employees }));
  }
  catch (error) {
    yield put(Creators.getQualityDepartmentPeopleFailure({ error }));
  }
}

function* watchQualityDepartmentPeopleRequest() {
  yield takeLatest(Types.GET_QUALITY_DEPARTMENT_PEOPLE_REQUEST, qualityDepartmentPeopleRequest);
}

export default function* getQualityDepartmentPeopleRoot() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchQualityDepartmentPeopleRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
