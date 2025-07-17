import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const ComponentDetailForm = Loadable(() => {
  return import('./ComponentDetailForm');
});

export const RoleList = Loadable(() => {
  return import('./RoleList');
});
