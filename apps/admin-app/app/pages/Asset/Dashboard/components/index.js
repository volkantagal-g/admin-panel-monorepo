import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const Filter = Loadable(() => {
  return import('./Filter');
});

export const DeviceTypeChart = Loadable(() => {
  return import('./Charts/DeviceType');
});

export const DeviceStatusChart = Loadable(() => {
  return import('./Charts/DeviceStatus');
});

export const AssignmentStatusChart = Loadable(() => {
  return import('./Charts/AssignmentStatus');
});

export const RentalChart = Loadable(() => {
  return import('./Charts/Rental');
});

export const MDMChart = Loadable(() => {
  return import('./Charts/MDM');
});

export const BrandsChart = Loadable(() => {
  return import('./Charts/Brands');
});

export const AssetOwnersChart = Loadable(() => {
  return import('./Charts/AssetOwners');
});
