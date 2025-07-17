import Loadable from '@shared/utils/loadable';

export const SelectCategoryFormType = Loadable(() => {
  return import('./SelectCategory');
});

export const SelectPriorityFormType = Loadable(() => {
  return import('./SelectPriority');
});
