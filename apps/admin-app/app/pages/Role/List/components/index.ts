import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const RoleRequests = Loadable(() => {
  return import('./RoleRequests');
});

export const RoleTable = Loadable(() => {
  return import('./RoleTable');
});

export const RoleSearch = Loadable(() => {
  return import('./RoleSearch');
});

export const TeammateRoles = Loadable(() => {
  return import('./TeammateRoles');
});
