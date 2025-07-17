import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FRANCHISE_EARNINGS.UPLOAD;

export const uploadFranchiseEarningsSelector = {
  getIsPending: state => state?.[reducerKey]?.uploadFranchiseEarnings?.isPending,
  getIsSuccess: state => state?.[reducerKey]?.uploadFranchiseEarnings?.isSuccess,
};
