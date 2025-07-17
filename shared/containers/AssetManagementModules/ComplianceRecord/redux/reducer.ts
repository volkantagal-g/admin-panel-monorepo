import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { VehicleComplianceRecord } from '@shared/containers/AssetManagementModules/types';

export type State = {
  vehicleInspection: {
    isPending: boolean;
    data: any;
    error: Error | Object | undefined;
  }
  vehicleInsurance: {
    isPending: boolean;
    data: any;
    error: Error | Object | undefined;
  }
  vehicleCoverage: {
    isPending: boolean;
    data: any;
    error: Error | Object | undefined;
  }

}

export const INITIAL_STATE: State = {
  vehicleInspection: {
    isPending: false,
    data: null,
    error: undefined,
  },
  vehicleInsurance: {
    isPending: false,
    data: null,
    error: undefined,
  },
  vehicleCoverage: {
    isPending: false,
    data: null,
    error: undefined,
  },
};

// Vehicle Inspection
export const filterVehicleInspectionRequest = (state: State) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      isPending: true,
    },
  };
};

export const filterVehicleInspectionSuccess = (state: State, { vehicleInspections }: {vehicleInspections: VehicleComplianceRecord[]}) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      data: vehicleInspections,
      isPending: false,
    },
  };
};

export const filterVehicleInspectionFailure = (state: State, { error }: {error: Error }) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      isPending: false,
      error,
    },
  };
};

export const createVehicleInspectionRequest = (state: State) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      isPending: true,
    },
  };
};

export const createVehicleInspectionSuccess = (state: State) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      data: null,
      isPending: false,
    },
  };
};

export const createVehicleInspectionFailure = (state: State) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      error: undefined,
      isPending: false,
    },
  };
};

export const updateVehicleInspectionRequest = (state: State) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      isPending: true,
    },
  };
};

export const updateVehicleInspectionSuccess = (state: State) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      isPending: false,
    },
  };
};

export const updateVehicleInspectionFailure = (state: State) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      isPending: false,
    },
  };
};

export const deleteVehicleInspectionRequest = (state: State) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      isPending: true,
    },
  };
};

export const deleteVehicleInspectionSuccess = (state: State) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      isPending: false,
    },
  };
};

export const deleteVehicleInspectionFailure = (state: State, { error }: { error: Error }) => {
  return {
    ...state,
    vehicleInspection: {
      ...state.vehicleInspection,
      isPending: false,
      error,
    },
  };
};

// Vehicle Insurance
export const filterVehicleInsuranceRequest = (state: State) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      isPending: true,
    },
  };
};

export const filterVehicleInsuranceSuccess = (state: State, { vehicleInsurances }: {vehicleInsurances: any}) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      data: vehicleInsurances,
      isPending: false,
    },
  };
};

export const filterVehicleInsuranceFailure = (state: State, { error }: {error: Error}) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      isPending: false,
      error,
    },
  };
};

export const createVehicleInsuranceRequest = (state: State) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      isPending: true,
    },
  };
};

export const createVehicleInsuranceSuccess = (state: State) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      isPending: false,
    },
  };
};

export const createVehicleInsuranceFailure = (state: State, { error }: {error: Error}) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      isPending: false,
      error,
    },
  };
};

export const updateVehicleInsuranceRequest = (state: State) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      isPending: true,
    },
  };
};

export const updateVehicleInsuranceSuccess = (state: State) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      isPending: false,
    },
  };
};

export const updateVehicleInsuranceFailure = (state: State) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      isPending: false,
    },
  };
};

export const deleteVehicleInsuranceRequest = (state: State) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      isPending: true,
    },
  };
};

export const deleteVehicleInsuranceSuccess = (state: State) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      isPending: false,
    },
  };
};

export const deleteVehicleInsuranceFailure = (state: State) => {
  return {
    ...state,
    vehicleInsurance: {
      ...state.vehicleInsurance,
      isPending: false,
    },
  };
};

// Vehicle Coverage
export const createVehicleCoverageRequest = (state: State) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      isPending: true,
    },
  };
};

export const createVehicleCoverageSuccess = (state: State) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      data: null,
      isPending: false,
    },
  };
};

export const createVehicleCoverageFailure = (state: State) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      error: undefined,
      isPending: false,
    },
  };
};

export const filterVehicleCoverageRequest = (state: State) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      isPending: true,
    },
  };
};

export const filterVehicleCoverageSuccess = (state: State, { vehicleCoverages }: { vehicleCoverages: any }) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      data: vehicleCoverages,
      isPending: false,
    },
  };
};

export const filterVehicleCoverageFailure = (state: State, { error }: { error: Error }) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      isPending: false,
      error,
    },
  };
};

export const updateVehicleCoverageRequest = (state: State) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      isPending: true,
    },
  };
};

export const updateVehicleCoverageSuccess = (state: State) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      isPending: false,
    },
  };
};

export const updateVehicleCoverageFailure = (state: State) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      isPending: false,
    },
  };
};

export const deleteVehicleCoverageRequest = (state: State) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      isPending: true,
    },
  };
};

export const deleteVehicleCoverageSuccess = (state: State) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      isPending: false,
    },
  };
};

export const deleteVehicleCoverageFailure = (state: State) => {
  return {
    ...state,
    vehicleCoverage: {
      ...state.vehicleCoverage,
      isPending: false,
    },
  };
};
export const destroyContainer = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  // Vehicle Inspection
  [Types.FILTER_VEHICLE_INSPECTION_REQUEST]: filterVehicleInspectionRequest,
  [Types.FILTER_VEHICLE_INSPECTION_SUCCESS]: filterVehicleInspectionSuccess,
  [Types.FILTER_VEHICLE_INSPECTION_FAILURE]: filterVehicleInspectionFailure,

  [Types.CREATE_VEHICLE_INSPECTION_REQUEST]: createVehicleInspectionRequest,
  [Types.CREATE_VEHICLE_INSPECTION_SUCCESS]: createVehicleInspectionSuccess,
  [Types.CREATE_VEHICLE_INSPECTION_FAILURE]: createVehicleInspectionFailure,

  [Types.UPDATE_VEHICLE_INSPECTION_REQUEST]: updateVehicleInspectionRequest,
  [Types.UPDATE_VEHICLE_INSPECTION_SUCCESS]: updateVehicleInspectionSuccess,
  [Types.UPDATE_VEHICLE_INSPECTION_FAILURE]: updateVehicleInspectionFailure,

  [Types.DELETE_VEHICLE_INSPECTION_REQUEST]: deleteVehicleInspectionRequest,
  [Types.DELETE_VEHICLE_INSPECTION_SUCCESS]: deleteVehicleInspectionSuccess,
  [Types.DELETE_VEHICLE_INSPECTION_FAILURE]: deleteVehicleInspectionFailure,

  // Vehicle Insurance
  [Types.FILTER_VEHICLE_INSURANCE_REQUEST]: filterVehicleInsuranceRequest,
  [Types.FILTER_VEHICLE_INSURANCE_SUCCESS]: filterVehicleInsuranceSuccess,
  [Types.FILTER_VEHICLE_INSURANCE_FAILURE]: filterVehicleInsuranceFailure,

  [Types.CREATE_VEHICLE_INSURANCE_REQUEST]: createVehicleInsuranceRequest,
  [Types.CREATE_VEHICLE_INSURANCE_SUCCESS]: createVehicleInsuranceSuccess,
  [Types.CREATE_VEHICLE_INSURANCE_FAILURE]: createVehicleInsuranceFailure,

  [Types.UPDATE_VEHICLE_INSURANCE_REQUEST]: updateVehicleInsuranceRequest,
  [Types.UPDATE_VEHICLE_INSURANCE_SUCCESS]: updateVehicleInsuranceSuccess,
  [Types.UPDATE_VEHICLE_INSURANCE_FAILURE]: updateVehicleInsuranceFailure,

  [Types.DELETE_VEHICLE_INSURANCE_REQUEST]: deleteVehicleInsuranceRequest,
  [Types.DELETE_VEHICLE_INSURANCE_SUCCESS]: deleteVehicleInsuranceSuccess,
  [Types.DELETE_VEHICLE_INSURANCE_FAILURE]: deleteVehicleInsuranceFailure,

  // Vehicle Coverage
  [Types.CREATE_VEHICLE_COVERAGE_REQUEST]: createVehicleCoverageRequest,
  [Types.CREATE_VEHICLE_COVERAGE_SUCCESS]: createVehicleCoverageSuccess,
  [Types.CREATE_VEHICLE_COVERAGE_FAILURE]: createVehicleCoverageFailure,

  [Types.FILTER_VEHICLE_COVERAGE_REQUEST]: filterVehicleCoverageRequest,
  [Types.FILTER_VEHICLE_COVERAGE_SUCCESS]: filterVehicleCoverageSuccess,
  [Types.FILTER_VEHICLE_COVERAGE_FAILURE]: filterVehicleCoverageFailure,

  [Types.UPDATE_VEHICLE_COVERAGE_REQUEST]: updateVehicleCoverageRequest,
  [Types.UPDATE_VEHICLE_COVERAGE_SUCCESS]: updateVehicleCoverageSuccess,
  [Types.UPDATE_VEHICLE_COVERAGE_FAILURE]: updateVehicleCoverageFailure,

  [Types.DELETE_VEHICLE_COVERAGE_REQUEST]: deleteVehicleCoverageRequest,
  [Types.DELETE_VEHICLE_COVERAGE_SUCCESS]: deleteVehicleCoverageSuccess,
  [Types.DELETE_VEHICLE_COVERAGE_FAILURE]: deleteVehicleCoverageFailure,

  [Types.DESTROY_CONTAINER]: destroyContainer,
};

export default createReducer(INITIAL_STATE, HANDLERS);
