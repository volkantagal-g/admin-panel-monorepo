import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ASSET_MANAGEMENT_MODULES.DAMAGE_RECORD;

export const vehicleDamageSelector = {
  getData: (state: any) => state?.[reducerKey]?.damageRecord?.data,
  getIsPending: (state: any) => state?.[reducerKey]?.damageRecord?.isPending,
  getIsFirstLoadDone: (state: any) => state?.[reducerKey]?.isFirstVehicleDamageLoadDone,
};
