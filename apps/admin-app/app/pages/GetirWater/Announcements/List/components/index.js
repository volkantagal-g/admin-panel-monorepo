import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const DataTable = Loadable(() => {
  return import('./Table');
});

export const FilterArea = Loadable(() => {
  return import('./Filter');
});
