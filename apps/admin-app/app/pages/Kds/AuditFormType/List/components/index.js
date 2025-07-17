import Loadable from '@shared/utils/loadable';

export const Table = Loadable(() => {
  return import('./Table');
});
