import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.INCIDENT.DETAIL;

export const incidentSelector = {
  getData: (state: { [x: string]: { incident: { data: Incident | any }; }; }) => state?.[reducerKey]?.incident?.data,
  getIsPending: (state: { [x: string]: { incident: { isPending: boolean }; }; }) => state?.[reducerKey]?.incident?.isPending,
};

export const alertConditionSelector = {
  getData: (state: { [x: string]: { alertCondition: { data: AlertCondition | any }; }; }) => state?.[reducerKey]?.alertCondition?.data,
  getIsPending: (state: { [x: string]: { alertCondition: { isPending: boolean }; }; }) => state?.[reducerKey]?.alertCondition?.isPending,
};
