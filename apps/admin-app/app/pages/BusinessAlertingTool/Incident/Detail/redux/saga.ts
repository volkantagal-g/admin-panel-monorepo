import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getIncidentById } from '@shared/api/businessAlertingTool/incident';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Types, Creators } from './actions';
import { getAlertConditionById } from '@shared/api/businessAlertingTool/alertCondition';
import { API_GATEWAY_ERROR_CODES } from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';

function* getIncidentByIdRequest({ incidentId }: { incidentId: string }) {
  try {
    const incident: Incident = yield call(getIncidentById, { incidentId });
    yield put(Creators.getIncidentByIdSuccess({ data: incident }));
  }
  catch (error: any) {
    yield put(Creators.getIncidentByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
    if (error?.response?.data?.errorCode === API_GATEWAY_ERROR_CODES.USER_COUNTRY_NOT_MATCH) {
      history.push(ROUTE.BUSINESS_ALERTING_TOOL_INCIDENT_LIST.path);
    }
  }
}

function* getAlertConditionByIdRequest({ conditionId }: { conditionId: string }) {
  try {
    const { alertCondition }: { alertCondition: AlertCondition } = yield call(getAlertConditionById, { conditionId });
    yield put(Creators.getAlertConditionByIdSuccess({ data: alertCondition }));
  }
  catch (err) {
    yield put(Creators.getAlertConditionByIdFailure({ err }));
    yield put(ToastCreators.error(err));
  }
}

function* watchGetIncidentByIdRequest() {
  yield takeLatest(Types.GET_INCIDENT_BY_ID_REQUEST as any, getIncidentByIdRequest);
}

function* watchGetAlertConditionByIdRequest() {
  yield takeLatest(Types.GET_ALERT_CONDITION_BY_ID_REQUEST as any, getAlertConditionByIdRequest);
}

export default function* batIncidentDetailPageRootSaga(): any {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetIncidentByIdRequest),
      fork(watchGetAlertConditionByIdRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);

    yield put(CommonCreators.getUserRolesReset());
  }
}
