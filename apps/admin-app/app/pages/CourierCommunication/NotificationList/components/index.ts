import Loadable from '@shared/utils/loadable';

export const SelectWarehouses = Loadable(() => {
  return import('./SelectWarehouses');
});

export const SelectCities = Loadable(() => {
  return import('./SelectCities');
});
