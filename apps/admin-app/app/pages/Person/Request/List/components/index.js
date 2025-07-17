import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const InformationEditRequestList = Loadable(() => {
  return import('./InformationEditRequestList');
});

export const InformationEditRequestFilter = Loadable(() => {
  return import('./InformationEditRequestFilter');
});

export const InformationEditRequestTable = Loadable(() => {
  return import('./InformationEditRequestTable');
});
