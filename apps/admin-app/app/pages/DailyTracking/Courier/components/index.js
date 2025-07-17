import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const Dashboard = Loadable(() => {
  return import('./Dashboard');
});

export const Filter = Loadable(() => {
  return import('./Filter');
});
