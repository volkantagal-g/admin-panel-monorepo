import Loadable from '@shared/utils/loadable';

export const TaskCoverage = Loadable(() => {
  return import('./TaskCoverage');
});

export const TaskDetails = Loadable(() => {
  return import('./TaskDetails');
});

export const SelectWarehouses = Loadable(() => {
  return import('./SelectWarehouses');
});

export const SelectCities = Loadable(() => {
  return import('./SelectCities');
});

export const SelectDomains = Loadable(() => {
  return import('./SelectDomains');
});

export const SelectTaskKPI = Loadable(() => {
  return import('./SelectTaskKPI');
});

export const TaskHistory = Loadable(() => {
  return import('./TaskHistory');
});
