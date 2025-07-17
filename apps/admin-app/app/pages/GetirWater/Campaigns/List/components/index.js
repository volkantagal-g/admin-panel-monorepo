import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const FilterArea = Loadable(() => {
  return import('./Filter');
});

export const DataTable = Loadable(() => {
  return import('./Table');
});
