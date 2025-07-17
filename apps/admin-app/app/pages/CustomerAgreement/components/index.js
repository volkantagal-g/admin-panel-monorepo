import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const DocumentTypeFilter = Loadable(() => {
  return import('./DocumentTypeFilter');
});

export const PreviousAgreements = Loadable(() => {
  return import('./PreviousAgreements');
});
