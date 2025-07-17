import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SEGMENT.FRAUD_MANAGEMENT}_`;

export const { Types, Creators } = createActions({
  removeClientsFromSegmentRequest: { clientIds: [], segmentId: null, email: null, onSuccess: () => {} },
  removeClientsFromSegmentSuccess: { data: null, totalCount: 0 },
  removeClientsFromSegmentFailure: { error: null },

  addClientsToSegmentRequest: { clientIds: [], segmentId: null, email: null, onSuccess: () => {} },
  addClientsToSegmentSuccess: { data: null },
  addClientsToSegmentFailure: { error: null },

  getSegmentOptionsRequest: { body: null },
  getSegmentOptionsSuccess: { data: {} },
  getSegmentOptionsFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
