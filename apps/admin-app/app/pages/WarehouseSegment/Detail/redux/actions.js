import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getWarehouseSegmentRequest: { segmentId: undefined },
  getWarehouseSegmentSuccess: { data: [] },
  getWarehouseSegmentFailure: { error: null },
  getWarehousesBySegmentIdRequest: {
    segmentId: undefined,
    segmentType: undefined,
    limit: undefined,
    offset: undefined,
  },
  getWarehousesBySegmentIdSuccess: { data: [], total: 0 },
  getWarehousesBySegmentIdFailure: { error: null },
  updateWarehouseSegmentRequest: {
    segmentId: undefined,
    name: undefined,
    isDefault: undefined,
  },
  updateWarehouseSegmentSuccess: { data: {} },
  updateWarehouseSegmentFailure: { error: null },
  initPage: null,
  destroyPage: null,
},  { prefix: `${REDUX_KEY.WAREHOUSE_SEGMENT.DETAIL}_` });
