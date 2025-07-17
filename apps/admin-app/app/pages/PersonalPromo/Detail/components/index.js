import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const DataColumn = Loadable(() => {
  return import('./DataColumn');
});

export const CardInformation = Loadable(() => {
  return import('./Card');
});
