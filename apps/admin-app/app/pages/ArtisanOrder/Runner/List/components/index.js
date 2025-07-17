import Lodable from '@shared/utils/loadable';

export const Header = Lodable(() => {
  return import('./Header');
});

export const RunnerSearch = Lodable(() => {
  return import('./RunnerSearch');
});

export const RunnerTable = Lodable(() => {
  return import('./RunnerTable');
});
