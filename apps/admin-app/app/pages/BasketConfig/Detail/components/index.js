import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const BasketAmountConfigs = Loadable(() => {
  return import('./BasketAmountConfigs');
});

export const WarehouseDetails = Loadable(() => {
  return import('./WarehouseDetails');
});
