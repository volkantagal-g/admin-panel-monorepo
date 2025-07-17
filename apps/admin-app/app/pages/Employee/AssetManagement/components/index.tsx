import Loadable from '@shared/utils/loadable';

export const DynamicAssetFormItem = Loadable(() => {
  return import('./DynamicAssetFormItem');
});

export const DynamicAssetInput = Loadable(() => {
  return import('./DynamicAssetInput');
});

export const SelectRegistrationOwner = Loadable(() => {
  return import('./Select/RegistrationOwner');
});

export const SelectVehicleBrand = Loadable(() => {
  return import('./Select/VehicleBrand');
});

export const SelectVehicleFuelType = Loadable(() => {
  return import('./Select/VehicleFuelType');
});

export const SelectVehicleModel = Loadable(() => {
  return import('./Select/VehicleModel');
});

export const SelectVehicleModelYear = Loadable(() => {
  return import('./Select/VehicleModelYear');
});

export const SelectVehicleTransmissionType = Loadable(() => {
  return import('./Select/VehicleTransmissionType');
});

export const SelectVehicleIsCommonCar = Loadable(() => {
  return import('./Select/VehicleIsCommonCar');
});

export const SelectAssignableStatus = Loadable(() => {
  return import('./Select/AssignableStatus');
});

export const SelectAssignableReasonStatus = Loadable(() => {
  return import('./Select/AssignableReasonStatus');
});

export const S3Upload = Loadable(() => {
  return import('./Upload/S3Upload');
});

export const AssignmentStatus = Loadable(() => {
  return import('./Select/AssignmentStatus');
});

export const UniqueIdentifier = Loadable(() => {
  return import('./Select/UniqueIdentifier');
});

export const FinancialLeasingDateRange = Loadable(() => {
  return import('./Select/FinancialLeasingDateRange');
});

export const FinancialLeasingCompany = Loadable(() => {
  return import('./Select/FinancialLeasingCompany');
});

export const ShortLongTermRentingCompany = Loadable(() => {
  return import('./Text/ShortLongTermRentingCompany');
});

export const ShortLongTermRentingDateRange = Loadable(() => {
  return import('./Select/ShortLongTermRentingDateRange');
});

export const EffectedField = Loadable(() => {
  return import('./Select/EffectedField');
});
