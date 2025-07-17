import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SEGMENT.DETAIL}_`;

export const { Types, Creators } = createActions({
  getSegmentRequest: { segment: null },
  getSegmentSuccess: { data: null },
  getSegmentFailure: { error: null },
  getSegmentClientCountRequest: { segment: null },
  getSegmentClientCountSuccess: { data: null },
  getSegmentClientCountFailure: { error: null },
  updateSegmentRequest: { segment: null, updateData: null },
  updateSegmentSuccess: { data: null },
  updateSegmentFailure: { error: null },
  deleteSegmentRequest: { segment: null, onSuccess: null },
  deleteSegmentSuccess: { data: null },
  deleteSegmentFailure: { error: null },
  resetClientsOfSegmentRequest: { segment: null },
  resetClientsOfSegmentSuccess: { data: null },
  resetClientsOfSegmentFailure: { error: null },
  updateExpirationStatusRequest: { segment: null, updateData: null },
  updateExpirationStatusSuccess: { data: null },
  updateExpirationStatusFailure: { error: null },
  updateIndefiniteExpirationRequest: { segment: null, updateData: null },
  updateIndefiniteExpirationSuccess: { data: null },
  updateIndefiniteExpirationFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
