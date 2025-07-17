import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CONTENT_CREATION;

export const getContentCreationTransactionIdSelector = {
  getData: state => state?.[reducerKey]?.getContentCreationTransactionId?.data || [],
  getIsPending: state => state?.[reducerKey]?.getContentCreationTransactionId?.isPending,
  getError: state => state?.[reducerKey]?.getContentCreationTransactionId?.isError,
};

export const getContentCreationTransactionDetailsSelector = {
  getData: state => state?.[reducerKey]?.getContentCreationTransactionDetails?.data || undefined,
  getIsPending: state => state?.[reducerKey]?.getContentCreationTransactionDetails?.isPending,
  getError: state => state?.[reducerKey]?.getContentCreationTransactionDetails?.isError,
};
