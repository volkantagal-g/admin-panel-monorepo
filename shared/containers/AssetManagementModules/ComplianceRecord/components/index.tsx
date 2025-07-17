import Loadable from '@shared/utils/loadable';

export const VehicleInspectionForm = Loadable(() => {
  return import('./VehicleInspectionForm');
});

export const VehicleInsuranceForm = Loadable(() => {
  return import('./VehicleInsuranceForm');
});

export const VehicleCoverageForm = Loadable(() => {
  return import('./VehicleCoverageForm');
});
