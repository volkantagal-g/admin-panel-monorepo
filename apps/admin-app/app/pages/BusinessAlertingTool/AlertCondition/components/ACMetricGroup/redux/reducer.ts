import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const INITIAL_STATE = {
  metricGroups: {
    data: [],
    isPending: false,
    error: null,
  },
  metricGroup: {
    data: {},
    isPending: false,
    error: null,
  },
};

const filterPermittedMetricGroupsRequest = (state: { metricGroups: any; }) => ({
  ...state,
  metricGroups: {
    ...state.metricGroups,
    isPending: true,
  },
});

const filterPermittedMetricGroupsSuccess = (state: { metricGroups: any; }, { data }: { data: ACMetricGroup[] }) => ({
  ...state,
  metricGroups: {
    ...state.metricGroups,
    isPending: false,
    data,
  },
});

const filterPermittedMetricGroupsFailure = (state: { metricGroups: any; }, { error }: { error: any }) => ({
  ...state,
  metricGroups: {
    ...state.metricGroups,
    isPending: false,
    error,
  },
});

const getMetricGroupRequest = (state: { metricGroup: any; }) => ({
  ...state,
  metricGroup: {
    ...state.metricGroup,
    isPending: true,
  },
});

const getMetricGroupSuccess = (state: { metricGroup: any; }, { data }: { data: ACMetricGroup }) => ({
  ...state,
  metricGroup: {
    ...state.metricGroup,
    isPending: false,
    data,
  },
});

const getMetricGroupFailure = (state: { metricGroup: any; }, { error }: { error: any }) => ({
  ...state,
  metricGroup: {
    ...state.metricGroup,
    isPending: false,
    error,
  },
});

const resetMetricGroup = (state: any) => ({
  ...state,
  metricGroup: { ...INITIAL_STATE.metricGroup },
});

const destroy = () => ({ ...INITIAL_STATE });

const HANDLERS = {
  [Types.FILTER_PERMITTED_METRIC_GROUPS_REQUEST]: filterPermittedMetricGroupsRequest,
  [Types.FILTER_PERMITTED_METRIC_GROUPS_SUCCESS]: filterPermittedMetricGroupsSuccess,
  [Types.FILTER_PERMITTED_METRIC_GROUPS_FAILURE]: filterPermittedMetricGroupsFailure,
  [Types.GET_METRIC_GROUP_REQUEST]: getMetricGroupRequest,
  [Types.GET_METRIC_GROUP_SUCCESS]: getMetricGroupSuccess,
  [Types.GET_METRIC_GROUP_FAILURE]: getMetricGroupFailure,
  [Types.RESET_METRIC_GROUP]: resetMetricGroup,
  [Types.DESTROY_CONTAINER]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
