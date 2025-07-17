import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FRANCHISE_CONFIG_TYPE.DETAIL;

export const getFranchiseConfigTypeDetailSelector = {
  getData: state => state?.[reducerKey]?.franchiseConfigTypeDetail?.data,
  getError: state => state?.[reducerKey]?.franchiseConfigTypeDetail?.fetchingError,
  getIsPending: state => state?.[reducerKey]?.franchiseConfigTypeDetail?.isPending,
  getIsFetching: state => state?.[reducerKey]?.franchiseConfigTypeDetail?.isFetching,
};
