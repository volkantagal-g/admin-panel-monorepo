import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const AvailableTimeListTable = Loadable(() => {
  return import('./AvailableTimeListTable');
});
