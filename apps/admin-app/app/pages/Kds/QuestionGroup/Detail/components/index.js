import Loadable from '@shared/utils/loadable';

export const Form = Loadable(() => {
  // eslint-disable-next-line import/no-cycle
  return import('./Form');
});

export const SortableList = Loadable(() => {
  // eslint-disable-next-line import/no-cycle
  return import('./SortableList');
});

export const SortableItem = Loadable(() => {
  return import('./SortableItem');
});
