import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const MarketProductGroupDetailForm = Loadable(() => {
  return import('./Form');
});

export const AdditionalInfo = Loadable(() => {
  return import('./AdditionalInfo');
});

export const ImageInfo = Loadable(() => {
  return import('./ImageInfo');
});

export const ProductsOfProductGroupTable = Loadable(() => {
  return import('./ProductsOfProductGroupTable');
});

export const WeekMinPickerInfo = Loadable(() => {
  return import('./WeekMinPickerInfo');
});
