/* eslint-disable import/no-cycle */
import Loadable from '@shared/utils/loadable';

export const Table = Loadable(() => {
  return import('./Table');
});

export const Filter = Loadable(() => {
  return import('./Filter');
});

export const ActionHistoryModal = Loadable(() => {
  return import('./ActionHistoryModal');
});

export const ActionHistoryTable = Loadable(() => {
  return import('./ActionHistoryTable');
});
