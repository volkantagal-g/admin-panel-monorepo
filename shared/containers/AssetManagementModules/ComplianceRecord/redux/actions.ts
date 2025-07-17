import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ASSET_MANAGEMENT_MODULES.COMPLIANCE_RECORD}_`;

export const { Types, Creators } = createActions({
  // Vehicle Inspection
  filterVehicleInspectionRequest: { asset: null },
  filterVehicleInspectionSuccess: { vehicleInspections: null },
  filterVehicleInspectionFailure: { error: null },

  createVehicleInspectionRequest: { vehicleInspection: null, onSuccess: null },
  createVehicleInspectionSuccess: {},
  createVehicleInspectionFailure: { error: null },

  updateVehicleInspectionRequest: { vehicleInspectionId: null, updateData: null, onSuccess: null },
  updateVehicleInspectionSuccess: {},
  updateVehicleInspectionFailure: { error: null },

  deleteVehicleInspectionRequest: { vehicleInspectionId: null, onSuccess: null },
  deleteVehicleInspectionSuccess: {},
  deleteVehicleInspectionFailure: { error: null },

  // Vehicle Insurance
  filterVehicleInsuranceRequest: { asset: null },
  filterVehicleInsuranceSuccess: { vehicleInsurances: null },
  filterVehicleInsuranceFailure: { error: null },

  createVehicleInsuranceRequest: { vehicleInsurance: null, onSuccess: null },
  createVehicleInsuranceSuccess: { vehicleInsurances: null },
  createVehicleInsuranceFailure: { error: null },

  updateVehicleInsuranceRequest: { vehicleInsuranceId: null, updateData: null, onSuccess: null },
  updateVehicleInsuranceSuccess: {},
  updateVehicleInsuranceFailure: { error: null },

  deleteVehicleInsuranceRequest: { vehicleInsuranceId: null, onSuccess: null },
  deleteVehicleInsuranceSuccess: {},
  deleteVehicleInsuranceFailure: { error: null },

  // Vehicle Coverage
  filterVehicleCoverageRequest: { asset: null },
  filterVehicleCoverageSuccess: { vehicleCoverages: null },
  filterVehicleCoverageFailure: { error: null },

  createVehicleCoverageRequest: { vehicleCoverage: null, onSuccess: null },
  createVehicleCoverageSuccess: {},
  createVehicleCoverageFailure: { error: null },

  updateVehicleCoverageRequest: { vehicleCoverageId: null, updateData: null, onSuccess: null },
  updateVehicleCoverageSuccess: {},
  updateVehicleCoverageFailure: { error: null },

  deleteVehicleCoverageRequest: { vehicleCoverageId: null, onSuccess: null },
  deleteVehicleCoverageSuccess: {},
  deleteVehicleCoverageFailure: { error: null },

  initContainer: null,
  destroyContainer: null,
}, { prefix });
