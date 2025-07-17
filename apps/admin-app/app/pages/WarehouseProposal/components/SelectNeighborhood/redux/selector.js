import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.WAREHOUSE_PROPOSAL.SELECT.NEIGHBORHOOD;

export const neighborhoodsSelector = {
  getNeighborhoodData: state => state[reduxKey]?.neighborhoods.data,
  getNeighborhoodIsPending: state => state[reduxKey]?.neighborhoods.isPending,
};
