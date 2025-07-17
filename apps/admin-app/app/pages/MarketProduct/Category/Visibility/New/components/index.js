import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => {
  return import('./Header');
});

export const WeekMinPickerInfo = Loadable(() => {
  return import('./WeekMinPickerInfo');
});
