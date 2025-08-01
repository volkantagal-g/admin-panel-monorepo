import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const MarketProductMasterCategoryDetailForm = Loadable(() => {
  return import('./Form');
});

export const ChildrenOfMasterCategoryTable = Loadable(() => {
  return import('./ChildrenOfMasterCategoryTable');
});
