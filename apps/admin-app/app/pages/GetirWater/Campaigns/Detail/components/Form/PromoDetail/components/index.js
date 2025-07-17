import Loadable from '@shared/utils/loadable';

export const Discount = Loadable(() => {
  return import('./Discount');
});

export const PayXGetY = Loadable(() => {
  return import('./PayXGetY');
});
