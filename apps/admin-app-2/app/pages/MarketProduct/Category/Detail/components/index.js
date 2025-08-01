import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});
export const AddtionalInfoDetailForm = Loadable(() => {
  return import('./AdditionalInfoForm');
});

export const MarketProductCategoryDetailForm = Loadable(() => {
  return import('./Form');
});

export const ImageInfo = Loadable(() => {
  return import('./ImageInfo');
});

export const SubCategoryTable = Loadable(() => {
  return import('./SubCategoryTable');
});

export const ParentCategoryTable = Loadable(() => {
  return import('./ParentCategoryTable');
});
