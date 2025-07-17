import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MARKET_FEES.DETAILS}_`;

export const { Types, Creators } = createActions(
  {
    getFeeDetailsRequest: { warehouseId: null },
    getFeeDetailsSuccess: { data: [] },
    getFeeDetailsFailure: { error: null },
    getDynamicLevelsRequest: { warehouseId: null },
    getDynamicLevelsSuccess: { data: [] },
    getDynamicLevelsFailure: { error: null },
    initPage: null,
    destroyPage: null,
    updateDynamicDeliveryLevel: { dynamicDeliveryLevel: null },
    updateDynamicServiceLevel: { dynamicServiceLevel: null },
    startListeningSocketEvents: { warehouseId: null },
    stopListeningSocketEvents: { warehouseId: null },
  },
  { prefix },
);
