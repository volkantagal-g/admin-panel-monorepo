import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const SupplierDetailForm = Loadable(() => {
  return import('./Form');
});

export const SupplierAccountListTable = Loadable(() => {
  return import('./SupplierAccountListTable');
});

export const SupplierProductMappingListTable = Loadable(() => {
  return import('./SupplierProductMappingListTable');
});

export const SupplierSettingsForm = Loadable(() => {
  return import('./SupplierSettingsForm');
});
