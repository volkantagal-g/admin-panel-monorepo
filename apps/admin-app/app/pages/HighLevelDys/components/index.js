import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const Filter = Loadable(() => {
  return import('./Filter');
});

export const Table = Loadable(() => {
  return import('./Table');
});

export const LineChart = Loadable(() => {
  return import('./LineChart');
});

export const BarChart = Loadable(() => {
  return import('./BarChart');
});
