import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const AssetDetailForm = Loadable(() => {
  return import('./AssetDetailForm');
});

export const AssetHistory = Loadable(() => {
  return import('./AssetHistory');
});

export const AssetRepairHistory = Loadable(() => {
  return import('./AssetRepairHistory');
});

export const AssetChangeEventInfo = Loadable(() => {
  return import('./AssetChangeEventInfo');
});
