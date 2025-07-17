import Loadable from '@shared/utils/loadable';

export const PageHeader = Loadable(() => {
  return import('./Header');
});

export const ActionButtons = Loadable(() => {
  return import('./ActionButtons');
});
