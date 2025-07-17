import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.METRIC_GROUP.COMPONENTS.SELECT;

export const filterMetricGroupsSelector = {
  getData: (state: { [x: string]: { metricGroups: { data: any[]; }; }; }) => state?.[reducerKey]?.metricGroups?.data,
  getIsPending: (state: { [x: string]: { metricGroups: { isPending: boolean; }; }; }) => state?.[reducerKey]?.metricGroups?.isPending,
};

export const getMetricGroupSelector = {
  getData: (state: { [x: string]: { metricGroup: { data: ACMetricGroup }; }; }) => state?.[reducerKey]?.metricGroup?.data,
  getIsPending: (state: { [x: string]: { metricGroup: { isPending: boolean }; }; }) => state?.[reducerKey]?.metricGroup?.isPending,
};
