import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getFormattedAlertConditionDetails } from '../../utils';

const reducerKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.ALERT_CONDITION.DETAIL;
type StateType = { [x: string]: any }

export const getAlertConditionDetailSelector = {
  getData: createSelector(
    (state: { [x: string | number]: { alertConditionDetail: { data: AlertCondition | any }; }; }) => state?.[reducerKey]?.alertConditionDetail?.data,
    data => {
      const formattedData = getFormattedAlertConditionDetails(data);

      return formattedData || {};
    },
  ),
  getRawData: (state: { [x: string | number]: { alertConditionDetail: { data: AlertCondition | any }; }; }) => state?.[reducerKey]?.alertConditionDetail?.data,
  getIsPending: (state: { [x: string]: { alertConditionDetail: { isPending: boolean }; }; }) => state?.[reducerKey]?.alertConditionDetail?.isPending,
};

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
