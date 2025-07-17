import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ASSET_MANAGEMENT_MODULES.TRAFFIC_PENALTY;

export const vehicleTrafficPenaltySelector = {
  getData: (state: any) => state?.[reducerKey]?.trafficPenaltyRecord?.data,
  getIsPending: (state: any) => state?.[reducerKey]?.trafficPenaltyRecord?.isPending,
  getIsFirstLoadDone: (state: any) => state?.[reducerKey]?.isFirstLoadDone,
};
