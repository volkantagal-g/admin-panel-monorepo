import Loadable from '@shared/utils/loadable';

export const Filter = Loadable(() => {
  return import('./Filter');
});

export const NewButton = Loadable(() => {
  return import('./NewButton');
});
