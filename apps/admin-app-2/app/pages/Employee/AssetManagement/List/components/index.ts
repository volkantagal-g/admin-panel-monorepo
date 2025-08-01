import Loadable from '@shared/utils/loadable';

export const FilterForm = Loadable(() => {
  return import('./FilterForm');
});
