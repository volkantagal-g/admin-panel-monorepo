import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const Search = Loadable(() => {
  return import('./Search');
});

export const Table = Loadable(() => {
  return import('./Table');
});
