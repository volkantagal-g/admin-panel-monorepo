import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ASSET_MANAGEMENT_MODULES.TRAFFIC_PENALTY}_`;

export const { Types, Creators } = createActions({
  filterTrafficPenaltyRequest: { assetId: null },
  filterTrafficPenaltySuccess: { trafficPenalty: null },
  filterTrafficPenaltyFailure: { error: null },

  createTrafficPenaltyRequest: { trafficPenaltyRecord: null, onSuccess: null },
  createTrafficPenaltySuccess: { trafficPenaltyRecord: null },
  createTrafficPenaltyFailure: { error: null },

  updateTrafficPenaltyRequest: { trafficPenaltyRecordId: null, updateData: null, onSuccess: null },
  updateTrafficPenaltySuccess: { trafficPenaltyRecord: null },
  updateTrafficPenaltyFailure: { error: null },

  deleteTrafficPenaltyRequest: { trafficPenaltyRecordId: null, onSuccess: null },
  deleteTrafficPenaltySuccess: { trafficPenaltyRecord: null },
  deleteTrafficPenaltyFailure: { error: null },

  initContainer: null,
  destroyContainer: null,
}, { prefix });
