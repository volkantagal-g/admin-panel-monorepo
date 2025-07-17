import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const DtsTable = Loadable(() => {
  return import('./Table');
});

export const Filter = Loadable(() => {
  return import('./Filter');
});
