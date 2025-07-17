import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const ClientListImporter = Loadable(() => {
  return import('./ClientListImporter');
});

export const Filter = Loadable(() => {
  return import('./Filter');
});
