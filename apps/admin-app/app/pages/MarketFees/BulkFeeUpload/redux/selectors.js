import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.MARKET_FEES.MARKET_FEES_BULK_UPLOAD;

export const bulkFeeUploadSelector = { getIsPending: state => state[reduxKey]?.bulkFeeUpload?.isPending };
