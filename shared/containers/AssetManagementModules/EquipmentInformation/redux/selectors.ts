import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ASSET_MANAGEMENT_MODULES.EQUIPMENT_INFORMATION;

export const equipmentInformationSelector = {
  getData: (state: any) => state[reducerKey]?.equipmentInformation.data,
  getIsPending: (state: any) => state[reducerKey]?.equipmentInformation.loading,
  isFirstLoadDone: (state: any) => state[reducerKey]?.isFirstLoadDone,
};
