import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.MARKET_FEES.DETAILS;

export const feeDetailsSelector = {
  getIsPending: state => state[reduxKey]?.getFeeDetails?.isPending,
  getData: state => state[reduxKey]?.getFeeDetails?.data,
  getDynamicLevels: state => state[reduxKey]?.getDynamicLevels?.data,
};
