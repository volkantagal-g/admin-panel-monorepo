import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createAlertCondition } from '@shared/api/businessAlertingTool/alertCondition';
import { getWorkingHours } from '@shared/api/workingHours';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { DEFINED_HOURS_OPTIONS } from '../../components/ACRunningDays/constants';
import { convertRunningHoursToObject, selectedPredefinedWorkingHours } from '../../utils';
import { COUNTRY_BASE_WORKING_HOURS } from '@shared/shared/constants';
import { operationHoursByDomainTypeSelector } from './selectors';

function* createAlertConditionRequest({ alertCondition }: { alertCondition: { [x: string]: any } }) {
  try {
    const data = yield call(createAlertCondition, { alertCondition });
    const id = data.alertCondition._id;
    window.location.replace(`/businessAlertingTool/alertCondition/detail/${id}`);
  }
  catch (error) {
    yield put(ToastCreators.error(error));
  }
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

function* watchFilterAlertConditionsRequest() {
  yield takeLatest(Types.CREATE_ALERT_CONDITION_REQUEST as any, createAlertConditionRequest);
}

export default function* batAlertConditionNewPageRootSaga(): any {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchFilterAlertConditionsRequest),
      fork(watchSelectedWorkingHoursType),
      fork(watchOperationHoursByDomainTypeRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
