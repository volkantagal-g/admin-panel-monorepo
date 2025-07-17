import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const PageDetailForm = Loadable(() => {
  return import('./PageDetailForm');
});

export const RoleList = Loadable(() => {
  return import('./RoleList');
});

export const PanelDocList = Loadable(() => {
  return import('./PanelDocList');
});
