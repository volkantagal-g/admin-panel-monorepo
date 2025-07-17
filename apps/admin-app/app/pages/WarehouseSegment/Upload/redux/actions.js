import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  uploadWarehouseSegmentMatchingRequest: {
    data: undefined,
    contentType: undefined,
    fileName: undefined,
    segmentType: undefined,
  },
  uploadWarehouseSegmentMatchingSuccess: null,
  uploadWarehouseSegmentMatchingFailure: null,
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.WAREHOUSE_SEGMENT.UPLOAD}_` });
