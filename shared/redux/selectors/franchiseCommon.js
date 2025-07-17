import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.COMMON;

export const getFranchiseAreasSelector = {
  getData: state => state[reducerKey]?.getFranchiseAreas?.data,
  getIsPending: state => state[reducerKey]?.getFranchiseAreas?.isPending,
};
