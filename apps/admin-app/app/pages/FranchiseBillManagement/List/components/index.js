import Loadable from '@shared/utils/loadable';

export const Table = Loadable(() => {
  return import('./Table');
});

export const Filter = Loadable(() => {
  return import('./Filter');
});

export const PageHeader = Loadable(() => {
  return import('./PageHeader');
});
