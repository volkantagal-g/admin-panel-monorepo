import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getEmployeesForSelectComponent } from '@shared/api/employee';
import { Creators, Types } from './actions';

import { BUSINESS_PARTNERS_SUB_DEPARTMENT_ID, DEFAULT_FIELDS, PEOPLE_DEPARTMENT_ID, DEFAULT_EMPLOYMENT_STATUSES } from '../constants';

export function* getBusinessPartners({ filters: { name } }: { filters: { name: string; }}): Generator {
  const { CancelToken } = axios;
  const cancelSource = CancelToken.source();

  try {
    // Make the API call to fetch business partners
    const requestBody = {
      name,
      limit: 10,
      offset: 0,
      fields: DEFAULT_FIELDS,
      employmentStatuses: DEFAULT_EMPLOYMENT_STATUSES,
      departmentIds: [PEOPLE_DEPARTMENT_ID],
      subDepartments: { firstLevelSub: BUSINESS_PARTNERS_SUB_DEPARTMENT_ID },
      cancelSource,
    };

    const { employees } = (yield call(getEmployeesForSelectComponent, requestBody)) as { employees: any[] } || {};

    yield put(Creators.getBusinessPartnersSuccess({ data: employees || [] }));
  }
  catch (error) {
    yield put(Creators.getBusinessPartnersFailure({ error }));
  }
}

export function* watchBusinessPartnersRequest() {
  // @ts-ignore
  yield takeLatest(Types.GET_BUSINESS_PARTNERS_REQUEST, getBusinessPartners);
}

export default function* getBusinessPartnersRoot(): Generator {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks: unknown = yield all([
      fork(watchBusinessPartnersRequest),
    ]);

    yield take(Types.DESTROY_CONTAINER);
    // @ts-ignore
    yield all(backgroundTasks.map(task => cancel(task)));
  }
}
