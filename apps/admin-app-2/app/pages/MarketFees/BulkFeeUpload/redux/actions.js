import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    initPage: null,
    destroyPage: null,
    marketFeesBulkUploadRequest: { fees: {}, onSuccess: null },
    marketFeesBulkUploadSuccess: { data: {} },
    marketFeesBulkUploadFailure: { error: null },
    basketAmountBulkUploadRequest: { basketAmounts: [], onSuccess: null },
    basketAmountBulkUploadSuccess: { data: {} },
    basketAmountBulkUploadFailure: { error: null },
  },
  { prefix: `${REDUX_KEY.MARKET_FEES.MARKET_FEES_BULK_UPLOAD}_` },
);
