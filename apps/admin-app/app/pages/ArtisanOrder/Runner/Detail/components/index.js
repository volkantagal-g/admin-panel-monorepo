import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const Profile = Loadable(() => {
  return import('./Profile');
});

export const ShoppingMallInfo = Loadable(() => {
  return import('./ShoppingMallInfo');
});

export const GeneralInfo = Loadable(() => {
  return import('./GeneralInfo');
});

export const TaskTable = Loadable(() => {
  return import('./TaskTable');
});
