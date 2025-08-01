import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const MarketProductCategoryListTable = Loadable(() => {
  return import('./MarketProductCategoryListTable');
});

export const MarketProductSubCategoryListTable = Loadable(() => {
  return import('./MarketProductSubCategoryListTable');
});
