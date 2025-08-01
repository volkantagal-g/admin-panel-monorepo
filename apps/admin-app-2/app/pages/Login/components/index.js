import Loadable from '@shared/utils/loadable';

export const MagicLink = Loadable(() => {
  return import('./MagicLink');
});
