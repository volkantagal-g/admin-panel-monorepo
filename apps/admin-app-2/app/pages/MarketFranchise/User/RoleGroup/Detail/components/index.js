import Loadable from '@shared/utils/loadable';

export const Footer = Loadable(() => {
  return import('./Footer');
});

export const RolePermissions = Loadable(() => {
  return import('./RolePermissions');
});

export const AccessibleReports = Loadable(() => {
  return import('./AccessibleReports');
});
