import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getCourierIds: {
    general: {
      city: [],
      warehouse: [],
      date: [],
    },
    courierStarRating: { rating: 0 },
    totalOrderCount: { orderCount: null },
  },
  getCourierIdsSuccess: { data: [] },
  getCourierIdsFailure: { error: null },
  newSegment: {
    name: '',
    segmentType: null,
    filter: {
      general: {
        city: [],
        warehouse: [],
        date: [],
      },
      courierStarRating: { rating: 0.5 },
      totalOrderCount: { count: 0 },
    },
    targetIds: [],
    client: null,
  },
  newSegmentSuccess: { data: [] },
  newSegmentFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COURIER_COMMUNICATION_SEGMENT.CREATE}_` });
