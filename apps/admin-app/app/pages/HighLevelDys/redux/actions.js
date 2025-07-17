import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.HIGH_LEVEL_DYS}_`;

export const { Types, Creators } = createActions({
  getHighLevelDysListRequest: { filters: undefined, limit: undefined, offset: undefined },
  getHighLevelDysListSuccess: { data: null, total: 0 },
  getHighLevelDysListFailure: { error: null },
  exportHighLevelDysListRequest: { filters: undefined },
  exportHighLevelDysListSuccess: {},
  exportHighLevelDysListFailure: { error: null },
  getHighLevelLineChartListRequest: { filters: undefined },
  getHighLevelLineChartListSuccess: { data: null },
  getHighLevelLineChartListFailure: { error: null },
  getHighLevelBarChartListRequest: { filters: undefined },
  getHighLevelBarChartListSuccess: { data: null },
  getHighLevelBarChartListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
