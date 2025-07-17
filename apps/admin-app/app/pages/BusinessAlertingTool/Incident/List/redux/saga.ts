import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { filterIncidents } from '@shared/api/businessAlertingTool/incident';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { filterAlertConditions } from '@shared/api/businessAlertingTool/alertCondition';

import { Types, Creators } from './actions';

function* filterIncidentsRequest({ filters }: { filters: { [x:string]: any } }) {
  try {
    const {
      statuses,
      priority,
      createdAtRange,
      alertCondition,
      limit,
      offset,
      sortDirection,
      sortKey,
    } = filters;
    const { incidents, total }: { incidents: Incident[], total: number } = yield call(filterIncidents, {
      statuses: statuses ? [statuses] : undefined,
      priority: priority || undefined,
      createdAtRangeStart: !isEmpty(createdAtRange) ? createdAtRange[0]?.startOf('day').toISOString() : undefined,
      createdAtRangeEnd: !isEmpty(createdAtRange) ? createdAtRange[1]?.endOf('day').toISOString() : undefined,
      alertConditions: alertCondition ? [alertCondition] : undefined,
      limit,
      offset,
      fields: 'closedAt',
      sortKey,
      sortDirection,
    });
    yield put(Creators.filterIncidentsSuccess({ data: incidents, total }));
  }
  catch (err) {
    yield put(Creators.filterIncidentsFailure({ err }));
    yield put(ToastCreators.error(err));
  }
}

function* getAlertConditionsRequest() {
  try {
    const { alertConditions, total }: { alertConditions: AlertCondition[], total: number } = yield call(filterAlertConditions, {
      limit: 1000, // for now its just 1000 but we need an endpoint for getting users all alert conditions in once
      offset: 0,
    });
    yield put(Creators.getAlertConditionsSuccess({ data: alertConditions, total }));
  }
  catch (err) {
    yield put(Creators.getAlertConditionsFailure({ err }));
    yield put(ToastCreators.error(err));
  }
}

function* watchFilterIncidentsRequest() {
  yield takeLatest(Types.FILTER_INCIDENTS_REQUEST as any, filterIncidentsRequest);
}

function* watchGetAlertConditionsRequest() {
  yield takeLatest(Types.GET_ALERT_CONDITIONS_REQUEST as any, getAlertConditionsRequest);
}

export default function* batIncidentListPageRootSaga(): any {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFilterIncidentsRequest),
      fork(watchGetAlertConditionsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
