import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const MasterMainCategoryTable = Loadable(() => {
  return import('./MasterMainCategoryTable');
});

export const MasterCategoryTable = Loadable(() => {
  return import('./MasterCategoryTable');
});

export const MasterClassTable = Loadable(() => {
  return import('./MasterClassTable');
});

export const MasterSubClassTable = Loadable(() => {
  return import('./MasterSubClassTable');
});
