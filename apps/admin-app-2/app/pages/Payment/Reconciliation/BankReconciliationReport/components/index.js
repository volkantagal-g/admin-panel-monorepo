import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const OrderTab = Loadable(() => {
  return import('./OrderTab');
});

export const TransactionTab = Loadable(() => {
  return import('./TransactionTab');
});
