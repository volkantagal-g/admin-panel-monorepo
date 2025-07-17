import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FRANCHISE_LEGAL.NEW;

export const uploadFranchiseLegalSelector = {
  getIsPending: state => state?.[reducerKey]?.uploadFranchiseLegal?.isPending,
  getIsSuccess: state => state?.[reducerKey]?.uploadFranchiseLegal?.isSuccess,
};
