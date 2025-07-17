import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.BUSINESS_ALERTING_TOOL.METRIC_GROUP.COMPONENTS.SELECT}_`;

export const { Types, Creators } = createActions({
  filterPermittedMetricGroupsRequest: { limit: null, offset: null, fields: null },
  filterPermittedMetricGroupsSuccess: { data: [] as ACMetricGroup[] },
  filterPermittedMetricGroupsFailure: { error: null },

  getMetricGroupRequest: { metricGroupId: null },
  getMetricGroupSuccess: { data: {} as ACMetricGroup },
  getMetricGroupFailure: { error: null },

  resetMetricGroup: {},

  initContainer: null,
  destroyContainer: null,
}, { prefix });
