import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const UserTable = Loadable(() => {
  return import('./UserTable');
});

export const UserSearch = Loadable(() => {
  return import('./UserSearch');
});
