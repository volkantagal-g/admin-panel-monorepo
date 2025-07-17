import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  highLevelDysList: {
    data: [],
    total: 0,
    isPending: false,
  },
  lineChartList: {
    data: [],
    isPending: false,
  },
  barChartList: {
    data: [],
    isPending: false,
  },
};

export const getHighLevelDysListRequest = state => {
  return {
    ...state,
    highLevelDysList: {
      ...state.highLevelDysList,
      isPending: true,
    },
  };
};

export const getHighLevelDysListSuccess = (state, { data = [], total = 0 }) => {
  return {
    ...state,
    highLevelDysList: {
      ...state.highLevelDysList,
      data,
      total,
      isPending: false,
    },
  };
};

export const getHighLevelDysListFailure = state => {
  return {
    ...state,
    highLevelDysList: {
      ...state.highLevelDysList,
      data: [],
      total: 0,
      isPending: false,
    },
  };
};

export const exportHighLevelDysListRequest = state => {
  return {
    ...state,
    highLevelDysList: {
      ...state.highLevelDysList,
      isPending: true,
    },
  };
};

export const exportHighLevelDysListSuccess = state => {
  return {
    ...state,
    highLevelDysList: {
      ...state.highLevelDysList,
      isPending: false,
    },
  };
};

export const exportHighLevelDysListFailure = state => {
  return {
    ...state,
    highLevelDysList: {
      ...state.highLevelDysList,
      isPending: false,
    },
  };
};

export const getHighLevelLineChartListRequest = state => {
  return {
    ...state,
    lineChartList: {
      ...state.lineChartList,
      isPending: true,
    },
  };
};

export const getHighLevelLineChartListSuccess = (state, { data = [] }) => {
  return {
    ...state,
    lineChartList: {
      ...state.lineChartList,
      data,
      isPending: false,
    },
  };
};

export const getHighLevelLineChartListFailure = state => {
  return {
    ...state,
    lineChartList: {
      ...state.lineChartList,
      data: [],
      isPending: false,
    },
  };
};

export const getHighLevelBarChartListRequest = state => {
  return {
    ...state,
    barChartList: {
      ...state.barChartList,
      isPending: true,
    },
  };
};

export const getHighLevelBarChartListSuccess = (state, { data = [] }) => {
  return {
    ...state,
    barChartList: {
      ...state.barChartList,
      data,
      isPending: false,
    },
  };
};

export const getHighLevelBarChartListFailure = state => {
  return {
    ...state,
    barChartList: {
      ...state.barChartList,
      data: [],
      isPending: false,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_HIGH_LEVEL_DYS_LIST_REQUEST]: getHighLevelDysListRequest,
  [Types.GET_HIGH_LEVEL_DYS_LIST_SUCCESS]: getHighLevelDysListSuccess,
  [Types.GET_HIGH_LEVEL_DYS_LIST_FAILURE]: getHighLevelDysListFailure,
  [Types.EXPORT_HIGH_LEVEL_DYS_LIST_REQUEST]: exportHighLevelDysListRequest,
  [Types.EXPORT_HIGH_LEVEL_DYS_LIST_SUCCESS]: exportHighLevelDysListSuccess,
  [Types.EXPORT_HIGH_LEVEL_DYS_LIST_FAILURE]: exportHighLevelDysListFailure,
  [Types.GET_HIGH_LEVEL_LINE_CHART_LIST_REQUEST]: getHighLevelLineChartListRequest,
  [Types.GET_HIGH_LEVEL_LINE_CHART_LIST_SUCCESS]: getHighLevelLineChartListSuccess,
  [Types.GET_HIGH_LEVEL_LINE_CHART_LIST_FAILURE]: getHighLevelLineChartListFailure,
  [Types.GET_HIGH_LEVEL_BAR_CHART_LIST_REQUEST]: getHighLevelBarChartListRequest,
  [Types.GET_HIGH_LEVEL_BAR_CHART_LIST_SUCCESS]: getHighLevelBarChartListSuccess,
  [Types.GET_HIGH_LEVEL_BAR_CHART_LIST_FAILURE]: getHighLevelBarChartListFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
