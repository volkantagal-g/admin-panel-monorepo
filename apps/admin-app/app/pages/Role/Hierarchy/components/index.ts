import Loadable from '@shared/utils/loadable';

export const Graph = Loadable(() => {
  return import('./Graph');
});
