// Will be selector file

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ASSET_MANAGEMENT_MODULES.COMPLIANCE_RECORD;

export const vehicleInspectionSelector = {
  getData: (state: any) => state[reducerKey]?.vehicleInspection.data,
  getIsPending: (state: any) => state[reducerKey]?.vehicleInspection.isPending,
};

export const vehicleInsuranceSelector = {
  getData: (state: any) => state[reducerKey]?.vehicleInsurance.data,
  getIsPending: (state: any) => state[reducerKey]?.vehicleInsurance.isPending,
};

export const vehicleCoverageSelector = {
  getData: (state: any) => state[reducerKey]?.vehicleCoverage.data,
  getIsPending: (state: any) => state[reducerKey]?.vehicleCoverage.isPending,
};
