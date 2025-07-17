import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const RecipeSort = Loadable(() => {
  return import('./RecipeSort');
});
