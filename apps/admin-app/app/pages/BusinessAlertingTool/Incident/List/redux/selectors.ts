import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.INCIDENT.LIST;

export const filterIncidentsSelector = {
  getData: (state: { [x: string]: { incidents: { data: Incident[] | any[] }; }; }) => state?.[reducerKey]?.incidents?.data,
  getTotal: (state: { [x: string]: { incidents: { total: number }; }; }) => state?.[reducerKey]?.incidents?.total,
  getIsPending: (state: { [x: string]: { incidents: { isPending: boolean }; }; }) => state?.[reducerKey]?.incidents?.isPending,
  getFilters: (state: { [x: string]: { filters: any; }; }) => state?.[reducerKey]?.filters,
};

export const getAlertConditionsSelector = {
  getData: (state: { [x: string]: { alertConditions: { data: AlertCondition[] | any[] }; }; }) => state?.[reducerKey]?.alertConditions?.data,
  getTotal: (state: { [x: string]: { alertConditions: { total: number }; }; }) => state?.[reducerKey]?.alertConditions?.total,
  getIsPending: (state: { [x: string]: { alertConditions: { isPending: boolean }; }; }) => state?.[reducerKey]?.alertConditions?.isPending,
};
