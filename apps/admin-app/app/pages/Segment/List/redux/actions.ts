import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SEGMENT.LIST}_`;

export const { Types, Creators } = createActions({
  getSegmentsRequest: { limit: null, offset: null, search: null },
  getSegmentsSuccess: { data: null, totalCount: 0 },
  getSegmentsFailure: { error: null },
  deleteSegmentRequest: { segment: null },
  deleteSegmentSuccess: { data: null },
  deleteSegmentFailure: { error: null },

  resetClientsOfSegmentRequest: { segment: null },
  resetClientsOfSegmentSuccess: { data: null },
  resetClientsOfSegmentFailure: { error: null },

  addSegmentToClientsRequest: { segment: null, loadedBase64File: null, loadedFile: null, onFinish: null },
  addSegmentToClientsSuccess: {},
  addSegmentToClientsFailure: { error: null },

  removeSegmentFromClientsRequest: { pendingMessage: null, segment: null, clientIds: null, onFinish: null },
  removeSegmentFromClientsSuccess: {},
  removeSegmentFromClientsFailure: { error: null },

  sendSegmentListAudienceInfoMailRequest: { email: null, segmentNumbers: null, onSuccess: null },
  sendSegmentListAudienceInfoMailSuccess: { data: null },
  sendSegmentListAudienceInfoMailFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
