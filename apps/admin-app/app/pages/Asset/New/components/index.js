import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const AssetNewForm = Loadable(() => {
  return import('./AssetNewForm');
});
