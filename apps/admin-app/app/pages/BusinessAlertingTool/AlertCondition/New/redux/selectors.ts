import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.ALERT_CONDITION.NEW;
type StateType = { [x: string]: any }

export const alertConditionSelector = { getAlertCondition: (state: StateType) => state?.[reducerKey]?.alertCondition };

export const operationHoursByDomainTypeSelector = {
  getOperationHoursByDomainType: (
    state: StateType,
  ) => state?.[reducerKey]?.operationHoursByDomainType?.data || [],
  getIsPending: (state: StateType) => (
    state?.[reducerKey]?.operationHoursByDomainType?.isPending
  ),
};

export const getSelectedHours = {
  tempDefinedHours: (
    state: StateType,
  ) => state?.[reducerKey]?.tempDefinedHours?.data || {},
};
