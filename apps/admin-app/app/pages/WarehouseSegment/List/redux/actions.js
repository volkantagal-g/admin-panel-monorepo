import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getWarehouseSegmentsRequest: {
    name: undefined,
    segmentTypes: undefined,
    isDefault: undefined,
    startDate: undefined,
    endDate: undefined,
    limit: undefined,
    offset: undefined,
  },
  getWarehouseSegmentsSuccess: { data: [], total: 0 },
  getWarehouseSegmentsFailure: { error: null },
  getWarehouseSegmentReportRequest: {
    name: undefined,
    segmentTypes: undefined,
    isDefault: undefined,
    startDate: undefined,
    endDate: undefined,
  },
  getWarehouseSegmentReportSuccess: null,
  getWarehouseSegmentReportFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.WAREHOUSE_SEGMENT.LIST}_` });
