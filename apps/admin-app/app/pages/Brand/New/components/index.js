import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const BrandNewForm = Loadable(() => {
  return import('./Form');
});
