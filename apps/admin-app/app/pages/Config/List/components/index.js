import Loadable from '@shared/utils/loadable';

export const MainTable = Loadable(() => {
  return import('./MainTable');
});

export const ChangeLogsTable = Loadable(() => {
  return import('./ChangeLogsTable');
});

export const Header = Loadable(() => {
  return import('./Header');
});

export const Filter = Loadable(() => {
  return import('./Filter');
});
