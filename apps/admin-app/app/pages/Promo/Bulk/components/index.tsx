import Loadable from '@shared/utils/loadable';

export const BulkModalForm = Loadable(() => {
  return import('./BulkModalForm');
});
