import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.WAREHOUSE_PROPOSAL.SELECT.DISTRICT;

export const districtsSelector = {
  getDistrictData: state => state[reduxKey]?.districts.data,
  getDistrictIsPending: state => state[reduxKey]?.districts.isPending,
};
