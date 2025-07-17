import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const DataTable = Loadable(() => {
  return import('./DataTable');
});

export const Filter = Loadable(() => {
  return import('./Filter');
});

export const FetchData = Loadable(() => {
  return import('./Fetch');
});
