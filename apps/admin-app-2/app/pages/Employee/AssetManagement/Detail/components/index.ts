import Loadable from '@shared/utils/loadable';

export const AssetDetailForm = Loadable(() => {
  return import('./AssetDetailForm');
});

export const AssignAssetModal = Loadable(() => {
  return import('./AssignAssetModal');
});

export const UnassignAssetModal = Loadable(() => {
  return import('./UnassignAssetModal');
});

export const Header = Loadable(() => {
  return import('./Header');
});
