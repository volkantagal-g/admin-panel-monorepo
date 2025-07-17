import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const ExampleCSV = Loadable(() => {
  return import('./ExampleCSV');
});

export const PlanImporter = Loadable(() => {
  return import('./PlanImporter');
});

export const ExcelExport = Loadable(() => {
  return import('./ExcelExport');
});
