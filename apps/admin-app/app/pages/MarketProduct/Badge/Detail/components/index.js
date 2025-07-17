import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const BadgeDetailForm = Loadable(() => {
  return import('./Form');
});

export const ImageInfo = Loadable(() => {
  return import('./ImageInfo');
});
