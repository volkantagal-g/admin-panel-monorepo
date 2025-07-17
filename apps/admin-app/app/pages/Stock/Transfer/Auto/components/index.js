import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const Form = Loadable(() => {
  return import('./Form');
});

export const CategoryTable = Loadable(() => {
  return import('./CategoryTable');
});

export const RegularWarehouseTable = Loadable(() => {
  return import('./RegularWarehouseTable');
});

export const ProductTable = Loadable(() => {
  return import('./ProductTable');
});
