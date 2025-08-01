import Loadable from '@shared/utils/loadable';

export const AddModalForm = Loadable(() => {
  return import('./AddModalForm');
});
