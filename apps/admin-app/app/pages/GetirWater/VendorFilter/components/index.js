import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const Filter = Loadable(() => {
  return import('./Filter');
});

export const FilterSummaryTable = Loadable(() => {
  return import('./FilterSummaryTable');
});

export const VendorInformationTable = Loadable(() => {
  return import('./VendorInformationTable');
});
