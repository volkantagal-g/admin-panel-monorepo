import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.ALERT_CONDITION.LIST;

export const filterAlertConditionsSelector = {
  getData: (state: { [x: string]: { alertConditions: { data: AlertCondition[] | any[] }; }; }) => state?.[reducerKey]?.alertConditions?.data,
  getTotal: (state: { [x: string]: { alertConditions: { total: number }; }; }) => state?.[reducerKey]?.alertConditions?.total,
  getIsPending: (state: { [x: string]: { alertConditions: { isPending: boolean }; }; }) => state?.[reducerKey]?.alertConditions?.isPending,
  getFilters: (state: { [x: string]: { filters: any; }; }) => state?.[reducerKey]?.filters,
};
