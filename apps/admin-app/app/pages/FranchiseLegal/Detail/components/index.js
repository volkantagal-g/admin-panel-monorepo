import Loadable from '@shared/utils/loadable';

export const Filter = Loadable(() => {
  return import('./Filter');
});

export const Table = Loadable(() => {
  return import('./Table');
});

export const Header = Loadable(() => {
  return import('./Header');
});

export const PieChart = Loadable(() => {
  return import('./PieChart');
});

export const ReminderHistoryTable = Loadable(() => {
  return import('./ReminderHistory');
});
