import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createWarehouseSegmentRequest: {
    name: undefined,
    isDefault: undefined,
    segmentType: undefined,
  },
  createWarehouseSegmentSuccess: null,
  createWarehouseSegmentFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.WAREHOUSE_SEGMENT.NEW}_` });
