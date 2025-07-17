import Loadable from '@shared/utils/loadable';

export const LogFilterForm = Loadable(() => {
  return import('./LogFilterForm');
});
