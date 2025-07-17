import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getAlertConditionById,
  activateAlertCondition,
  deactivateAlertCondition,
  updateAlertConditionMetadata,
  updateAlertConditionPermittedRoles,
  updateAlertConditionNotificationPreferences,
  updateAlertConditionQuery,
} from '@shared/api/businessAlertingTool/alertCondition';
import { API_GATEWAY_ERROR_CODES, COUNTRY_BASE_WORKING_HOURS } from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { getWorkingHours } from '@shared/api/workingHours';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';
import { DEFINED_HOURS_OPTIONS } from '../../components/ACRunningDays/constants';
import { operationHoursByDomainTypeSelector } from './selectors';
import { convertRunningHoursToObject, selectedPredefinedWorkingHours } from '../../utils';

function* getAlertConditionDetailRequest({ conditionId }: { conditionId: string }) {
  try {
    const { alertCondition }: { alertCondition: AlertCondition } = yield call(getAlertConditionById, { conditionId });
    yield put(Creators.getAlertConditionDetailSuccess({ data: alertCondition }));
  }
  catch (error : any) {
    yield put(Creators.getAlertConditionDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));

    if (error?.response?.data?.errorCode === API_GATEWAY_ERROR_CODES.USER_COUNTRY_NOT_MATCH) {
      history.push(ROUTE.BUSINESS_ALERTING_TOOL_ALERT_CONDITION_LIST.path);
    }
  }
}

function* watchGetAlertConditionDetailRequest() {
  yield takeLatest(Types.GET_ALERT_CONDITION_DETAIL_REQUEST as any, getAlertConditionDetailRequest);
}

function* activateAlertConditionRequest({ conditionId }: { conditionId: string }) {
  try {
    const { success }: { success: boolean } = yield call(activateAlertCondition, { conditionId });
    yield put(Creators.activateAlertConditionSuccess({ success }));
  }
  catch (error) {
    yield put(Creators.activateAlertConditionFailure({ error }));
  }
}

function* watchActivateAlertConditionRequest() {
  yield takeLatest(Types.ACTIVATE_ALERT_CONDITION_REQUEST as any, activateAlertConditionRequest);
}

function* deactivateAlertConditionRequest({ conditionId }: { conditionId: string }) {
  try {
    const { success }: { success: boolean } = yield call(deactivateAlertCondition, { conditionId });
    yield put(Creators.deactivateAlertConditionSuccess({ success }));
  }
  catch (error) {
    yield put(Creators.deactivateAlertConditionFailure({ error }));
  }
}

function* watchDeactivateAlertConditionRequest() {
  yield takeLatest(Types.DEACTIVATE_ALERT_CONDITION_REQUEST as any, deactivateAlertConditionRequest);
}

function* updateAlertConditionMetadataRequest({ conditionId, name, description }: { conditionId: string, name: any, description: any }) {
  try {
    const { success }: { success: boolean } = yield call(updateAlertConditionMetadata, { conditionId, name, description });
    // TODO: think about how to handle this in an efficient way
    if (success) {
      yield put(ToastCreators.success());
    }
    else {
      yield put(ToastCreators.error());
    }
  }
  catch (error) {
    yield put(ToastCreators.error(error));
  }
}

function* watchUpdateAlertConditionMetadataRequest() {
  yield takeLatest(Types.UPDATE_ALERT_CONDITION_METADATA_REQUEST as any, updateAlertConditionMetadataRequest);
}

function* updateAlertConditionPermittedRolesRequest({ conditionId, permittedRoles }: { conditionId: string, permittedRoles: string[] }) {
  try {
    const { success }: { success: boolean } = yield call(updateAlertConditionPermittedRoles, { conditionId, permittedRoles });
    // TODO: think about how to handle this in an efficient way
    if (success) {
      yield put(ToastCreators.success());
    }
    else {
      yield put(ToastCreators.error());
    }
  }
  catch (error) {
    yield put(ToastCreators.error(error));
  }
}

function* watchUpdateAlertConditionPermittedRolesRequest() {
  yield takeLatest(Types.UPDATE_ALERT_CONDITION_PERMITTED_ROLES_REQUEST as any, updateAlertConditionPermittedRolesRequest);
}

function* updateAlertConditionNotificationPreferencesRequest({ conditionId, notificationPreferences }: { conditionId: string, notificationPreferences: any }) {
  try {
    const { success }: { success: boolean } = yield call(updateAlertConditionNotificationPreferences, { conditionId, notificationPreferences });
    // TODO: think about how to handle this in an efficient way
    if (success) {
      yield put(ToastCreators.success());
      const { alertCondition }: { alertCondition: AlertCondition } = yield call(getAlertConditionById, { conditionId });
      yield put(Creators.getAlertConditionDetailSuccess({ data: alertCondition }));
    }
    else {
      yield put(ToastCreators.error());
    }
  }
  catch (error) {
    yield put(ToastCreators.error(error));
  }
}

function* watchUpdateAlertConditionNotificationPreferencesRequest() {
  yield takeLatest(Types.UPDATE_ALERT_CONDITION_NOTIFICATION_PREFERENCES_REQUEST as any, updateAlertConditionNotificationPreferencesRequest);
}

function* updateAlertConditionQueryRequest({ conditionId, queryInfo, conditions }: { conditionId: string, queryInfo: any, conditions: any }) {
  try {
    const { success }: { success: boolean } = yield call(updateAlertConditionQuery, { conditionId, queryInfo, conditions });
    // TODO: think about how to handle this in an efficient way
    if (success) {
      yield put(ToastCreators.success());
      const { alertCondition }: { alertCondition: AlertCondition } = yield call(getAlertConditionById, { conditionId });
      yield put(Creators.getAlertConditionDetailSuccess({ data: alertCondition }));
    }
    else {
      yield put(ToastCreators.error());
    }
  }
  catch (error) {
    yield put(ToastCreators.error(error));
  }
}

function* watchUpdateAlertConditionQueryRequest() {
  yield takeLatest(Types.UPDATE_ALERT_CONDITION_QUERY_REQUEST as any, updateAlertConditionQueryRequest);
}

function* getOperationHoursByDomainTypeRequest({ domainType }: { domainType: number }) {
  const country = yield select(getSelectedCountryV2);
  try {
    const { workingHours } = yield call(
      getWorkingHours,
      {
        domainTypes: [domainType],
        countryIds: [country?.id],
        types: [COUNTRY_BASE_WORKING_HOURS],
        fields: 'hours',
      },
    );
    yield put(Creators.getOperationHoursByDomainTypeSuccess({ data: workingHours[0]?.hours.availableTimes }));
  }
  catch (error) {
    yield put(ToastCreators.error(error));
  }
}

function* getSelectedWorkingHoursType({ data }: { data: { type: string, value?: number | string } }) {
  try {
    // get country base operation hours by domain type
    // then set temp working hours
    if (data.type === DEFINED_HOURS_OPTIONS.OPERATING_HOURS) {
      yield put(Creators.getOperationHoursByDomainTypeRequest({ domainType: data?.value }));
      yield take(Types.GET_OPERATION_HOURS_BY_DOMAIN_TYPE_SUCCESS);
      const operationHoursByDomainType = yield select(operationHoursByDomainTypeSelector.getOperationHoursByDomainType);
      const formattedOperationHoursByDomainType = convertRunningHoursToObject(operationHoursByDomainType);
      yield put(Creators.setTempDefinedHours({ data: formattedOperationHoursByDomainType }));
    }
    // get predefined working hours by type, ex: working hours, all week
    else {
      const getSelectedPredefinedWorkingHour = selectedPredefinedWorkingHours({ type: data.type });
      yield put(Creators.setTempDefinedHours({ data: getSelectedPredefinedWorkingHour }));
    }
  }
  catch (error) {
    yield put(ToastCreators.error(error));
  }
}

function* watchOperationHoursByDomainTypeRequest() {
  yield takeLatest(Types.GET_OPERATION_HOURS_BY_DOMAIN_TYPE_REQUEST as any, getOperationHoursByDomainTypeRequest);
}

function* watchSelectedWorkingHoursType() {
  yield takeLatest(Types.SELECTED_WORKING_HOURS_TYPE as any, getSelectedWorkingHoursType);
}

export default function* batAlertConditionNewPageRootSaga(): any {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAlertConditionDetailRequest),
      fork(watchActivateAlertConditionRequest),
      fork(watchDeactivateAlertConditionRequest),
      fork(watchUpdateAlertConditionMetadataRequest),
      fork(watchUpdateAlertConditionPermittedRolesRequest),
      fork(watchUpdateAlertConditionNotificationPreferencesRequest),
      fork(watchUpdateAlertConditionQueryRequest),
      fork(watchSelectedWorkingHoursType),
      fork(watchOperationHoursByDomainTypeRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);

    yield put(CommonCreators.getUserRolesReset());
  }
}
