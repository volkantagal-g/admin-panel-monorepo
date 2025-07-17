import Loadable from '@shared/utils/loadable';

export const PageHeader = Loadable(() => {
  return import('./Header');
});

export const PageFilter = Loadable(() => {
  return import('./Filter');
});

export const Table = Loadable(() => {
  return import('./Table');
});
